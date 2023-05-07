import { Schema } from 'mongoose';

export interface userListModel {
  id?: string;
  requestUserId: Schema.Types.ObjectId;
  userList: Array<Schema.Types.ObjectId>;
  opened: boolean;
  createFeedbackId?: Schema.Types.ObjectId | null;
}
