import { Router } from 'express';
import { createFeedbackUserList, deleteFeedbackRequest, getUser,updateUserFeedback,updateUserInfo} from '../controller/userController';
const router = Router()

router
  .get('/',getUser)
  .patch('/',updateUserInfo)
  .patch('/feedback',updateUserFeedback)
  .post('/feedback_request',createFeedbackUserList)
  .delete('/feedback_request',deleteFeedbackRequest)
  
export {router as userRouter}