"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {  Loader2, ArrowLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorState from "./_components/ErrorState";
import GeneratingState from "./_components/GeneratingState";
import QuizResults from "./_components/QuizResults";
import QuizNavigation from "./_components/QuizNavigation";
import QuizQuestion from "./_components/QuizQuestion";


const Quiz = () => {
    const { courseId } = useParams();
    const router = useRouter();
    const [quizData, setQuizData] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [feedback, setFeedback] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [quizStatus, setQuizStatus] = useState("Generating");
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [isDelayed, setIsDelayed] = useState(true); // New state for delay

    useEffect(() => {
        fetchQuiz();
        let attemptCount = 0;
        const maxAttempts = 2;
        let intervalId;
        intervalId = setInterval(() => {
            attemptCount++;
            if (attemptCount < maxAttempts) {
                fetchQuiz();
            } else {
                clearInterval(intervalId);
                console.log("Quiz polling completed after 1 attempts " + attemptCount);
            }
        }, 1000);

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    const fetchQuiz = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.post(
                "/api/study-type",
                {
                    courseId,
                    studyType: "Quiz",
                    _t: Date.now(),
                },
                {
                    headers: {
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                    },
                }
            );

            const quizResponse = response?.data?.notes?.[0];

            if (!quizResponse) {
                setError("No quiz data found");
                return;
            }

            setQuizStatus(quizResponse.status);

            // Here's ntent.quiz directly
            if (quizResponse.status === "Ready" && quizResponse?.content?.quiz?.length > 0) {
                const quizDataToSet = {
                    questions: quizResponse.content.quiz,
                    topic: "Quiz" // You might want to set a default topic or extract it from the response
                };
 
                setIsDelayed(true);
                setTimeout(() => {
                    setQuizData(quizDataToSet);
                    setCurrentQuestion(0);
                    setUserAnswers({});
                    setFeedback({});
                    setShowResults(false);
                    setIsDelayed(false);
                    setIsLoading(false);
                }, 5000);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
            setError("Failed to load quiz. Please try again.");
            setIsLoading(false);
        }
    };

    const handleSelectAnswer = (questionIndex, selectedOption) => {
        const question = quizData.questions[questionIndex];
        const isCorrect = selectedOption === question?.answer;

        setUserAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
        setFeedback((prev) => ({ ...prev, [questionIndex]: isCorrect }));
    };

    const handleShowResults = () => {
        setShowResults(true);
    };

    const handleRestartQuiz = () => {
        setUserAnswers({});
        setFeedback({});
        setCurrentQuestion(0);
        setShowResults(false);
    };

    const calculateScore = () => {
        if (!quizData) return { score: 0, total: 0, percentage: 0 };

        const correctAnswers = Object.values(feedback).filter(Boolean).length;
        const totalQuestions = quizData.questions.length;
        const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

        return {
            score: correctAnswers,
            total: totalQuestions,
            percentage
        };
    };

    if (isLoading || isDelayed) {
        return (
            <div className="max-w-6xl mx-auto p-6 bg-white border border-blue-100 rounded-md shadow-sm">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/course/${courseId}`)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </Button>
                <div className="flex flex-col items-center justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                    <p className="text-lg font-medium text-center">
                        {isDelayed ? "Quiz data is ready! Loading in a few seconds..." : "Loading quiz..."}
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorState error={error} onRetry={fetchQuiz} />;
    }

    if (quizStatus === "Generating") {
        return <GeneratingState />;
    }

    if (!quizData || quizData?.questions?.length === 0) {
        return (
            <div className="max-w-6xl  mx-auto p-6 bg-white border border-blue-100 rounded-md shadow-sm">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/course/${courseId}`)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </Button>
                <div className="p-4 text-center">
                    <p className="text-lg font-medium">No quiz questions available.</p>
                    <Button onClick={fetchQuiz} className="mt-4">
                        Reload Quiz
                    </Button>
                </div>
            </div>
        );
    }

    if (showResults) {
        return (
            <QuizResults
                quizData={quizData}
                userAnswers={userAnswers}
                feedback={feedback}
                calculateScore={calculateScore}
                onRestart={handleRestartQuiz}
                courseId={courseId}
                router={router}
            />
        );
    }

    const currentQuestionData = quizData.questions[currentQuestion];
    const answeredQuestions = Object.keys(userAnswers).length;
    const canShowResults = answeredQuestions > 0;

    return (
        <div className="max-w-6xl mt-2 mx-auto p-6 bg-white border border-blue-100 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/course/${courseId}`)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </Button>

                {canShowResults && (
                    <Button variant="outline" onClick={handleShowResults}>
                        View Results
                    </Button>
                )}
            </div>

            <h1 className="text-xl font-semibold text-center mb-4">{quizData.topic || "Quiz"}</h1>

            <QuizNavigation
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                questions={quizData.questions}
                feedback={feedback}
            />

            <QuizQuestion
                questionData={currentQuestionData}
                questionIndex={currentQuestion}
                userAnswer={userAnswers[currentQuestion]}
                feedback={feedback[currentQuestion]}
                onSelectAnswer={handleSelectAnswer}
                totalQuestions={quizData.questions.length}
            />

            <div className="flex justify-between">
                <div className="text-sm text-gray-600">
                    {answeredQuestions} of {quizData.questions.length} questions answered
                </div>
                {currentQuestion === quizData.questions.length - 1 && (
                    <Button
                        onClick={handleShowResults}
                        disabled={!canShowResults}
                        className="flex items-center gap-2"
                    >
                        <Award size={16} />
                        <span>Finish Quiz</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Quiz;