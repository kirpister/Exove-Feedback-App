import React, { useState } from "react";
import loginstyles from "./login.module.css";
import circle from "../../assets/circle-half.png";
import { UserDetails } from "../../common/types/UserDetails";
import { useDispatch } from "react-redux";
import { saveUserDetails } from "../../features/authenticatedUserSlice";

import { useTranslation } from "react-i18next";
import '../../translations/i18n';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation<'trans'>('trans');

  const onsubmitHandler = (uname: string, pwd: string) => {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: uname,
        password: pwd,
      }),
    });
  };

  const userNameHandlers = (username: string) => {
    setUsername(username);
  };

  const passwordHandlers = (password: string) => {
    setPassword(password);
  };

  const setFi = () => {
    i18n.changeLanguage('fi');
  }

  const setEn = () => {
    i18n.changeLanguage('en');
  }

  return (
    <>
    <div className={loginstyles.wrapper}>
      <div>
        <img className="circle" src={circle} alt="circle" />
      </div>

      <div className={loginstyles.loginform}>
        <h2>{t("loginheader")}</h2>

        <div>
          <label htmlFor="name">{t("username")}</label>
          <input
            type="text"
            placeholder={t("username")}
            onChange={(e) => userNameHandlers(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name">{t("password")}</label>
          <input
            type="password"
            placeholder={t("password")}
            onChange={(e) => passwordHandlers(e.target.value)}
          />
        </div>

        <button
          onClick={() =>
            onsubmitHandler(username, password)
              .then((res) => res.json())
              .then((res: UserDetails) => {
                dispatch(saveUserDetails(res));
              })
          }
        >
          {t("loginbtn")}
        </button>
      </div>
    </div>
    <>
      <div className={loginstyles.translatebtns}>
        <button className={loginstyles.btn} onClick={setFi}>FI</button><button className={loginstyles.btn} onClick={setEn}>EN</button>
      </div>
    </>
    </>
  );
};

export default Login;
