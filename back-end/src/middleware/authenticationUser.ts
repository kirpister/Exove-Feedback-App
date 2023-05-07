import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { createErrMessage } from '../utils/message';
import { StatusCode_Err } from '../utils/statusCode';
import { AuthRequest } from '../common/types/Request';

const JWT_SECRET_KEY = 'shhhhhhh';
const JWT_TOKEN_COOKIE_NAME = 'JWT_TOKEN_COOKIE';

export const authenticationUser: RequestHandler = async (req, res, next) => {
  try {
    console.log('middleaware user');
    const token =await req.cookies[JWT_TOKEN_COOKIE_NAME];
    console.log('token');
    console.log(token);
    // const token = res.cookie
    if (!token) {
      return createErrMessage({ msg: 'token not found', status: StatusCode_Err.FORBIDDEN }, next);
    }
    const data = jwt.verify(token, JWT_SECRET_KEY) as AuthRequest;
    if (!data) {
      return createErrMessage({ msg: 'your token not valid', status: StatusCode_Err.FORBIDDEN }, next);
    }
    console.log(data)
    const { employeeNumber, roles } = data;

    req.body.userDetails = { employeeNumber, roles };

    // console.log('next')
    return next();
    // Almost done
  } catch {
    return createErrMessage({ msg: 'error token', status: StatusCode_Err.FORBIDDEN }, next);
    // return next()
  }
};
