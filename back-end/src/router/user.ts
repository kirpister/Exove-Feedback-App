import { Router } from 'express';
import {
  createFeedbackUserList,
  deleteFeedbackRequest,
  getAllUser,
  getUser,
  updateUserFeedback,
  updateUserInfo,
  fetchNotifications,
  markNotificationRead,
  createReminderNotifications,
  deleteNotification,
} from '../controller/userController';
const router = Router();

router
  .get('/', getUser)
  .patch('/', updateUserInfo)
  .patch('/feedback', updateUserFeedback)
  .post('/feedback_request', createFeedbackUserList)
  .delete('/feedback_request', deleteFeedbackRequest)
  .get('/get_all_user', getAllUser)
  .get('/notifications', fetchNotifications)
  .post('/notifications/reminder', createReminderNotifications)
  .patch('/notifications', markNotificationRead)
  .delete('/notifications', deleteNotification);

export { router as userRouter };
