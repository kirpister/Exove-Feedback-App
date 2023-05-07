import React, { useEffect, useState } from "react";
import SidebarUser from "./SidebarUser";

import userstyles from "./userdash.module.css";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";
import { personalDetailType, DataType } from "../../model/types/user";
import { useTranslation } from "react-i18next";
import '../../translations/i18n';

const Userdash: React.FC = () => {

const { t } = useTranslation<('trans')>('trans');

const [users, setUsers] = useState<personalDetailType[]>([]);


  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

  useEffect(() => {
    axios.get<personalDetailType[]>("/user").then((res) => {
      const { data } = res as unknown as DataType;
    
        setUsers(data.data);
        console.log(users)
      }
    );
  }, []);

  const userInfo = () => {
    if (Array.isArray(users)) {
      return users.map((user) => {
        return (
          <>
         <table>
          <tbody>
          <tr>
          <td>Employee</td>
          <td>{user.personalDetail.firstName}</td>
          </tr>
          <tr>
          <td>Department</td>
          <td>{user.work.departments}</td>
          </tr>
          <tr>
          <td>Start Date</td>
          <td>{user.work.startDate}</td>
          </tr>
          <tr>
          <td>Feedback Requests</td>
          <td>array</td>
          </tr>
          <tr>
          <td>Feedback status?</td>
          <td>true/false?</td>
          </tr>
          </tbody>
          </table>
          </>
        );
      });
    } else {
      return <p>Nothing?!?</p>;
    }
  };

    
return (
    <main className={userstyles.usermain}>
      {/* <SidebarUser /> */}
      <div className={userstyles.userdash}>
        <h2>
            {t("greeting")} {userDetails?.firstName}! 
        </h2>
        <p>{t("date")} {new Date().toLocaleDateString()}</p>
      
       <div> {userInfo()} </div>
        
      </div>
      <div className={userstyles.translatebtns}>
        <button className={userstyles.btn}>FI</button>
        <button className={userstyles.btn}>EN</button>
      </div>
    </main>
  );
};

export default Userdash;
