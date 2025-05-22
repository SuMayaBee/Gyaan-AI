"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import React from "react";

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {
    const handleGenerateContent = async () => {
        try {
            const result = await axios.post(`/api/study-type-content`, {
                courseId: course?.courseId,
                courseTitle: course?.courseLayout?.courseTitle,
                type: item.name,
            }); 
            console.log(result.data)
           //refreshData(true);
        } catch (error) {
            console.error("Error generating content:", error);
        }
    };

    if (!item || !studyTypeContent) return null; // Ensure valid props

    const type = item.type || item.types; // Handle both potential property names
 
    const hasContent = () => {
        if (!studyTypeContent) return false;

        switch (type) {
            case "notes":
                return Array.isArray(studyTypeContent.notes) && studyTypeContent.notes.length > 0;
            case "flashcard":
                return !!studyTypeContent.flashcard;
            case "quiz":
                return !!studyTypeContent.quiz;
            case "qa":
            case "questionanswer":
                return !!studyTypeContent.qa;
            default:
                return false;
        }
    }; 
    const contentAvailable = hasContent();

    return (
        <div
            className={`border shadow-md rounded-md p-4
      hover:shadow-lg transition-all cursor-pointer
      flex flex-col items-center gap-3
      ${!contentAvailable ? "grayscale opacity-70" : ""}`}
        >
            <Image src={item.icon} alt={item.name} width={50} height={50} />
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="text-gray-600 text-sm text-center">{item.desc}</p>

            {contentAvailable ? (
                <Button className="cursor-pointer">View</Button>
            ) : (
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handleGenerateContent}
                >
                    Generate
                </Button>
            )}
        </div>
    );
};

export default MaterialCardItem;