import React, { useState } from "react";
import Image from "next/image";

const SelectOptions = ({ selectedStudyType }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      name: "Content",
      icon: "/knowledge.png",
      description: "Create content for study materials",
    },
    {
      name: "Exam",
      icon: "/exam.png",
      description: "Create study material for upcoming exams",
    },
    {
      name: "Practice",
      icon: "/practice.png",
      description: "Build materials for regular practice sessions",
    },
    {
      name: "Others",
      icon: "/content.png",
      description: "Custom study material for other purposes",
    },
  ];

  const handleOptionClick = (index, name) => {
    setSelectedOption(index);
    selectedStudyType(name);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-center mb-6 text-xl font-semibold text-gray-800">
        What would you like to create your personal study material for?
      </h2>

      <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(index, option.name)}
            className={`p-4 flex flex-col items-center justify-center border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedOption === index
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-3 bg-gray-100 rounded-full">
              <Image src={option.icon} alt={option.name} width={50} height={50} />
            </div>
            <h3 className="text-sm font-medium text-center">{option.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectOptions;
