import  { model, Schema,  } from 'mongoose';
import { userModel } from './types/user';
const userSchema: Schema = new Schema<userModel>({
  personalDetail:{
    username: { type: String, required: [true,'user name required'],unique:true},
    name: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    phone: { type: String, required: true ,unique:true},
    role: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true }
  },
  feedBack: [{
    feedbackId: { type: Schema.Types.ObjectId, ref: 'feedback' },
    finished: { type: Boolean, default: false }
  }]
})

userSchema.set('timestamps',true)
userSchema.set('toJSON',{
  transform:(document,returnedObject )=> { 
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const User  = model<userModel>('user',userSchema)

export default User
