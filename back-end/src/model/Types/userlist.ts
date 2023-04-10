import { Schema } from 'mongoose'

export interface userListModel { 
    requestUserId: Schema.Types.ObjectId,
    userList : Array<Schema.Types.ObjectId>,
    opened: boolean,
    createFeedbackId?: Schema.Types.ObjectId | undefined
}
