import { Schema } from 'mongoose';
import { AnswerType, feedBackModel } from '../model/types/feedback';
import { Question } from '../model/types/question';
interface DetailType {  
    title:string,
    questions:Array <Question>
}

export const generateFeedback =(details:DetailType, userList : Array<Schema.Types.ObjectId>,answers: Array<AnswerType>,createBy:Schema.Types.ObjectId ):feedBackModel=> { 
    
  return { 
    details,
    answers,
    userList,
    createBy
  }

}