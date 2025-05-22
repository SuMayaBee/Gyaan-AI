import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, RefreshCw, CheckCircle, X } from "lucide-react";

const QuizResults = ({
    quizData,
    userAnswers,
    feedback,
    calculateScore,
    onRestart,
    courseId,
    router
}) => {
    const { score, total, percentage } = calculateScore();
    const answeredQuestions = Object.keys(userAnswers).length;
    const allQuestionsAnswered = answeredQuestions === total;

    const getResultMessage = (percentage) => {
        if (percentage >= 90) return "Excellent! You've mastered this material.";
        if (percentage >= 75) return "Great job! You have a strong understanding.";
        if (percentage >= 60) return "Good work! You're on the right track.";
        return "Keep practicing! You'll improve with more study.";
    };

    const resultMessage = getResultMessage(percentage);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white border border-blue-100 rounded-md shadow-sm">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/course/${courseId}`)}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft size={16} />
                <span>Back to Course</span>
            </Button>

            <div className="flex flex-col items-center justify-center py-8">
                <Award size={64} className={`${percentage >= 75 ? "text-yellow-500" : "text-blue-500"} mb-4`} />
                <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
                <p className="text-lg font-medium mb-6">{resultMessage}</p>

                <div className="bg-gray-100 rounded-lg p-6 w-full max-w-md mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-medium">Score:</span>
                        <span className="text-lg font-bold">{score}/{total}</span>
                    </div>
                    <div className="mb-4">
                        <Progress value={percentage} className="h-4" />
                        <div className="flex justify-end mt-1">
                            <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                    </div>
                    {!allQuestionsAnswered && (
                        <p className="text-sm text-amber-600">
                            Note: You answered {answeredQuestions} out of {total} questions.
                        </p>
                    )}
                </div>

                <h2 className="text-xl font-semibold mb-4">Question Summary</h2>
                <div className="w-full max-w-2xl space-y-4 mb-8">
                    {quizData.questions.map((question, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {feedback[index] === undefined ? (
                                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
                                            {index + 1}
                                        </div>
                                    ) : feedback[index] ? (
                                        <CheckCircle size={24} className="text-green-600" />
                                    ) : (
                                        <X size={24} className="text-red-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{question.question}</p>
                                    {userAnswers[index] && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">Your answer:</p>
                                            <p className={`text-sm font-medium ${feedback[index] ? "text-green-600" : "text-red-600"}`}>
                                                {userAnswers[index]}
                                            </p>
                                            {!feedback[index] && (
                                                <p className="text-sm text-green-600 mt-1">
                                                    Correct answer: <span className="font-medium">{question.answer}</span>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <Button onClick={onRestart} className="flex items-center gap-2">
                        <RefreshCw size={16} />
                        <span>Restart Quiz</span>
                    </Button>
                    <Button variant="outline" onClick={() => router.push(`/course/${courseId}`)}>
                        Back to Course
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuizResults;