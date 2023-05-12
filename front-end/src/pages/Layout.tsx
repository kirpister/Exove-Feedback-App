import React from "react";
import Main from "../components/Main";


import classes from "./Layout.module.css";
import LoadingPage from "../components/LoadingPage/LoadingPage";

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
