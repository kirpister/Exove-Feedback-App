import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../model/userModel";
import { JWT_SECRET_KEY, JWT_TOKEN_COOKIE_NAME } from "../../utils/jwt";
import { auth } from "./utils";

export const loginController: RequestHandler = async (req, res) => {
  const logInRequest = req.body;

  try {
    const authResponse = await auth(
      logInRequest.username,
      logInRequest.password
    );
    const userDetails = await UserModel.findOne({
      _id: authResponse.employeeNumber,
    });

    if (!userDetails) {
      throw new Error("Missing user details in database");
    }

    const token = jwt.sign(
      {
        employeeNumber: authResponse.employeeNumber,
        roles: userDetails.work.roles,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    const responseToReturn = {
      firstName: userDetails.personalDetail.firstName,
      surName: userDetails.personalDetail.surName,
      email: userDetails.personalDetail.email,
      roles: userDetails.work.roles,
    };

    return res
      .cookie(JWT_TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(responseToReturn);
  } catch (error) {
    console.log("error message is ", error);
    res.sendStatus(401);
  }
};
