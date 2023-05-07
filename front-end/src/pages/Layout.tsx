import React from "react";
import Main from "../components/Main";

import classes from "./Layout.module.css";
type LayoutProps = {
  children: JSX.Element;
};

const Layout = (
  // { children }: LayoutProps
  ) => {
  return (
    <div
    //  className={classes.layout}
    >
      {/* {children} */}
      <Main />
    </div>
  );
};

export default Layout;
