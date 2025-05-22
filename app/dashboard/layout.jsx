import React from "react";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader"; 
import CourseCountProvider from "../_Context/CourseCountContext";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout = ({ children }) => { 
  return (
    <CourseCountProvider>
      <div className="flex h-screen">
        <aside className="md:w-64 hidden md:block fixed h-screen">
          <SideBar />
        </aside> 
        <div className="flex flex-col md:ml-64 flex-1">
          <header>
            <DashboardHeader />
          </header> 
          <main className="flex-1 p-12 bg-gray-100">{children}</main>
        </div>
        <Toaster />
      </div>
    </CourseCountProvider>
  );
};

export default DashboardLayout;
