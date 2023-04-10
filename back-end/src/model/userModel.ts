import  { model, Schema,  } from 'mongoose';
import { userModel } from './types/user';
const userSchema: Schema = new Schema<userModel>({
  personalDetail:{
    username: { type: String, required: [true,'user name required'],unique:true},
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    phone: { type: String, required: true ,unique:true},
    password: { type: String, required: true }
  },
  personal:{
    hobbies:{type:[{type:String,unique:true}]},
    horrific:{type:[{type:String}]},
    birthDate:{type:String},
    avatar:{type:String},
    gender:{type:String},
  },
  work:{
    departments:{type:[{type:String}]},
    roles:{type:[{type:String}]},
    startDate:{type:String},
    projects:{type:[{type:String}]}
  },
  selfFeedbackRequests:{
    type:[{
      requestFeedbackId:{type:Schema.Types.ObjectId,required:true,ref:'userRequestLit'}
    }],
    default:[],_id:false},
  feedBack: {
    type: [{
      feedbackId: { type : String, ref: 'feedback' },
      finished: { type: Boolean, default: false }
    }],
    default: []
    ,
    _id:false
  }
},{ timestamps: true, toJSON: { virtuals: true } })


userSchema.set('toJSON', {
  transform(_doc, ret) {
    ret.id = ret._id.toString()
    delete ret._id;
    delete ret.__v;
  },
});


const UserModel  = model<userModel>('user',userSchema)

export default UserModel
