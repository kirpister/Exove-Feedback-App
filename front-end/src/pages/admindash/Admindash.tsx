import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SidebarAdmin from "./SidebarAdmin";
import classes from "./Admindash.module.css";
import axios from "axios";
const Admindash: React.FC = () => {
  const userDetails = useSelector((state: RootState) => state.authenticatedUser.userDetails);
  useEffect(() => {
    axios.get("/user").then((res) => {
      const { data } = res;
    });
  }, []);
  return (
    <main>
      <div className={classes.dash_wrapper}>
        {
          <h2>
            Welcome {userDetails?.firstName} !! You have {userDetails?.roles.join(", ")} roles
          </h2>
        }
      </div>
    </main>
  );
};

export default Admindash;
