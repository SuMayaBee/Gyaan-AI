"use client";
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseIntro from './_components/CourseIntro';
import StudyMatrailSection from './_components/StudyMatrailSection';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
 const router = useRouter();
    useEffect(() => {
        if (courseId) {
            getCourse();
        }
    }, [courseId]);

    const getCourse = async () => {
        try {
            const result = await axios.get(`/api/courses?courseId=${courseId}`);
            setCourse(result.data.result);
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
            setLoading(false);
        }
    };
    const goBack = () => {
        router.push('/dashboard');  
    }; 
    return (
        <div className='mx-10 md:mx-36 lg:px-60 mt-10'> 
            <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="flex items-center gap-1 my-3 text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft size={16} />
                <span>Back </span>
            </Button>
            {loading ? (
                <p>Loading...</p>
            ) : course ? (
                    <div>                 
                        <CourseIntro course={course} />
                        <StudyMatrailSection courseId={courseId} course={course} />
                        <ChapterList course={course} />
                </div>
            ) : (
                <p>Course not found.</p>
            )}
        </div>
    );
};

export default Course;
