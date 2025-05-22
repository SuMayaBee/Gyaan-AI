"use client";
import { CourseCountContext } from "@/app/_Context/CourseCountContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Shield, User, Flask, Atom, Microscope, Beaker, ChevronDown, ChevronUp, Video, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";

const SideBar = () => {
  const { totalCourse, isPremium } = useContext(CourseCountContext);
  const [labsExpanded, setLabsExpanded] = useState(false);
  
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Profile",
      icon: User,
      path: "/dashboard/profile",
    },
    {
      name: "Collaboration",
      icon: Video,
      path: "/dashboard/collaboration",
    },
    {
      name: "Course Chatbot",
      icon: MessageCircle,
      path: "/dashboard/chatbot",
    },
  ];

  const VirtualLabsList = [
    {
      name: "Physics Lab",
      icon: Atom,
      path: "/dashboard/labs/physics",
    },
    {
      name: "Chemistry Lab",
      icon: Flask,
      path: "/dashboard/labs/chemistry",
    },
    {
      name: "Biology Lab",
      icon: Microscope,
      path: "/dashboard/labs/biology",
    },
  ];
  
  const path = usePathname();
  
  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex items-center justify-center gap-3 py-5">
        <Image src={"/logo.svg"} alt="logo" height={150} width={200} /> 
      </div>
      
      <div className="mt-10">
        <Link href={"/create"}>  
          <Button className={"w-full"}>Create New +</Button>
        </Link>
      </div>
      
      <div className="mt-5">
        {MenuList.map((menu, index) => (
          <Link href={menu.path} key={index}> 
            <div
              className={`flex items-center  
                gap-5 my-2 p-3 hover:bg-slate-200 rounded-sm cursor-pointer
                hover:text-slate-900 transition-all duration-300   
                ${path === menu.path && "bg-slate-300"}  `}
            >
              <menu.icon />
              <h2 className="">{menu.name}</h2>
            </div>
          </Link>
        ))}
        
        {/* Virtual Labs Section */}
        <div className="mt-3">
          <div 
            onClick={() => setLabsExpanded(!labsExpanded)}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-200 rounded-sm"
          >
            <div className="flex items-center gap-5">
              <Beaker />
              <h2 className="font-medium">Virtual Labs</h2>
            </div>
            {labsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {labsExpanded && (
            <div className="pl-3 border-l-2 border-purple-200 ml-4 mt-1">
              {VirtualLabsList.map((lab, index) => (
                <Link href={lab.path} key={index}>
                  <div
                    className={`flex items-center  
                      gap-3 my-2 p-2 hover:bg-slate-200 rounded-sm cursor-pointer
                      hover:text-slate-900 transition-all duration-300   
                      ${path === lab.path && "bg-slate-300 text-purple-700"}  `}
                  >
                    {lab.icon ? <lab.icon size={18} /> : <div className="w-[18px] h-[18px]"></div>}
                    <h2 className="text-sm">{lab.name}</h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="w-[85%] ring-1 ring-slate-200 bg-slate-50 p-2 rounded absolute bottom-16">
        {isPremium ? (
          <>
            <h2 className="text-lg font-medium text-[#3700ce]">Premium Plan</h2>
            <h2 className="text-lg">Unlimited Course Credits</h2>
            <Progress value={100} className="bg-green-100" />
            <p className="text-green-600 text-sm mt-1">Unlimited usage available</p>
          </>
        ) : (
          <>
            <h2 className="text-lg">Available Credits: {5 - totalCourse}</h2>
            <Progress value={(totalCourse/5)*100} />
            <h2>{totalCourse} out of 5 Credits used</h2>
            <Link
              href={"/dashboard/upgrade"}
              className="text-primary text-xs mt-3 underline"
            >
              Upgrade to create more
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
