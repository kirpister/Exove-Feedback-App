import React, { useEffect } from "react";
import SidebarUser from "./SidebarUser";

import userstyles from "./userdash.module.css";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";



const Userdash: React.FC = () => {
  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );
    useEffect(()=> { 
      axios.get('/user').then(res => {
        const { data} = res
      })
    },[])
return (
    <main className={userstyles.usermain}>
      <SidebarUser />
      <div className={userstyles.userdash}>
        <h2>
            Hello hello {userDetails?.firstName}! 
        </h2>
        
        <h4>What would you like to do today?</h4>
        <div className={userstyles.useractions}>
            <button>Give Feedback</button>
            <button>Request Feedback</button>
        </div>
      </div>
      <div className={userstyles.translatebtns}>
        <button className={userstyles.btn}>FI</button><button className={userstyles.btn}>EN</button>
      </div>
    </main>
  );
};

export default Userdash;
