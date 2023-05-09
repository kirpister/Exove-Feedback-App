import { Router } from 'express';
import { createFeedbackUserList, deleteFeedbackRequest, getAllUser, getUser,updateUserFeedback,updateUserInfo,fetchNotifications, markNotificationRead} from '../controller/userController';
const router = Router()

router
  .get('/',getUser)
  .patch('/',updateUserInfo)
  .patch('/feedback',updateUserFeedback)
  .post('/feedback_request',createFeedbackUserList)
  .delete('/feedback_request',deleteFeedbackRequest)
  .get('/get_all_user',getAllUser)
  .get('/notifications',fetchNotifications)
  .patch('/notifications', markNotificationRead)
  
export {router as userRouter}