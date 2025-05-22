import React, { useState } from 'react'

const ChapterList = ({ course }) => {
    const CHAPTERS = course?.courseLayout?.chapters;
    const [expandedChapter, setExpandedChapter] = useState(null);

    const toggleChapter = (index) => {
        if (expandedChapter === index) {
            setExpandedChapter(null);
        } else {
            setExpandedChapter(index);
        }
    };

    return (
        <div className="mt-3">
            <h2 className="font-medium text-xl mb-4">Chapter List</h2>
            <div className="space-y-3">
                {CHAPTERS?.map((chapter, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                        <div
                            className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                            onClick={() => toggleChapter(index)}
                        >
                            <div>
                                <h3 className="font-medium text-lg">{chapter.chapterTitle}</h3>
                                <div className="flex items-center mt-1">
                                    <span className="text-sm text-gray-600 mr-3">
                                        {chapter.topics?.length || 0} topics
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded ${chapter.difficultyPriority === "High"
                                        ? "bg-red-100 text-red-800"
                                        : chapter.difficultyPriority === "Medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                        }`}>
                                        {chapter.difficultyPriority} Priority
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-5 h-5 transition-transform ${expandedChapter === index ? "transform rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>

                        {expandedChapter === index && (
                            <div className="p-4 border-t">
                                <p className="text-gray-600 mb-3">{chapter.chapterSummary}</p>
                                <div>
                                    <h4 className="font-medium mb-2">Topics:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {chapter.topics?.map((topic, idx) => (
                                            <li key={idx} className="text-gray-800">{topic}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList