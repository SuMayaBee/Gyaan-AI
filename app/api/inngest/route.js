import { serve } from "inngest/next";
import { inngest } from "../../inngest/client";
import { GenerateNotes, GenerateStudyTypeContent } from "@/app/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [GenerateNotes, GenerateStudyTypeContent],
});
