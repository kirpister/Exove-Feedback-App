import { Router } from 'express';
import { getUser,updateUserFeedback,updateUserInfo} from '../controller/user';
const router = Router()

router
  .get('/',getUser)
  .patch('/',updateUserInfo)
  .patch('/feedback',updateUserFeedback)
  
export {router as userRouter}