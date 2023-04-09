import { RequestHandler } from 'express'
import UserModel from '../model/userModel'
import { createSuccessMessage } from '../utils/message'
import { StatusCode_Success } from '../utils/statusCode'

export const getAllUserInformation : RequestHandler =async(req,res,next)=> { 
  try {
    const listUser= await UserModel.find()
    return createSuccessMessage({msg:'success',status:StatusCode_Success.REQUEST_CREATED},res,listUser)
  } catch (error) {
    next(error)
  }
}