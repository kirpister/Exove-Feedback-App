import { RequestHandler } from 'express';
import UserModel from '../../model/userModel';
import { createErrMessage, createSuccessMessage } from '../../utils/message';
import { StatusCode_Success, StatusCode_Err } from '../../utils/statusCode';
import jwt from 'jsonwebtoken';
import { auth } from './utils';
import { AuthRequest } from '../../common/types/Request';
import dotenv from "dotenv";

export const JWT_SECRET_KEY = 'shhhhhhh';
export const JWT_TOKEN_COOKIE_NAME = 'JWT_TOKEN_COOKIE';

export const loginController: RequestHandler = async (req, res, next) => {
  const logInRequest = req.body;
  try {
    const authResponse = await auth(
      logInRequest.username,
      logInRequest.password
    );
    const userDetails = await UserModel.findById({
      _id: authResponse.employeeNumber,
    });

    if (!userDetails) {
      return createErrMessage(
        {
          msg: 'Missing user detail in database',
          status: StatusCode_Err.RESOURCE_NOT_FOUND,
        },
        next
      );
    }

    const token = jwt.sign(
      {
        employeeNumber: userDetails.id,
        roles: userDetails.work.roles,
      },
      JWT_SECRET_KEY,
      {
        // expiresIn: '30m',
      }
    );

    const responseToReturn = {
      firstName: userDetails.personalDetail.firstName,
      surName: userDetails.personalDetail.surName,
      email: userDetails.personalDetail.email,
      roles: userDetails.work.roles,
      id: userDetails.id,
    };

    return res
      .cookie(JWT_TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json(responseToReturn);
  } catch (error) {
    console.log('error message is ', error);
    res.sendStatus(401);
  }
};

export const registerController: RequestHandler = async (req, res, next) => {
  const user = req.body;
  try {
    const newUser = new UserModel({ ...user });
    await newUser.save();
    const token = '1234';
    // return res.status(201).json({msg:'register'})
    if (!newUser) {
      console.log('error');
    }
    return createSuccessMessage(
      { msg: 'ok', status: StatusCode_Success.NEW_DATA_CREATED },
      res,
      { newUser, token }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      next(error);
    }
  }
};

export const logoutController: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  return res.clearCookie(JWT_TOKEN_COOKIE_NAME).status(200).json();
};
