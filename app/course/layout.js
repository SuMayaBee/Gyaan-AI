import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader';

const CourseViewLayout = ({children}) => {
  return (
      <div>
          <DashboardHeader/>
          <div>
              {children}
      </div>
    </div>
  );
}

export default CourseViewLayout