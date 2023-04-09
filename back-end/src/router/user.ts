import { Router } from 'express';
import { createFeedbackUserList, getUser,updateUserFeedback,updateUserInfo} from '../controller/userController';
const router = Router()

router
  .get('/',getUser)
  .patch('/',updateUserInfo)
  .patch('/feedback',updateUserFeedback)
  .post('/feedback_request',createFeedbackUserList)
  
export {router as userRouter}