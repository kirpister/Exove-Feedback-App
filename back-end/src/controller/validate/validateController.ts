import { RequestHandler } from 'express';
import { AuthRequest } from '../../common/types/Request';
import UserModel from '../../model/userModel';
import { createErrMessage } from '../../utils/message';
import { StatusCode_Err } from '../../utils/statusCode';
import jwt from 'jsonwebtoken';

const JWT_TOKEN_COOKIE_NAME = 'JWT_TOKEN_COOKIE';
const JWT_SECRET_KEY = 'shhhhhhh';
export const validateController: RequestHandler = async (
  req,
  res,next
) => {
  try {
    const token = req.cookies[JWT_TOKEN_COOKIE_NAME];
    console.log('validate router')
    console.log(token)
    if (!token) {
      return createErrMessage({ msg: 'token not found', status: StatusCode_Err.FORBIDDEN }, next);
    }
    const data = jwt.verify(token, JWT_SECRET_KEY) as AuthRequest;
    const userDetails = await UserModel.findOne({
      _id: data.employeeNumber 
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

    return res.status(200).json(responseToReturn);
  } catch (error) {
    console.log('error message is ', error);
    res.sendStatus(401);
  }
};
