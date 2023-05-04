import React from "react";
import classes from "./ErrorPage.module.css";

import { useNavigate } from 'react-router-dom';


const ErrorPage: React.FC = () => {

const navigate = useNavigate();

const goBack = () => {
  navigate(-1);
}

  return (

    <div className={classes.error_container}>
      <div className={classes.error}>
        <h1>404</h1>
        <h2>Sorry, this page doesn't exist.</h2>
      <button onClick={goBack}>GO BACK</button>
      </div>
    </div>
  );
 
  }

export default ErrorPage;
