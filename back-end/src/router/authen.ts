import { Router } from 'express';
import { loginController, registerController } from '../controller/authen';
const router = Router()

router
  .post('/login',loginController)
  .post('/register',registerController)
export {router as authenRouter}