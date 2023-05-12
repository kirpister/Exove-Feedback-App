import React from "react";
import Main from "../components/Main";


import classes from "./Layout.module.css";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import TranslataBtn from "../components/TranslateBtn/TranslataBtn";
type LayoutProps = {
  children: JSX.Element;
};

const Layout = () => (
  <div>
    <TranslataBtn />
    <LoadingPage />
    <Main />
  </div>
);

export default Layout;
