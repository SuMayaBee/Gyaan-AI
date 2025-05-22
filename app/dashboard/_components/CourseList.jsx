"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseCardItem from "./CourseCardItem";
import { Loader2 } from "lucide-react";
import { CourseCountContext } from "@/app/_Context/CourseCountContext";

const CourseList = () => {
    const { user } = useUser();
    const [coursesList, setCoursesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {setTotalCourse} = useContext(CourseCountContext);


    const GetCourseList = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const result = await axios.post("/api/courses", {
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });
            setCoursesList(result.data.result);
            setError(null);
            setTotalCourse(result.data.result?.length)
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError("Failed to load courses. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch when component mounts and user is available
    useEffect(() => {
        if (user) {
            GetCourseList();
        }
    }, [user]);
 
    useEffect(() => {
        if (!user) return;
 
        GetCourseList();

        let attemptCount = 0;
        const maxAttempts = 10;
 
        const interval = setInterval(() => {
            attemptCount++;
            if (attemptCount < maxAttempts) {
                GetCourseList();
            } else {
                clearInterval(interval);
                console.log("Polling completed after 5 attempts");
            }
        }, 5000);
 
        return () => clearInterval(interval);
    }, [user]);

    // Empty state component
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center p-10 text-center border  rounded-lg border-gray-300 bg-gray-50 min-h-[200px]">
            <div className="mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">No courses yet</h3>
            <p className="mt-1 text-sm text-gray-500">
                Create your first course to get started with our AI-powered learning materials.
            </p>
        
        </div>
    );

    return (
        <div className="mt-10">
            <h2 className="font-bold text-2xl my-3">Your Study Material</h2>

            {loading && (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="ml-2 text-gray-600">Loading your courses...</span>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && coursesList.length === 0 && <EmptyState />}

            {!loading && !error && coursesList.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-5">
                    {coursesList.map((course, index) => (
                        <CourseCardItem course={course} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseList;