"use client";

import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => {
  return (
    <div className="container mx-auto py-8">
      <UserProfile path="/dashboard/profile" routing="path" />
    </div>
  );
};

export default UserProfilePage; 