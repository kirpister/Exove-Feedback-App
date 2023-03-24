import {Schema} from 'mongoose';
import { Question } from './question';
interface AnswerType extends Question { 
user:Schema.Types.ObjectId,
finished:boolean
}
export interface feedBackModel { 
    details:{
        title: string,
        questions: Array <Question>
    },
    userList : Array <Schema.Types.ObjectId>,
    answers: Array<AnswerType>,
    createBy : Schema.Types.ObjectId
}


