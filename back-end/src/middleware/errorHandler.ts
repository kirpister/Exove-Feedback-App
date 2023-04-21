import { ErrorRequestHandler } from 'express';
import { ErrorType } from '../utils/message';


export const errorHandler:ErrorRequestHandler = (err : ErrorType, req,res, next)=>{ 
  const {msg, status}  = err
  return  res.status(status).json({msg})
}