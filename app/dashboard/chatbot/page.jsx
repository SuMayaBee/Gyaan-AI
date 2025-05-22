"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, BookOpen, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const ChatbotPage = () => {
  console.log("====== CHATBOT PAGE RENDERING ======");
  
  const { user } = useUser();
  const { toast } = useToast();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseContent, setCourseContent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCourses, setIsFetchingCourses] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});
  
  const messagesEndRef = useRef(null);
  
  // Fetch all courses - using the same pattern as CourseList.jsx
  const getCourseList = async () => {
    if (!user) return;
    
    try {
      console.log("Making API request to /api/courses with user:", user?.primaryEmailAddress?.emailAddress);
      setIsFetchingCourses(true);
      
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      
      console.log("Courses API response:", result.data);
      setDebugInfo(prev => ({
        ...prev,
        coursesApiResponse: result.data,
        coursesApiStatus: result.status,
        timestamp: new Date().toISOString()
      }));
      
      if (result.data.result && Array.isArray(result.data.result)) {
        console.log("Courses found:", result.data.result.length);
        setCourses(result.data.result);
      } else {
        console.log("No courses found or invalid format:", result.data);
        setCourses([]);
        toast({
          title: "No courses found",
          description: "You don't have any courses yet or there was an issue with the data format.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setDebugInfo(prev => ({
        ...prev,
        coursesFetchException: error.message,
        coursesFetchStack: error.stack
      }));
      toast({
        title: "Error",
        description: "Failed to fetch courses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFetchingCourses(false);
    }
  };
  
  // Initial fetch when component mounts and user is available
  useEffect(() => {
    if (user) {
      getCourseList();
    }
  }, [user]);
  
  // Handle course selection
  const handleCourseSelection = async (courseId) => {
    console.log("====== COURSE SELECTED ======");
    console.log("Selected course ID:", courseId);
    setSelectedCourse(courseId);
    
    // Log the selected course from the courses array
    const selectedCourseObj = courses.find(c => c.courseId === courseId);
    console.log("Selected course object:", selectedCourseObj);
    
    setDebugInfo(prev => ({
      ...prev,
      selectedCourseId: courseId,
      selectedCourseObject: selectedCourseObj
    }));
    
    try {
      setIsLoading(true);
      console.log("Fetching course details for:", courseId);
      
      const response = await axios.get(`/api/courses?courseId=${courseId}`);
      console.log("Course details response:", response.data);
      
      setDebugInfo(prev => ({
        ...prev,
        courseDetailsApiResponse: response.data,
        courseDetailsApiStatus: response.status,
        courseDetailsTimestamp: new Date().toISOString()
      }));
      
      if (response.data.result) {
        setCourseContent(response.data.result);
        
        // Add a welcome message
        const courseTitle = response.data.result.courseLayout?.courseTitle || 
                           response.data.result.topic || 
                           "this course";
        
        const welcomeMessage = {
          id: Date.now(),
          sender: "ai",
          text: `Welcome to ${courseTitle}! I'm your AI study assistant. How can I help you understand the material better?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages([welcomeMessage]);
      } else {
        console.log("Course not found in response:", response.data);
        setCourseContent(null);
        toast({
          title: "Course not found",
          description: "The selected course could not be found.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch course details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !selectedCourse || !courseContent) return;
    
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Extract course content for context - using a more structured approach
      const courseTitle = courseContent.courseLayout?.courseTitle || courseContent.topic || 'N/A';
      const courseSummary = courseContent.courseLayout?.courseSummary || '';
      
      // Format chapters for context in a more structured way
      let chaptersText = '';
      if (courseContent.courseLayout?.chapters) {
        chaptersText = courseContent.courseLayout.chapters.map((chapter, index) => 
          `CHAPTER ${index + 1}:
           Title: ${chapter.chapterTitle}
           Summary: ${chapter.chapterSummary}
           Topics: ${Array.isArray(chapter.topics) ? chapter.topics.join(', ') : chapter.topics || 'None'}`
        ).join('\n\n');
      }
      
      // Format the prompt more like the route.js implementation
      const contextualPrompt = {
        prompt: inputMessage,
        context: `
          COURSE TITLE: ${courseTitle}
          COURSE TYPE: ${courseContent.courseType || 'N/A'}
          DIFFICULTY: ${courseContent.difficultyLevel || courseContent.courseLayout?.difficultyLevel || 'N/A'}
          
          COURSE SUMMARY:
          ${courseSummary}
          
          COURSE CONTENT:
          ${chaptersText}
        `
      };
      
      console.log("Sending question to AI assistant:", inputMessage);
      
      // Using the approach from route.js for error handling
      try {
        const response = await axios.post('/api/gemini', contextualPrompt);
        console.log("AI response received:", response.data);
        
        const aiResponse = {
          id: Date.now(),
          sender: "ai",
          text: response.data.response || "I'm sorry, I couldn't generate a response. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, aiResponse]);
      } catch (error) {
        console.error("Error from AI service:", error.response?.data || error.message);
        
        // Implement fallback response generation similar to route.js
        const fallbackResponse = generateFallbackResponse(inputMessage, courseTitle);
        
        const aiResponse = {
          id: Date.now(),
          sender: "ai",
          text: fallbackResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        toast({
          title: "AI Service Unavailable",
          description: "Using fallback responses as the AI service is currently unavailable.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in chat handler:", error);
      
      // General error fallback
      const fallbackResponse = {
        id: Date.now(),
        sender: "ai",
        text: "I'm having trouble processing your request. Please try again later.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      
      toast({
        title: "Error",
        description: "Failed to process your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fallback response generator function similar to route.js
  const generateFallbackResponse = (prompt, courseTitle) => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes("explain") || lowerPrompt.includes("what is")) {
      return `In ${courseTitle}, this concept refers to a fundamental principle that helps understand the subject matter more deeply. The key is to understand how different elements interact and connect to form a cohesive framework.`;
    } 
    
    if (lowerPrompt.includes("example") || lowerPrompt.includes("application")) {
      return `A practical application of this concept can be seen in everyday life. For instance, when studying ${courseTitle}, these principles can be applied to solve real-world problems and develop innovative solutions.`;
    }
    
    if (lowerPrompt.includes("difference") || lowerPrompt.includes("compare")) {
      return `When comparing these concepts in ${courseTitle}, it's important to recognize their distinct characteristics while also understanding how they relate to each other within the broader framework of the subject.`;
    }
    
    if (lowerPrompt.includes("how to") || lowerPrompt.includes("steps")) {
      return `To approach this in ${courseTitle}, follow these general steps: 1) Identify the key variables, 2) Apply the relevant principles, 3) Analyze the relationships between components, and 4) Draw conclusions based on your analysis.`;
    }
    
    // Default response
    return `That's an interesting question about ${courseTitle}. This topic involves understanding the core principles and applying analytical thinking to develop a comprehensive understanding of the subject matter.`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <div className="mr-4">
          <div className="rounded-full bg-purple-100 p-2 w-12 h-12 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-purple-700" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">Course Chatbot</h1>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select a Course</label>
        {!user ? (
          <div className="text-amber-600 bg-amber-50 p-4 rounded-md">
            Please wait, loading user information...
          </div>
        ) : isFetchingCourses ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-gray-500">Loading courses...</span>
          </div>
        ) : (
          <div>
            <Select value={selectedCourse} onValueChange={handleCourseSelection}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.length > 0 ? (
                  courses.map(course => (
                    <SelectItem 
                      key={course.id} 
                      value={course.courseId}
                    >
                      {course.courseLayout?.courseTitle || course.topic || `Course ${course.id}`}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-courses" disabled>No courses available</SelectItem>
                )}
              </SelectContent>
            </Select>
            
            <div className="mt-2 text-xs text-gray-500">
              {courses.length > 0 ? 
                `${courses.length} courses found` : 
                "No courses found. Please check the API response in the console."}
            </div>
          </div>
        )}
      </div>
      
      {selectedCourse && courseContent ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Course details - 3/5 width on large screens */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-medium mb-4 flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Course Overview
              </h2>
              
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Title</h3>
                  <p className="mt-1 text-lg font-medium">{courseContent.courseLayout?.courseTitle || courseContent.topic || "No title"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Topic</h3>
                  <p className="mt-1">{courseContent.topic || "Not specified"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course Type</h3>
                  <p className="mt-1">{courseContent.courseType || "Not specified"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Summary</h3>
                  <p className="mt-1">{courseContent.courseLayout?.courseSummary || "No summary available"}</p>
                </div>
                
                {courseContent.courseLayout?.chapters && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Chapters</h3>
                    <div className="mt-1 space-y-4">
                      {courseContent.courseLayout.chapters.map((chapter, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="font-medium text-purple-700">Chapter {index + 1}: {chapter.chapterTitle}</p>
                          <p className="text-gray-600 mt-2">{chapter.chapterSummary}</p>
                          {chapter.topics && (
                            <div className="mt-3">
                              <span className="text-xs font-medium text-gray-500">Topics: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {Array.isArray(chapter.topics) ? chapter.topics.map((topic, i) => (
                                  <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                                    {topic}
                                  </span>
                                )) : (
                                  <span>{chapter.topics}</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Chat interface - 2/5 width on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md flex flex-col" style={{ height: '700px' }}>
              {/* Chat header */}
              <div className="p-4 border-b">
                <h2 className="font-medium">
                  {courseContent.courseLayout?.courseTitle || courseContent.topic || "Course"} Assistant
                </h2>
                <p className="text-xs text-gray-500">
                  Ask questions about this course content
                </p>
              </div>
              
              {/* Chat messages */}
              <div className="flex-grow overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-center">Start asking questions about the course content.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`
                            max-w-[95%] rounded-lg p-3 
                            ${message.sender === 'user' 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-gray-100 text-gray-800'}
                          `}
                        >
                          <div className="text-sm mb-1">
                            {message.sender === 'user' ? 'You' : 'AI Assistant'}
                            <span className="text-xs opacity-75 ml-2">{message.time}</span>
                          </div>
                          <div className="whitespace-pre-wrap prose prose-sm max-w-none">
                            {message.text.includes('**') || message.text.includes('*') 
                              ? renderFormattedText(message.text) 
                              : message.text}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              
              {/* Chat input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Ask something about the course content..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow"
                    disabled={!selectedCourse || isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="ml-2"
                    disabled={!selectedCourse || !inputMessage.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : selectedCourse && !courseContent && !isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium mb-4">Course Not Found</h2>
          <p className="text-gray-600">
            We couldn't find details for the selected course. Please try selecting a different course
            or contact support if you believe this is an error.
          </p>
          <p className="text-sm text-gray-500 mt-2">Course ID: {selectedCourse}</p>
        </div>
      ) : null}
    </div>
  );
};

// Add this function to render formatted text with markdown-like syntax
const renderFormattedText = (text) => {
  // Replace markdown-style formatting with HTML
  return text
    .split('\n')
    .map((line, index) => {
      // Handle bullet points
      if (line.trim().startsWith('* ')) {
        return (
          <div key={index} className="flex items-start my-1">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 mr-2"></div>
            <div>{renderInlineFormatting(line.trim().substring(2))}</div>
          </div>
        );
      }
      
      // Handle headers (lines with **)
      if (line.trim().startsWith('**') && line.trim().endsWith(':**')) {
        const headerText = line.trim().replace(/^\*\*|\:\*\*$/g, '');
        return <h3 key={index} className="font-bold text-purple-800 mt-3 mb-1">{headerText}</h3>;
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2"></div>;
      }
      
      // Regular text
      return <p key={index} className="my-1">{renderInlineFormatting(line)}</p>;
    });
};

// Helper function to handle inline formatting like bold and italic
const renderInlineFormatting = (text) => {
  // Replace **bold** with bold text
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace *italic* with italic text (but not overlapping with **bold**)
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Return as dangerouslySetInnerHTML (safe in this context since we control the input)
  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
};

export default ChatbotPage; 