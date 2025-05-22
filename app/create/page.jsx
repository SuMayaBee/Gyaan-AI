"use client";

import React, { useState, useEffect } from "react";
import SelectOptions from "./_components/SelectOptions";
import { Button } from "@/components/ui/button";
import TopicInputs from "./_components/TopicInputs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter()

  // Log formData changes (for debugging)
  useEffect(() => {
    console.log("Updated FormData:", formData);
  }, [formData]);

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateCourseOutline = async () => {
    try {
      const courseId = uuidv4();
      setLoading(true)
      const result = await axios.post("/api/generate-course-outline", {
        courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      console.log("API Response:", result.data);
      setLoading(false)
      router.replace("/dashboard")
    } catch (error) {
      console.error("Error generating course outline:", error);
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-10">
      <h2 className="font-bold text-3xl text-primary text-center">
        Start Building Your Personal Study Material
      </h2>
      <p className="text-gray-600 text-center">
        Fill in all details to generate study material for your next project.
      </p>

      <div className="mt-10 w-full">
        {step === 0 ? (
          <SelectOptions selectedStudyType={(value) => handleUserInput("studyType", value)} />
        ) : (
          <TopicInputs
            setTopic={(value) => handleUserInput("topic", value)}
            setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
          />
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex items-center justify-between w-full mt-10">
        {step > 0 ? (
          <Button onClick={() => setStep(step - 1)} variant="outline">
            Previous
          </Button>
        ) : "_"}

        {step === 0 ? (
          <Button onClick={() => setStep(1)}>Next</Button>
        ) : (
          <Button onClick={GenerateCourseOutline}>
            {loading ? <Loader  className="animate-spin"/> : "Generate"} </Button>
        )}
      </div>
    </div>
  );
};

export default Create;
