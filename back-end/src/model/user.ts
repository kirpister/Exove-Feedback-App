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
  feedBack: {
    type: [{
      feedbackId: { type : String, ref: 'feedback' },
      finished: { type: Boolean, default: false }
    }],
    default: []
  }

 
},{ timestamps: true, toJSON: { virtuals: true } })


userSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});


const UserModel  = model<userModel>('user',userSchema)

export default UserModel
