"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import VoiceButton from '@/components/voice-button';

const DashboardHeader = () => {
  const [isActive, setIsActive] = useState(false);

  const handleVoiceClick = () => {
    setIsActive(!isActive);
    // Here you can add any dummy functionality you want
    console.log('Voice button clicked');
  };

  return (
    <div className='p-3 border-b-2 flex items-center justify-between'>
      <div className="flex items-center gap-2">
        {/* <button 
          onClick={handleVoiceClick}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
            isActive 
              ? 'bg-blue-600 text-white scale-110' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" 
            />
          </svg>
        </button> */}
        <VoiceButton />
      </div>
      <UserButton/>
    </div>
  )
}

export default DashboardHeader;
