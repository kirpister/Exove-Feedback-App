import {Schema}  from 'mongoose'; 
export enum Role {
    Admin = 'admin'
}

interface FeedBackObject { 
feedbackId : Schema.Types.ObjectId,
finished?: boolean
}
interface personalDetailType{
     personalDetail: { 
       username:string,
       name:string,
       email:string,
       phone:string,
       role: string,
       department:string,
       password:string,
    }
}
export interface userModel  extends personalDetailType{ 
    feedBack : Array<FeedBackObject>
}