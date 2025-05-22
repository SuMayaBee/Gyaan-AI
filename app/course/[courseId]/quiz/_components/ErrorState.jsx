import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorState = ({ error, onRetry }) => {
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white border border-red-100 rounded-md shadow-sm">
            <div className="text-red-500 p-4 flex flex-col items-center">
                <X size={48} className="text-red-500 mb-2" />
                <p className="text-lg font-medium">{error}</p>
                <Button onClick={onRetry} className="mt-4">
                    Try Again
                </Button>
            </div>
        </div>
    );
};

export default ErrorState;