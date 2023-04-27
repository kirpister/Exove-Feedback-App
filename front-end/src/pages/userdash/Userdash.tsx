import React from "react";
import SidebarUser from "./SidebarUser";

import "./userdash.css";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";



const Userdash: React.FC = () => {


  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );



  return (
    <main>
      <SidebarUser />
      <div className="dash-wrapper">
        <h2>
          Hello hello {userDetails?.firstName}! 
        </h2>
        
        <h4>What would you like to do today?</h4>
        <div className="user-actions">
            <p>Give feedback</p>
            <p>Request Feedback</p>
        </div>
      </div>
    </main>
  );
};

export default Userdash;
