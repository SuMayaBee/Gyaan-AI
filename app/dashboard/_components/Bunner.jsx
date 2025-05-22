"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Bunner = () => {
    const {user}= useUser();
  return (
    <div className=' p-5 bg-primary/85 w-full text-white rounded-lg flex items-center flex-col sm:flex-row' >  

        <Image src={'/learn-ai.png'} alt='learn-ai' width={210} height={210}/>
        <div>
            <h2 className=' font-bold text-3xl my-2'> Hello, {user?.fullName}</h2>
            <p className=' '>Welcome Back, It's time to get back and start learning new course   </p>
        </div>
        </div>
    
  )
}

export default Bunner
 