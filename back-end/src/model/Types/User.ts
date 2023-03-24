import {Schema}  from 'mongoose'; 

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
    feedBack : Array<[Schema.Types.ObjectId, boolean]>
}