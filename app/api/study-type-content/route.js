 import { inngest } from "@/app/inngest/client";
 import { db } from "@/config/db";
 import { STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
 import { NextResponse } from "next/server";

 export async function POST(req) {
   try {
     const { courseId, courseTitle, type } = await req.json();

     // Insert study type content into DB
     const result = await db
       .insert(STUDY_TYPE_CONTENT_TABLE)
       .values({ courseId, type })
       .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

     if (!result.length) {
       throw new Error("Failed to insert study type content.");
     }

     // Send event to Inngest for processing
     await inngest.send({
       name: "studyType.content",
       data: {
         courseTitle,
         recordId: result[0].id,
         studyType:type,
       },
     });

     return NextResponse.json(
       {
         message: "Study type content created successfully",
         recordId: result[0].id,
       },
       { status: 201 }
     );
   } catch (error) {
     console.error("Error in studyType API:", error);
     return NextResponse.json(
       { error: "Internal Server Error", details: error.message },
       { status: 500 }
     );
   }
 }
