import mongoose   from "mongoose"; 

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
    feedBack:Array< mongoose.Schema.Types.ObjectId>
}