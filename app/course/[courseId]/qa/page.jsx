"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Qa = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 animate-bounce">
                Questions & Answers Coming Soon... 😊
            </h2>
            <Button
                onClick={() => router.back()}
            variant={"outline"} className={"w-60"}
            >
                Back
            </Button>
        </div>
    );
};

export default Qa;
