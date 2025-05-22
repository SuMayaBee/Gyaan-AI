import { serve } from "inngest/next";
import { inngest } from "../../inngest/client";
import { GenerateNotes, GenerateStudyTypeContent, helloWorld } from "@/app/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, GenerateNotes, GenerateStudyTypeContent],
});
