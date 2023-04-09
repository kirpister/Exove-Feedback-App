import { RequestHandler } from 'express';
import UserModel from '../model/userModel';
import { createErrMessage, createSuccessMessage } from '../utils/message';
import { StatusCode_Success,StatusCode_Err } from '../utils/statusCode';



export const loginController : RequestHandler  =async (req,res,next) => {
  const { password, username} = req.body
  try {
    const user = await UserModel.findOne({'personalDetail.password':password, 'personalDetail.username':username})
    const token ='1234'
    // return res.status(200).json({msg:'ok',user,token})
    return createSuccessMessage({msg:'ok',status:StatusCode_Success.REQUEST_CREATED},res,{user,token})
  } catch (error) {
    return next(error)
  }
}

export const registerController: RequestHandler =async (req, res, next) => {
  const user = req.body 
  try {
    const  newUser = new UserModel ({...user})
    await newUser.save()
    const token ='1234'
    // return res.status(201).json({msg:'register'})
    if ( ! newUser) { console.log('error')}
    return createSuccessMessage({msg:'ok',status:StatusCode_Success.NEW_DATA_CREATED},res,{newUser,token})
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {

      next(error)
    }
  }
}


