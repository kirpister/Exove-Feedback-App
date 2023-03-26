import { RequestHandler } from 'express';
import UserModel from '../model/user';




export const loginController : RequestHandler  =async (req,res,next) => {
  const { password, username} = req.body
  try {
    const user = await UserModel.findOne({'personalDetail.password':password, 'personalDetail.username':username})
    const token ='1234'
    return res.status(200).json({msg:'ok',user,token})
  } catch (error) {
    return next(error)
  }
}

export const registerController: RequestHandler =async (req, res, next) => {
  const user = req.body 
  // const user = {
  //   personalDetail: {
  //     username: 'Admin',
  //     name: 'Admin',
  //     email: 'admin@example.com',
  //     phone: '12424-424-42042',
  //     role: Role.Admin,
  //     department: 'HR',
  //     password: 'password123'
  //   },
  //   feedBack: []
  // }
  try {
    const  newUser = new UserModel ({...user})
    await newUser.save()
    return res.status(201).json({msg:'register'})
  } catch (error) {
    next(error)
  }
}


