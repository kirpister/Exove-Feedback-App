import   { model,Schema  } from 'mongoose';
import { notificationType } from './types/notification';



const notifications:Schema = new Schema <notificationType>({
  userid:{ type: String, required: true},
  message:{ type: String, required: true },
})

const notificationModel  = model<notificationType>('notifications',notifications)
export default notificationModel;