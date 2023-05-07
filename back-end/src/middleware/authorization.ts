import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWTTokenContent } from '../common/types/Jwt';
import { AuthRequest } from '../common/types/Request';

import { JWT_SECRET_KEY, JWT_TOKEN_COOKIE_NAME } from '../utils/jwt';

export const authorization: RequestHandler = async (
  req: AuthRequest,
  res,
  next
) => {
  const token = req.cookies[JWT_TOKEN_COOKIE_NAME];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY) as JWTTokenContent;
    req.employeeNumber = data.employeeNumber;
    req.roles = data.roles;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

// 1. take token from cookie --> if not token--> send error
// 2. verfiy token --> if token invalid --> send error
// 3. decode token --> define the role vs userId
//   3.1 role == admin --> call api for admin api
//   3.2 role != admin --> for user api  only
