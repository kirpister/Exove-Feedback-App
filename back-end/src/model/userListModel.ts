import {model, Schema} from 'mongoose'
import { userListModel } from './types_1/userlist'


const userListSchema:Schema = new Schema <userListModel>({
  requestUserId:{type:Schema.Types.ObjectId,required:true,ref:'user'},
  createFeedbackId:{type:Schema.Types.ObjectId,default:null,ref:'feedback'},
  opened:{type:Boolean,required:true,default:false},
  userList: {type:[{ type: Schema.Types.ObjectId, ref:'user' }],required:true},
},{timestamps:true})


userListSchema.set('toJSON',{
  transform:(document,ret )=> { 
    ret.id = ret._id.toString()
    delete ret._id;
    delete ret.__v;
  }
})

const UserRequestListModel  = model<userListModel>('userRequestLit',userListSchema)
export default UserRequestListModel