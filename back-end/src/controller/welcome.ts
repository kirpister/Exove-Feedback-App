import { RequestHandler } from "express";
import { userModel } from "../model/Types/User";
import Admin from "../model/userAdmin";

export const welcome: RequestHandler =async (req,res) => {
  const admin = new Admin<userModel>({
    feedBack:[],
    personalDetail:{
      department:"iofj",
      email:"iofds",
      name:"diofasj",
      password:"fdosi",
      phone:"fdskj",
      role:"admin",
      username:"fidosƒ"
    }
  })
  await admin.save()

  return res.status(200).send("welcome to our handman game")
}