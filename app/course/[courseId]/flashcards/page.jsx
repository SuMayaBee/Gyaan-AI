"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const Flashcards = () => {
    const { courseId } = useParams();
    const router = useRouter();
    const [flashcardData, setFlashcardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Loading");

    useEffect(() => {
        if (courseId) {
            getFlashcard();

            // If status is "Generating", set up an interval to poll for updates
            let intervalId;
            if (status === "Generating") {
                intervalId = setInterval(getFlashcard, 5000); // Poll every 5 seconds
            }

            return () => {
                if (intervalId) clearInterval(intervalId);
            };
        }
    }, [courseId, status]);

    const getFlashcard = async () => {
        try {
            setLoading(true);
            const result = await axios.post(`/api/study-type`, {
                courseId,
                studyType: "Flashcard",
                _t: Date.now() // Cache busting
            }, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            setFlashcardData(result.data);

            // Check the status from the response
            const flashcardStatus = result.data?.notes?.[0]?.status || "Loading";
            setStatus(flashcardStatus);

            if (flashcardStatus === "Ready" && result.data?.notes?.[0]?.content?.flashcards?.length > 0) {
                updateProgress(0);
            }
        } catch (error) {
            console.error("Error fetching flashcards:", error);
            setStatus("Error");
        } finally {
            setLoading(false);
        }
    };

    const getFlashcards = () => {
        return flashcardData?.notes?.[0]?.content?.flashcards || [];
    };

    const flashcards = getFlashcards();
    const totalCards = flashcards.length;
    const currentCard = totalCards > 0 ? flashcards[currentCardIndex] : null;

    const handleNext = () => {
        if (totalCards > 0) {
            setCurrentCardIndex((prev) => (prev + 1) % totalCards);
            setFlipped(false);
            updateProgress((currentCardIndex + 1) % totalCards);
        }
    };

    const handlePrevious = () => {
        if (totalCards > 0) {
            setCurrentCardIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
            setFlipped(false);
            updateProgress(currentCardIndex === 0 ? totalCards - 1 : currentCardIndex - 1);
        }
    };

    const updateProgress = (index) => {
        setProgress(((index + 1) / totalCards) * 100);
    };

    const toggleFlip = () => {
        setFlipped(!flipped);
    };

    const goBack = () => {
        router.push(`/course/${courseId}`);
    };

    if (loading && status === "Loading") {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                <div className="text-center text-lg">Loading flashcards...</div>
            </div>
        );
    }

    if (status === "Generating") {
        return (
            <div className="max-w-3xl mx-auto mt-10 p-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={goBack}
                    className="mb-6 flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={16} />
                    <span>Back to course</span>
                </Button>

                <div className="flex flex-col items-center justify-center h-64 space-y-6 bg-gray-50 rounded-lg p-8">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-2">Generating Flashcards</h2>
                        <p className="text-gray-600">We're creating personalized flashcards for your study material. This may take a minute or two.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "Error" || !totalCards) {
        return (
            <div className="max-w-3xl mx-auto mt-10 p-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={goBack}
                    className="mb-6 flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={16} />
                    <span>Back to course</span>
                </Button>

                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3">No Flashcards Available</h2>
                    <p className="text-gray-600 mb-6">There are no flashcards for this course yet or there was an error generating them.</p>
                    <Button onClick={getFlashcard}>Try Again</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6">
            <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="mb-6 flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft size={16} />
                <span>Back to course</span>
            </Button>

            <h1 className="text-2xl font-bold mb-6">Flashcards</h1>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-gray-700">Card {currentCardIndex + 1} of {totalCards}</span>
                <span className="text-sm text-gray-500 italic">Click card to flip</span>
            </div>

            {/* Flashcard container with perspective */}
            <div
                className="relative w-full aspect-[3/2] mb-8 cursor-pointer shadow-lg rounded-xl overflow-hidden"
                onClick={toggleFlip}
                style={{ perspective: "1500px" }}
            >
                <div
                    className="relative w-full h-full transition-all duration-500 ease-in-out"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
                    }}
                >
                    {/* Front Side */}
                    <Card
                        className="absolute inset-0 flex items-center justify-center p-8 text-xl font-medium text-center bg-gradient-to-br from-purple-600 to-purple-800 text-white"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="max-w-full overflow-auto">
                            {currentCard?.front || "No Question"}
                        </div>
                    </Card>

                    {/* Back Side */}
                    <Card
                        className="absolute inset-0 flex items-center justify-center p-8 text-xl font-medium text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                        }}
                    >
                        <div className="max-w-full overflow-auto">
                            {currentCard?.back || "No Answer"}
                        </div>
                    </Card>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
                <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="flex items-center gap-1 px-5"
                >
                    <ChevronLeft size={18} />
                    <span>Previous</span>
                </Button>

                <Button
                    onClick={handleNext}
                    className="flex items-center gap-1 px-5 bg-blue-600 hover:bg-blue-700"
                >
                    <span>Next</span>
                    <ChevronRight size={18} />
                </Button>
            </div>
        </div>
    );
};

export default Flashcards;