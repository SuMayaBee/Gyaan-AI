import React from "react";
import { CheckCircle, X } from "lucide-react";

const QuizQuestion = ({
    questionData,
    questionIndex,
    userAnswer,
    feedback,
    onSelectAnswer,
    totalQuestions
}) => {
    const showFeedback = feedback !== undefined;
    const isAnswerCorrect = feedback;

    return (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-6">Question {questionIndex + 1} of {totalQuestions}</h2>
            <p className="text-lg mb-6">{questionData?.question}</p>

            <div className="grid grid-cols-1 gap-4 mb-6">
                {questionData?.options?.map((option, index) => (
                    <button
                        key={index}
                        className={`p-4 border rounded-lg text-left transition-all ${userAnswer === option
                            ? showFeedback
                                ? isAnswerCorrect
                                    ? "bg-green-100 border-green-500 text-green-800"
                                    : "bg-red-100 border-red-500 text-red-800"
                                : "bg-blue-100 border-blue-500"
                            : "border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => onSelectAnswer(questionIndex, option)}
                        disabled={showFeedback}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${userAnswer === option
                                ? showFeedback
                                    ? isAnswerCorrect
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                    : "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}>
                                {String.fromCharCode(65 + index)}
                            </div>
                            <span>{option}</span>
                        </div>
                    </button>
                ))}
            </div>

            {showFeedback && (
                <div
                    className={`p-4 rounded-lg flex items-center gap-3 ${isAnswerCorrect
                        ? "bg-green-100 border border-green-200 text-green-800"
                        : "bg-red-100 border border-red-200 text-red-800"
                        }`}
                >
                    {isAnswerCorrect ? (
                        <CheckCircle size={24} className="text-green-600" />
                    ) : (
                        <X size={24} className="text-red-600" />
                    )}
                    <div>
                        <p className="font-medium">
                            {isAnswerCorrect ? "Correct!" : "Incorrect!"}
                        </p>
                        {!isAnswerCorrect && (
                            <p className="text-sm mt-1">
                                The correct answer is: <span className="font-medium">{questionData.answer}</span>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizQuestion;