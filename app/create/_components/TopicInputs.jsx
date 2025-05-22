import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TopicInputs = ({ setTopic, setDifficultyLevel }) => { 
  return (
    <div className="space-y-6"> 
      {/* Topic Input */}
      <div className="space-y-2">
        <Label htmlFor="topic" className="text-base font-medium">
          Enter topic or paste the content for which you want to generate study material
        </Label>
        <Textarea
          id="topic"
          placeholder="Start writing here"
          className="min-h-32 resize-none"
          onChange={(e) => setTopic(e.target.value)}
        />
      </div> 

      {/* Difficulty Level Selection */}
      <div className="space-y-2 w-full">
        <Label htmlFor="difficulty" className="text-base font-medium">
          Select the Difficulty Level
        </Label>
        <Select onValueChange={(value) => setDifficultyLevel(value)}>
          <SelectTrigger id="difficulty" className="w-full">
            <SelectValue placeholder="Difficulty Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TopicInputs;
