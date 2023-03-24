import   { model, Schema,  } from 'mongoose';
import {feedBackModel} from './types/feedback'
import { Question } from './types/question';

const feedbackSchema:Schema = new Schema<feedBackModel>({
  details: {
    title: { type: String, required: true },
    questions:{type: Array <Question>, required:true}
  },
  userList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ 
    user:{ type: Schema.Types.ObjectId,ref :['user','admin']},
    details:[
      {type: Array <Question>,required:true}
    ],
    finished:{type:'boolean', default:false}
  }],
  createBy:{type:Schema.Types.ObjectId, ref: 'admin'}
});


feedbackSchema.set('timestamps',true)
feedbackSchema.set('toJSON',{
  transform:(document,returnedObject )=> { 
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const feedBack = model<feedBackModel>('feedback',feedbackSchema)


export default feedBack