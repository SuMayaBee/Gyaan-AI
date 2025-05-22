import React from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const GeneratingState = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white border border-blue-100 rounded-md shadow-sm">
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                <span className="text-lg font-medium">Generating Quiz Questions...</span>
                <p className="text-gray-600">This may take a minute.</p>
                <Progress value={45} className="w-64" />
            </div>
        </div>
    );
};

export default GeneratingState;