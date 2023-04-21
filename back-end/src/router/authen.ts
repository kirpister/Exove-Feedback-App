import { Router } from 'express';
import { loginController, registerController } from '../controller/authenController';
const router = Router()

router
  .post('/login',loginController)
  .post('/register',registerController)
export {router as authenRouter}