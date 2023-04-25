import React, { useState } from "react";
import "./login.css";
import circle from "../../assets/circle-half.png";
import { useNavigate } from "react-router-dom";
import Admindash from "../admindash/Admindash";
import { UserDetails } from "../../common/types/UserDetails";
import { ADMIN_ROLE } from "../../common/constants";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let navigate = useNavigate();

  const onsubmitHandler = (uname: string, pwd: string) => {
    return fetch("/log-in", {
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

  return (
    <div className="wrapper">
      <div>
        <img className="circle" src={circle} alt="circle" />
      </div>

      <div className="login-form">
        <h2>LOGIN</h2>

        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => userNameHandlers(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => passwordHandlers(e.target.value)}
          />
        </div>

        <button
          className="login-btn"
          onClick={() =>
            onsubmitHandler(username, password)
              .then((res) => res.json())
              .then((res: UserDetails) => {
                if (res.roles.includes(ADMIN_ROLE)) {
                  navigate("/admindash", {
                    state: {
                      firstName: res.firstName,
                      roles: res.roles,
                    },
                  });
                } else {
                  navigate("/userdash", {
                    state: {
                      firstName: res.firstName,
                      roles: res.roles,
                    },
                  });
                }
              })
          }
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
