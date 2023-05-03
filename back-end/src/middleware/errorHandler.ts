import { ErrorRequestHandler } from 'express';
import { ErrorType, isErrorType } from '../utils/message';

export const errorHandler: ErrorRequestHandler = (err: ErrorType, req, res, next) => {
  if (isErrorType(err)) {
    const { msg, status } = err;
    return res.status(status).json({ msg });
  }else { 
    return res.status(401).json({ err });
  }
};
