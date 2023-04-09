import {model, Schema} from 'mongoose'
import { userListModel } from './types/userlist'


const userListSchema:Schema = new Schema <userListModel>({
  requestUserId:{type:Schema.Types.ObjectId,required:true,ref:'user'},
  createFeedbackId:{type:Schema.Types.ObjectId,default:null,ref:'feedback'},
  opened:{type:Boolean,required:true},
  userList: {type:[{ type: Schema.Types.ObjectId, ref:'user' }],required:true},
},{timestamps:true})


userListSchema.set('toJSON',{
  transform:(document,returnedObject )=> { 
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const userRequestListModel  = model<userListModel>('userRequestLit',userListSchema)
export default userRequestListModel