import { Router } from 'express';
import { getUser,updateUserInfo} from '../controller/user';
const router = Router()

router
  .get('/',getUser)
  .patch('/',updateUserInfo)
  .patch('/feedback')
  
export {router as userRouter}