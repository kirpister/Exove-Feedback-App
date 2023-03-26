import {Schema} from 'mongoose';
import { Question } from './question';

export interface AnswerType extends Question { 
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
    createdBy : Schema.Types.ObjectId,
}


