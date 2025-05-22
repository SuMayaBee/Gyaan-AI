 "use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, Code } from "lucide-react";

const ViewNotes = () => {
  const router = useRouter();
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCodeBlocks, setShowCodeBlocks] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    getNotes();
    
    // // Set a timeout to wait for data
    // const timeout = setTimeout(() => {
    //   if (isLoading) {
    //     setError("It's taking longer than expected to load the notes. Still trying...");
    //   }
    // }, 5000);
    
    // setTimeoutId(timeout);
    
    // return () => {
    //   // Clear timeout when component unmounts or when data is loaded
    //   if (timeoutId) {
    //     clearTimeout(timeoutId);
    //   }
    // };
  }, []);

  const getNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await axios.post(`/api/study-type`, {
        courseId,
        studyType: "notes",
      });

      const fetchedNotes = result?.data?.notes;
      console.log(fetchedNotes);
      setNotes(fetchedNotes);

      setCurrentStep(fetchedNotes.length > 0 ? 0 : -1);
      
      // Clear timeout when data is loaded successfully
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to load notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const handleNext = () => {
    setCurrentStep(Math.min(notes.length - 1, currentStep + 1));
  };

  const goToDashboard = () => {
    router.push(`/course/${courseId}`);
  };
 
  const parseNoteContent = (noteString) => {
    try {
      // Safely parse JSON by handling potential control characters
      const cleanedString = noteString.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
      const parsedNote = JSON.parse(cleanedString);
 
      const enhanceContent = (html) => {
        if (!showCodeBlocks) return html;
 
        return html.replace(
          /<code>([\s\S]*?)<\/code>/g,
          '<code class="bg-gray-100 text-gray-800 px-1 py-0.5 rounded font-mono text-sm">$1</code>'
        ).replace(
          /<pre>([\s\S]*?)<\/pre>/g,
          '<pre class="bg-gray-100 text-gray-800 p-4 rounded font-mono text-sm overflow-x-auto my-4">$1</pre>'
        );
      };
 
      if (parsedNote.topics && Array.isArray(parsedNote.topics)) {
        return (
          <div className="space-y-8 max-w-3xl mx-auto">
            {parsedNote.chapterTitle && (
              <h2 className="text-2xl font-bold">{parsedNote.chapterTitle}</h2>
            )}

            {parsedNote.chapterSummary && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700">{parsedNote.chapterSummary}</p>
              </div>
            )}

            {parsedNote.topics.map((topic, idx) => (
              <div key={idx} className="mt-6">
                {topic.content && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: enhanceContent(topic.content)
                    }}
                    className="prose max-w-none"
                  />
                )}
              </div>
            ))}
          </div>
        );
      } else { 
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: enhanceContent(parsedNote.content || "")
            }}
            className="prose max-w-3xl mx-auto"
          />
        );
      }
    } catch (error) {
      console.error("Error parsing note:", error);
      return (
        <div className="text-red-500 p-4 border border-red-300 rounded">
          <p>There was an error parsing this note. It might contain invalid JSON format.</p>
          <p className="mt-2 text-sm font-mono">{error.message}</p>
        </div>
      );
    }
  };
 
  if (typeof window === "undefined") return null;

  return (
    <div className="mx-4 md:mx-12 lg:mx-auto lg:max-w-5xl py-8"> 
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToDashboard}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={16} />
          <span>Back </span>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          {error && <p className="text-amber-600 mt-2">{error}</p>}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={getNotes}
          >
            Try Again
          </Button>
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No notes available for this course.</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1"
                aria-label="Previous note"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {currentStep + 1} of {notes.length}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCodeBlocks(!showCodeBlocks)}
                  className="flex items-center gap-1 ml-2"
                  aria-label={showCodeBlocks ? "Hide code formatting" : "Show code formatting"}
                >
                  <Code size={16} />
                  <span>{showCodeBlocks ? "Hide" : "Show"} Code Formatting</span>
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentStep === notes.length - 1}
                className="flex items-center gap-1"
                aria-label="Next note"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </Button>
            </div>

            <div className="flex w-full gap-1 mt-4">
              {notes.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${index <= currentStep ? "bg-primary" : "bg-gray-200"
                    }`}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to note ${index + 1}`}
                  aria-current={index === currentStep ? "step" : undefined}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            {notes[currentStep]?.notes ? (
              parseNoteContent(notes[currentStep].notes)
            ) : (
              <p className="text-gray-500 italic">This note appears to be empty.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewNotes;