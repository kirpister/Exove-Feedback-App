import React, { useEffect } from "react";
import Main from "../components/Main";


import classes from "./Layout.module.css";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { getAllRequestUserListAPI } from "../features/requestUserListSlicer";
import { getAllFeedbackAPI } from "../features/createdFeedbackSlicer";
import { getAllUserAPI } from "../features/alluserSlicer";

type LayoutProps = {
  children: JSX.Element;
};


const Layout = () => (
 
  <div>
    <LoadingPage />
    <Main />
  </div>
);

export default Layout;
