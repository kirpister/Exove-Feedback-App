import { Request } from "express";
export interface AuthRequest extends Request {
  employeeNumber?: string;
  roles?: Array<string>;
}
