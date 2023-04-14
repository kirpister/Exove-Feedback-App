import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { ErrorType } from '../utils/message';


export const errorHandler:ErrorRequestHandler = (err: ErrorType |any, req,res, next)=>{ 
  console.log(err.errors['details.questions'] instanceof mongoose.Error.ValidatorError)
  console.log(err.errors)
  const {msg, status}  = err
  return  res.status(status).json({msg})
} 