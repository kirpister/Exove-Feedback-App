import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { createErrMessage } from '../utils/message';
import { StatusCode_Err } from '../utils/statusCode';
const JWT_SECRET_KEY = 'shhhhhhh';


export const authentication :RequestHandler =async(req,res,next)=> { 
  console.log('middle authozation')
  console.log(req.cookies.JWT_TOKEN_COOKIE);
  // const token = res.cookie
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZU51bWJlciI6IjY0MzM1NGE5NTRmMDRlMmYzN2ViOGZkOSIsInJvbGVzIjpbInJvbGUyIl0sImlhdCI6MTY4MjUwMjAxNCwiZXhwIjoxNjgyNTAzODE0fQ.U_1MK0B_AG2kIEaIDXFQgDIDw1eJng7ulsjbwb5QUOM';
  if (!token) {
    return createErrMessage({msg:'token not found',status:StatusCode_Err.FORBIDDEN},next)
  }
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    console.log(data)
    // console.log('next')
    return next();
    // Almost done
  } catch {
    return createErrMessage({ msg: 'error token', status: StatusCode_Err.FORBIDDEN }, next);
    // return next()
  }
}