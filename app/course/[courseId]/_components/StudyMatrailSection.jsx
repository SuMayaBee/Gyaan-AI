"use client";
import React, { useEffect, useState } from "react";
import MatrailCardItem from "./MatrailCardItem";
import axios from "axios";
import Link from "next/link";

const StudyMatrailSection = ({ courseId, course }) => {
    const materialList = [
        {
            name: "notes",
            desc: "Read notes to prepare it make easy",
            icon: "/notes.png",
            path: "/notes",
            types: "notes",
        },
        {
            name: "Flashcard",
            desc: "Flashcard remember the concepts",
            icon: "/flashcard.png",
            path: "/flashcards",
            types: "flashcard",
        },
        {
            name: "Quiz",
            desc: "Great way to test your knowledge",
            icon: "/quiz.png",
            path: "/quiz",
            types: "quiz",
        },
      
    ];

    const [studyTypeContent, setStudyTypeContent] = useState(null);

    useEffect(() => {
        getStudyMatrail();
    }, [courseId]);

    const getStudyMatrail = async () => {
        try {
            const result = await axios.post("/api/study-type/", {
                courseId: courseId,
                studyType: "ALL",
            });
            setStudyTypeContent(result.data);
        } catch (error) {
            console.error("Error fetching study material:", error);
        }
    };

    return (
        <div className="mt-5">
            <h2 className="font-medium text-xl">Study Material</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-3">
                {materialList.map((item, index) => (
                    <Link href={`/course/${courseId}/${item.path}`} key={index}>                    
                        <MatrailCardItem item={item} studyTypeContent={studyTypeContent} course={course} refrashData={getStudyMatrail} />
                    </Link>
                ))}
            </div>
       
        </div>
    );
};

export default StudyMatrailSection;
