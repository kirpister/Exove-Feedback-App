import { Router } from 'express';
import { createFeedbackController, deleteFeedbackController, getFeedbackController } from '../controller/feedback';


const router = Router()


router
  .post('/',createFeedbackController)
  .get('/',getFeedbackController)
  .delete('/',deleteFeedbackController)
export {router as feedBackRouter}
