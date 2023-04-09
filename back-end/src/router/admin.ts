import { Router } from 'express';
import { getAllUserInformation } from '../controller/adminController';
const router = Router()

router
.get('/',getAllUserInformation)
  
export {router as adminRouter}