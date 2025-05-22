import { db } from "@/config/db";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm"; 

import zlib from "zlib";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY) || "AIzaSyBlXg7ZAx4s-V1cw2dDPEavtKkaFj-z01Y";
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    let { course } = event.data;

    const studyMaterialTable = course?.[0]?.STUDY_MATERIAL_TABLE;
    const chapters = studyMaterialTable?.courseLayout?.chapters || [];
    const courseId = studyMaterialTable?.courseId;

    if (!chapters.length || !courseId) {
      console.error("Missing required data:", {
        hasChapters: !!chapters.length,
        hasCourseId: !!courseId,
      });
      return compressResponse({
        notesResult: "Missing required data",
        updateCourseStatusResult: "Skipped due to missing data",
      });
    }

    console.log(
      "Processing",
      chapters.length,
      "chapters for course ID:",
      courseId
    );

    const notesResult = await step.run("Generate Chapter Notes", async () => {
      const processChapter = async (chapter, index) => {
        try {
          const chapterId = Date.now() + index;
          const PROMPT = `
            Generate detailed exam material content for the following chapter.
            Ensure all topics are included and format the content in HTML.
            (Do not add <html>, <head>, <body>, or <title> tags).
            Chapter Details: ${JSON.stringify(chapter)}
          `;

          const result = await model.generateContent({
            generationConfig,
            contents: [{ role: "user", parts: [{ text: PROMPT }] }],
          });

          const aiResponse =
            result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

          await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId,
            courseId,
            notes: aiResponse,
          });

          return { chapterId, status: "success" };
        } catch (error) {
          console.error(`Error processing chapter ${index}:`, error);
          return {
            chapterId: `chapter-${index}`,
            status: "failed",
            error: error.message || "Unknown error",
          };
        }
      };

      const concurrencyLimit = 5; 
      const batchPromises = [];

      for (let i = 0; i < chapters.length; i += concurrencyLimit) {
        const batch = chapters.slice(i, i + concurrencyLimit);
        batchPromises.push(
          Promise.allSettled(
            batch.map((chapter, batchIndex) =>
              processChapter(chapter, i + batchIndex)
            )
          )
        );
      }

      const results = (await Promise.all(batchPromises)).flat();

      return results.map((res) =>
        res.status === "fulfilled"
          ? res.value
          : { status: "failed", error: res.reason }
      );
    });
 
    const updateCourseStatusResult = await step.run(
      "Update Course Status to Ready",
      async () => {
        try {
          await db
            .update(STUDY_MATERIAL_TABLE)
            .set({ status: "Ready" })
            .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

          return "Success";
        } catch (error) {
          console.error("Error updating course status:", error);
          return { status: "failed", error: error.message || "Unknown error" };
        }
      }
    );

    return compressResponse({ notesResult, updateCourseStatusResult });
  }
);
 
function compressResponse(data) {
  const jsonData = JSON.stringify(data);
  const compressedData = zlib.gzipSync(jsonData);
  return new Response(compressedData, {
    status: 200,
    headers: {
      "Content-Encoding": "gzip",
      "Content-Type": "application/json",
    },
  });
}























export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Type Content" },
  { event: "studyType.content" },
  async ({ event, step }) => {
    try {
      const { courseTitle, recordId, studyType } = event.data;
      console.log("StudyType:", studyType); // Flashcard / Quiz

      const PROMPT_MAP = {
        Flashcard: `Generate flashcards on the topic: ${courseTitle}, covering User Interface (UI) Development and Basic App Navigation. The response should be in JSON format with front and back content, up to 15 items.`,
        Quiz: `Generate a quiz on the topic: ${courseTitle}. Include questions with multiple options and the correct answer in JSON format, max 10 questions.`,
      };

      if (!PROMPT_MAP[studyType]) {
        throw new Error(`Invalid study type: ${studyType}`);
      }

      // Generate content using AI
      const generatedContent = await step.run(
        `Generate ${studyType} with AI`,
        async () => {
          try {
            const result = await model.generateContent({
              generationConfig,
              contents: [
                { role: "user", parts: [{ text: PROMPT_MAP[studyType] }] },
              ],
            });

            return JSON.parse(result.response.text());
          } catch (error) {
            console.error(`AI generation failed for ${studyType}:`, error);
            throw new Error(`Failed to generate ${studyType} content.`);
          }
        }
      );

      await step.run("Save Content & Update Status", async () => {
        try {
          await db
            .update(STUDY_TYPE_CONTENT_TABLE)
            .set({ content: generatedContent, status: "Ready" })  
            .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));    
        } catch (error) {
          console.error("Database update failed:", error);
          throw new Error("Failed to save content and update status.");
        }
      });

      return {
        message: `${studyType} content generated and saved successfully.`,
      };
    } catch (error) {
      console.error("Error in GenerateStudyTypeContent:", error);
      throw new Error("Failed to generate study content.");
    }
  }
);
