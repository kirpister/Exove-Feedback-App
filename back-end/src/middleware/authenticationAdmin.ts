import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { createErrMessage } from '../utils/message';
import { StatusCode_Err } from '../utils/statusCode';
import { AuthRequest } from '../common/types/Request';

const JWT_SECRET_KEY = 'shhhhhhh';
const JWT_TOKEN_COOKIE_NAME = 'JWT_TOKEN_COOKIE';

export const authenticationAdmin: RequestHandler = async (req, res, next) => {
  console.log('middleaware admin');
  const token = req.cookies[JWT_TOKEN_COOKIE_NAME];
  console.log('token');
  console.log(token);

  // const token = res.cookie
  if (!token) {
    return createErrMessage({ msg: 'token not found', status: StatusCode_Err.FORBIDDEN }, next);
  }
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY) as AuthRequest;
    if (!data) {
      return createErrMessage({ msg: 'your token not valid', status: StatusCode_Err.FORBIDDEN }, next);
    }
    const { employeeNumber, roles } = data;
    if ( !roles?.includes('admin')){
      return createErrMessage({ msg: 'your role not admin', status: StatusCode_Err.FORBIDDEN }, next);
    }

    req.body.userDetails = { employeeNumber, roles };
    // console.log('next')
    return next();
    // Almost done
  } catch {
    return createErrMessage({ msg: 'error token', status: StatusCode_Err.FORBIDDEN }, next);
    // return next()
  }
};
