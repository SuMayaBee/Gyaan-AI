"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Mic, MicOff, VideoOff, Phone, Download, Plus, Users, MessageSquare } from "lucide-react";
import Image from 'next/image';

const CollaborationPage = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [sessionRecorded, setSessionRecorded] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const screenShareRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  
  // Mock participants
  const mockParticipants = [
    { id: 1, name: "Rahim Ahmed", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Nusrat Jahan", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Kamal Hossain", avatar: "https://i.pravatar.cc/150?img=3" },
  ];
  
  useEffect(() => {
    if (isCalling) {
      // When call starts, initialize the camera
      startLocalVideo();
      
      // For demo, add mock participants after a delay
      const timer = setTimeout(() => {
        setParticipants(mockParticipants);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      // Stop all media when call ends
      stopLocalVideo();
      setParticipants([]);
    }
  }, [isCalling]);
  
  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: !videoOff, 
        audio: !micMuted 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Setup recording
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        setSessionRecorded(true);
      };
      
      // Start recording
      mediaRecorderRef.current.start();
      
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };
  
  const stopLocalVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    
    // Stop recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };
  
  const toggleMic = () => {
    setMicMuted(!micMuted);
    
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = micMuted; // Toggle to opposite of current value
      });
    }
  };
  
  const toggleVideo = () => {
    setVideoOff(!videoOff);
    
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = videoOff; // Toggle to opposite of current value
      });
    }
  };
  
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            cursor: "always",
            displaySurface: "monitor"
          },
          audio: true
        });
        
        // Display the screen share
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = screenStream;
          
          // Make sure video is visible
          screenShareRef.current.onloadedmetadata = () => {
            screenShareRef.current.play().catch(e => console.error("Error playing screen share:", e));
          };
        }
        
        // Handle the stream ending (user stops sharing)
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          
          if (screenShareRef.current && screenShareRef.current.srcObject) {
            const tracks = screenShareRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            screenShareRef.current.srcObject = null;
          }
        };
        
        setIsScreenSharing(true);
      } else {
        // Stop screen sharing
        if (screenShareRef.current && screenShareRef.current.srcObject) {
          const tracks = screenShareRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          screenShareRef.current.srcObject = null;
        }
        
        setIsScreenSharing(false);
      }
    } catch (err) {
      console.error("Error sharing screen:", err);
      setIsScreenSharing(false);
    }
  };
  
  const startCall = () => {
    setIsCalling(true);
  };
  
  const endCall = () => {
    setIsCalling(false);
  };
  
  const downloadRecording = () => {
    if (recordedChunksRef.current.length === 0) return;
    
    const blob = new Blob(recordedChunksRef.current, {
      type: 'video/webm'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `study-session-${new Date().toISOString()}.webm`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessageInput('');
    
    // Mock response after a short delay
    setTimeout(() => {
      const mockResponse = {
        id: Date.now() + 1,
        sender: participants[0]?.name || 'Rahim Ahmed',
        text: 'Thanks for sharing! That makes sense.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, mockResponse]);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-6">
        <div className="mr-4">
          <Image 
            src="/collaboration-logo.svg" 
            alt="Collaboration" 
            width={60} 
            height={60} 
            className="rounded-full bg-purple-100 p-2"
          />
        </div>
        <h1 className="text-3xl font-bold">Collaborative Learning</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main video area - 3/4 width on large screens */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Study Session</h2>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowParticipantModal(true)}
              >
                <Users className="mr-2 h-4 w-4" />
                Invite
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setChatOpen(!chatOpen)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </div>
          </div>
          
          <div className="relative bg-gray-900 rounded-lg mb-4" style={{ height: '500px' }}>
            {isCalling ? (
              <>
                {/* Screen sharing display */}
                {isScreenSharing && (
                  <div className="absolute inset-0 z-10">
                    <video
                      ref={screenShareRef}
                      className="w-full h-full rounded-lg object-contain"
                      autoPlay
                      playsInline
                      muted={false}
                    />
                    <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md text-sm">
                      You are sharing your screen
                    </div>
                    <div className="absolute bottom-4 left-4 text-sm text-white bg-black bg-opacity-60 px-3 py-1 rounded-md">
                      If your screen appears black, try sharing a specific window or application instead of the entire screen
                    </div>
                  </div>
                )}
                
                {/* Main remote video */}
                <div className={`absolute inset-0 ${isScreenSharing ? 'z-0' : 'z-10'} flex items-center justify-center`}>
                  {participants.length > 0 ? (
                    <video 
                      ref={remoteVideoRef}
                      className="w-full h-full rounded-lg object-cover"
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <div className="text-white text-center">
                      {isScreenSharing ? (
                        <p className="text-green-400 mb-2">Your screen is being shared</p>
                      ) : (
                        <>
                          <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p>Waiting for participants to join...</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Local video (small overlay) */}
                <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-white z-20">
                  <video 
                    ref={localVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                  
                  {videoOff && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <VideoOff className="h-8 w-8 text-white opacity-75" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Video className="h-16 w-16 text-white mb-4 opacity-50" />
                <p className="text-white text-lg mb-6">Start a video session to collaborate with other students</p>
                <Button onClick={startCall} size="lg">
                  Start Session
                </Button>
              </div>
            )}
          </div>
          
          {isCalling && (
            <div className="flex justify-center space-x-4 my-4">
              <Button 
                variant="outline" 
                size="lg" 
                className={`rounded-full p-3 ${micMuted ? 'bg-red-100' : ''}`}
                onClick={toggleMic}
              >
                {micMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className={`rounded-full p-3 ${videoOff ? 'bg-red-100' : ''}`}
                onClick={toggleVideo}
              >
                {videoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className={`rounded-full p-3 ${isScreenSharing ? 'bg-green-100 text-green-600' : ''}`}
                onClick={toggleScreenShare}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                {isScreenSharing && <span className="sr-only">Stop sharing</span>}
              </Button>
              
              <Button 
                variant="destructive" 
                size="lg" 
                className="rounded-full p-3"
                onClick={endCall}
              >
                <Phone className="h-6 w-6" />
              </Button>
            </div>
          )}
          
          {/* Session recording section */}
          {sessionRecorded && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-green-800">Session recorded successfully!</h3>
                  <p className="text-sm text-green-600">You can download the recording for future reference</p>
                </div>
                <Button onClick={downloadRecording} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Recording
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar for participants and chat - 1/4 width on large screens */}
        <div className="lg:col-span-1">
          {/* Participant list */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="font-medium mb-3 flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Participants ({participants.length + 1})
            </h3>
            
            <div className="space-y-3">
              {/* Current user (you) */}
              <div className="flex items-center p-2 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 mr-3">
                  You
                </div>
                <div>
                  <p className="font-medium">You (Host)</p>
                  <div className="flex items-center text-xs text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Connected
                  </div>
                </div>
              </div>
              
              {/* Other participants */}
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                  <img 
                    src={participant.avatar} 
                    alt={participant.name} 
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{participant.name}</p>
                    <div className="flex items-center text-xs text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Connected
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat panel */}
          {chatOpen && (
            <div className="bg-white p-4 rounded-lg shadow-md h-[400px] flex flex-col">
              <h3 className="font-medium mb-3 flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Study Chat
              </h3>
              
              <div className="flex-grow overflow-y-auto mb-3 p-2">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatMessages.map(message => (
                      <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg p-2 max-w-[80%] ${message.sender === 'You' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100'}`}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">{message.sender}</span>
                            <span className="text-gray-500">{message.time}</span>
                          </div>
                          <p>{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <form onSubmit={sendMessage} className="flex">
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Button type="submit" className="rounded-l-none">Send</Button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {/* Participant invitation modal */}
      {showParticipantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Invite Participants</h3>
              <button onClick={() => setShowParticipantModal(false)} className="text-gray-500 hover:text-gray-800">
                &times;
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Share Session Link</label>
              <div className="flex">
                <input 
                  type="text" 
                  value="https://ज্ঞান-ai.com/join/session-12345"
                  readOnly
                  className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                />
                <Button className="rounded-l-none">Copy</Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Share this link with others to invite them to your session</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Invite from Contacts</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student1">Sadia Rahman</SelectItem>
                  <SelectItem value="student2">Fahim Islam</SelectItem>
                  <SelectItem value="student3">Tasnim Akter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setShowParticipantModal(false)}>
                <Plus className="mr-2 h-4 w-4" />
                Send Invitations
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationPage; 