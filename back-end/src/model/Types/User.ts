import {Schema}  from 'mongoose'; 
export enum Role {
    Admin = 'admin'
}

interface FeedBackObject { 
feedbackId : Schema.Types.ObjectId,
finished: boolean
}
interface SelfFeedbackRequest { 
    feedbackId : Schema.Types.ObjectId,
}
interface personalDetailType{
    personalDetail: { 
       username:string,
       firstName:string,
       surName:string,
       email:string,
       phone:string,
       password:string,
    }
    personal:{
        horrific:string,
        birthDate : string,
        gender:string,
        avatar:string,
        hobbies:Array<string>
    },
    work: { 
        departments:Array<string>,
        roles:Array<string>,
        startDate:string,
        projects:Array<string>
    }
    selfFeedbackRequests:Array<SelfFeedbackRequest> | null
}
export interface userModel  extends personalDetailType{ 
    feedBack : Array<FeedBackObject>
}