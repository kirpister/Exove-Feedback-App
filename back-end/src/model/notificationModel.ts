import { model, Schema } from 'mongoose';
import { notificationType } from './types/notification';

const notifications: Schema = new Schema<notificationType>({
  isRead: { type: Boolean, required: true },
  message: { type: String, required: true },
  userid: { type: String, required: true },
});

const notificationModel = model<notificationType>(
  'notifications',
  notifications
);
export default notificationModel;
