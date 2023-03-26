import {Schema}  from 'mongoose'; 
export enum Role {
    Admin = 'admin'
}

interface FeedBackObject { 
feedbackId : Schema.Types.ObjectId,
finished?: boolean
}
export interface userModel { 
   personalDetail: { 
       username:string,
       name:string,
       email:string,
       phone:string,
       role: string,
       department:string,
       password:string,
    }
    // feedBack : Array<Object<Schema.Types.ObjectId, boolean>>
    feedBack : Array<FeedBackObject>
}