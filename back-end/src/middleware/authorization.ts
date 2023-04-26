import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWTTokenContent } from "../common/types/Jwt";
import { AuthRequest } from "../common/types/Request";

import { JWT_SECRET_KEY, JWT_TOKEN_COOKIE_NAME } from "../utils/jwt";

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
