import { Router } from 'express';
import { getUser,updateUserFeedback,updateUserInfo} from '../controller/userController';
const router = Router()

router
  .get('/',getUser)
  .patch('/',updateUserInfo)
  .patch('/feedback',updateUserFeedback)
  
export {router as userRouter}