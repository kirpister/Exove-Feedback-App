import { Router } from 'express';
import { createFeedbackUserList, deleteFeedbackRequest, getAllUser, getUser,updateUserFeedback,updateUserInfo} from '../controller/userController';
const router = Router()

router
  .get('/',getUser)
  .patch('/',updateUserInfo)
  .patch('/feedback',updateUserFeedback)
  .post('/feedback_request',createFeedbackUserList)
  .delete('/feedback_request',deleteFeedbackRequest)
  .get('/get_all_user',getAllUser)
  
export {router as userRouter}