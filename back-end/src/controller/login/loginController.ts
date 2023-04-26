import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../model/userModel';
import { auth } from './utils';

const JWT_SECRET_KEY = 'shhhhhhh';

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
      throw new Error('Missing user details in database');
    }

    const responseToReturn = {
      firstName: userDetails.personalDetail.firstName,
      surName: userDetails.personalDetail.surName,
      email: userDetails.personalDetail.email,
      roles: userDetails.work.roles,
    };

    const token = jwt.sign(
      {
        employeeNumber: authResponse.employeeNumber,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: '30m',
      }
    );

    return res
      .cookie('JWT_TOKEN_COOKIE', token, {
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
