"use client"
import React, { createContext, useState } from "react";

// Create the context
export const CourseCountContext = createContext(null);

// Create a context provider component
const CourseCountProvider = ({ children }) => {
    const [totalCourse, setTotalCourse] = useState(0);

    return (
        <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
            {children}
        </CourseCountContext.Provider>
    );
};

export default CourseCountProvider;
