import  { model, Schema, } from 'mongoose';
import { userModel } from './types/user';
const adminSchema: Schema = new Schema<userModel>({
  personalDetail:{
    username: { type: String, required: [true,'user name required'],unique:true },
    name: { type: String, required: true, },
    email: { type: String, required: true,unique:true },
    phone: { type: String, required: true ,unique:true},
    role: { type: String, required: true,default:'admin' },
    department: { type: String, required: true },
    password: { type: String, required: true }
  },
  feedBack: [{
    feedbackId: { type: Schema.Types.ObjectId, ref: 'feedback' },
    finished: { type: Boolean, default: false }
  }]
})

adminSchema.set('timestamps',true)
adminSchema.set('toJSON',{
  transform:(document,returnedObject )=> { 
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const Admin  = model<userModel>('admin',adminSchema)
export default Admin
