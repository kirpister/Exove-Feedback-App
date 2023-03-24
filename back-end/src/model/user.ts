import  { model, Schema,  } from "mongoose";
// import uniqueValidator from "mongoose-unique-validator"
import { userModel } from "./Types/User";
const userSchema: Schema = new Schema<userModel>({
  personalDetail:{
    username: { type: String, required: [true,"user name required"],},
    name: { type: String, required: true },
    email: { type: String, required: true ,},
    phone: { type: String, required: true ,},
    role: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true }
  },
  feedBack: [{ type: Schema.Types.ObjectId, ref: "Feedback" }]

})

// userSchema.plugin(uniqueValidator)
userSchema.set("toJSON",{
  transform:(document,returnedObject )=> { 
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const user  = model<userModel>("user",userSchema)

export default user
