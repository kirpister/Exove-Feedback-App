import {Schema} from 'mongoose';
import { Question } from './question';

export interface FeedbackAnswerType  {
user:Schema.Types.ObjectId,
finished:boolean
details:Array< {question: Question, answer: Array<string>}>
}


export interface feedBackModel { 
    id:string,
    details:{
        title: string,
        questions: Array <Question>
    },
    requestedBy: Schema.Types.ObjectId,
    userList : Array <Schema.Types.ObjectId>,
    answers: Array<FeedbackAnswerType>,
    createdBy : Schema.Types.ObjectId,
}


