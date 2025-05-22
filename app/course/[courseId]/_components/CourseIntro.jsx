import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

const CourseIntro = ({ course }) => {
  return (
    <div className=" flex items-center  flex-col sm:flex-row p-5 gap-5 shadow-md border rounded-md">
      <Image src={"/knowledge.png"} alt="Konwlage" width={80} height={80} />
      <div>
        <h2 className=" font-bold text-2xl">
          {course?.courseLayout?.courseTitle}
        </h2>
        <span>({course?.difficultyLevel})</span>
        <p className="">{course?.courseLayout?.courseSummary}</p>
        <div>
          <Progress value={10} />
        </div>

        <div className="">
          <h2 className="mt-3 text-lg text-primary">
            Total Chapter: {course?.courseLayout?.chapters?.length}
          </h2>
        </div>
      </div>
    </div>
  );
}; 
export default CourseIntro;
