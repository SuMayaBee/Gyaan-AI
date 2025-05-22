import React from "react";
import { Loader2 } from "lucide-react";

const LoadingState = () => {
    return (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            <span className="text-lg font-medium">Loading quiz...</span>
        </div>
    );
};

export default LoadingState;