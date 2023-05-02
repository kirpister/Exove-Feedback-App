import React from "react";
import classes from "./ErrorPage.module.css";

const Errorpage: React.FC = () => {
  return (
    <div className={classes.error_container}>
      <div className={classes.error}>
        <h1>Sorry, this page doesn't exist!</h1>
      </div>
    </div>
  );
};

export default Errorpage;
