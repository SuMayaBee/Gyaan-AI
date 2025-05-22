"use client";
import { CourseCountContext } from "@/app/_Context/CourseCountContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Shield, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const SideBar = () => {

  const { totalCourse } = useContext(CourseCountContext);
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
      name: "profile",
      icon: User,
      path: "/dashboard/profile",
    },
  ];
  const path = usePathname();
  return (
    <div className=" h-screen shadow-md p-5">
      <div className=" flex items-center justify-center gap-3 py-5">
        <Image src={"/logo.png"} alt="logo" height={150} width={200} /> 
      </div>
      <div className="mt-10">
        <Link href={"/create"}>  
          <Button className={"w-full "}>Create New +</Button>
        </Link>
      </div>
      <div className="">
        {MenuList.map((menu, index) => (
          <Link href={menu.path}    key={index}> 
          <div
         
            className={`flex items-center  
                gap-5 my-2 p-3 hover:bg-slate-200 rounded-sm cursor-pointer
                 hover:text-slate-900 transition-all duration-300   
                ${path == menu.path && "bg-slate-300"}  `}
          >
            <menu.icon />
            <h2 className=""> {menu.name}</h2>
          </div>
          </Link>
        ))}
      </div>
      <div className=" w-[85%] ring-1 ring-slate-200 bg-slate-50 p-2 rounded absolute  bottom-16" >
        <h2 className=" text-lg"> Available Cardits: { 5 - totalCourse} </h2>
        <Progress value={(totalCourse/5)*100} />
        <h2>{totalCourse} out of 5 Cardites use</h2>
        <Link
          href={"/dashboard/upgrade"}
          className=" text-primary text-xs mt-3 underline"
        >
          Upgarde to create more
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
