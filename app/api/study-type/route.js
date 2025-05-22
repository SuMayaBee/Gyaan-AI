import { db } from "@/config/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
 
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId, studyType } = await req.json();
    console.log("studyType from back " + studyType);

    if (!courseId || !studyType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (studyType === "ALL") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      const conentList = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));

      return NextResponse.json({
        notes,
        flashcard: conentList?.find((item) => item.type == "Flashcard") || null,
        quiz: conentList?.find((item) => item.type == "Quiz") || null,
        qa: conentList?.find((item) => item.type == "QA") || null,
      });
    } else if (studyType === "notes") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      return NextResponse.json({ notes });
    } else   {
      const notes = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(and( eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId) ,eq(STUDY_TYPE_CONTENT_TABLE?.type, studyType) ))
     

      return NextResponse.json({ notes });
    } 
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
