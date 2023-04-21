import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { auth } from "./utils";

const JWT_SECRET_KEY = "shhhhhhh";

export const login: RequestHandler = async (req, res) => {
  const logInRequest = req.body;

  try {
    const response = await auth(logInRequest.username, logInRequest.password);
    const token = jwt.sign(
      {
        employeeNumber: response.employeeNumber,
        email: response.mail,
        name: logInRequest.username,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    jwt.verify;

    // fetch loggedIn user's details from mongodb based on username and send in the response if needed
    return res
      .cookie("JWT_TOKEN_COOKIE", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logged in successfully 😊 👌" });
  } catch (error) {
    res.sendStatus(401);
  }
};
