import  { model, Schema, } from "mongoose";
// import uniqueValidator from "mongoose-unique-validator"
import { userModel } from "./Types/User";
const adminSchema: Schema = new Schema<userModel>({
  personalDetail:{
    username: { type: String, required: [true,"user name required"] },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true }
  },
  feedBack: [{ type: Schema.Types.ObjectId, ref: "Feedback" }]

})

// adminSchema.plugin(uniqueValidator)
// adminSchema.set("toJSON",{
//   transform:(document,returnedObject )=> { 
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   }
// })


// interface IUser {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// 2. Create a Schema corresponding to the document interface.
// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   avatar: String
// });
const Admin  = model<userModel>("admin",adminSchema)
// const Admin = model<IUser>("admin",userSchema)


export default Admin
