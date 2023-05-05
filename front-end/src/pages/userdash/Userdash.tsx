import React, { useEffect } from "react";
import SidebarUser from "./SidebarUser";

import userstyles from "./userdash.module.css";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";



import { useTranslation } from "react-i18next";
import '../../translations/i18n';

const Userdash: React.FC = () => {

const { t } = useTranslation<('trans')>('trans');


  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

    useEffect(() => { 

      axios.get('/user').then(res => {
        const { data } = res
        console.log(data.data)
      })

    },[])


    
return (
    <main className={userstyles.usermain}>
      <SidebarUser />
      <div className={userstyles.userdash}>
        <h2>
            {t("greeting")} {userDetails?.firstName}! 
        </h2>
        <p>{t("date")} {new Date().toLocaleDateString()}</p>
        
        <h4>What would you like to do today?</h4>
        <div className={userstyles.useractions}>
            <button>Give Feedback</button>
            <button>Request Feedback</button>
        </div>
      </div>
      <div className={userstyles.translatebtns}>
        <button className={userstyles.btn}>FI</button>
        <button className={userstyles.btn}>EN</button>
      </div>
    </main>
  );
};

export default Userdash;
