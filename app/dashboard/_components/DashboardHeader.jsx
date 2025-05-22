import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className=" p-3   border-b-2 flex items-center justify-end">
      <UserButton />
    </div>
  );
};

export default DashboardHeader;
