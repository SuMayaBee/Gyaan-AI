import React from "react";
import { Button } from "@/components/ui/button";

const NoQuestionsState = ({ onReload }) => {
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white border border-blue-100 rounded-md shadow-sm">
            <div className="p-4 text-center">
                <p className="text-lg font-medium">No quiz questions available.</p>
                <Button onClick={onReload} className="mt-4">
                    Reload Quiz
                </Button>
            </div>
        </div>
    );
};

export default NoQuestionsState;