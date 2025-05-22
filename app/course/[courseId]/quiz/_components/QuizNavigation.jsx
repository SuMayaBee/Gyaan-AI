import React from "react";
import { Button } from "@/components/ui/button";

const QuizNavigation = ({ currentQuestion, setCurrentQuestion, questions, feedback }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <Button
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
                className="px-4"
            >
                Previous
            </Button>

            <div className="flex space-x-2">
                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${feedback[index] !== undefined
                                ? feedback[index]
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                : index === currentQuestion
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                            }`}
                        onClick={() => setCurrentQuestion(index)}
                    />
                ))}
            </div>

            <Button
                variant="outline"
                disabled={currentQuestion === questions.length - 1}
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="px-4"
            >
                Next
            </Button>
        </div>
    );
};

export default QuizNavigation;