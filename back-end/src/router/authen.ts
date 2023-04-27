import { Router } from 'express';
import { loginController, logoutController, registerController } from '../controller/authenController/authenController';
const router = Router()

router
  .post('/login',loginController)
  .post('/register',registerController)
  .post('/logout',logoutController)
export {router as authenRouter}