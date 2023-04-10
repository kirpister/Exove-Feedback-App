import   { model, Schema,  } from 'mongoose';
import {feedBackModel} from './types/feedback'
import { Question } from './types/question';

const feedbackSchema:Schema = new Schema<feedBackModel>({
  details: {
    title: { type: String, required: true },
    questions:{type: Array <Question>, required:true}
  },
  requestedListBy:{type:Schema.Types.ObjectId,_id:false,default:null},
  userList: {type:[{ type: Schema.Types.ObjectId, ref:'user' }],required:true},
  answers: {type:[{ 
    user:{ type: Schema.Types.ObjectId,ref:'user'},
    details:{type: Array <Question>},
    finished:{type:'boolean', default:false},
  },],
  default:function () {
    const users = this.userList.map((userId: Schema.Types.ObjectId) => ({
      user: userId,
      details: this.details.questions.map((q: Question) => ({ question: q, answer: [] })),
      finished: false }));
    return users;
  },
  _id:false
  },
  createdBy:{type:Schema.Types.ObjectId, ref: 'user'},
},{timestamps:true});

feedbackSchema.set('toJSON',{
  transform:(document,ret )=> { 
    ret.id = ret._id.toString()
    delete ret._id;
    delete ret.__v;
  }
})

const FeedbackModel = model<feedBackModel>('feedback',feedbackSchema)


export default FeedbackModel