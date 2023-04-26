import { RequestHandler } from "express";
import { AuthRequest } from "../../common/types/Request";
import { JWT_TOKEN_COOKIE_NAME } from "../../utils/jwt";

export const logoutController: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  return res.clearCookie(JWT_TOKEN_COOKIE_NAME).status(200).json();
};
