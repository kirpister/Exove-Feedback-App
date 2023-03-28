import { Router } from 'express';
import { createFeedbackController, deleteFeedbackController, getFeedbackController } from '../controller/feedbackController';


const router = Router()


router
  .post('/',createFeedbackController)
  .get('/',getFeedbackController)
  .delete('/',deleteFeedbackController)
export {router as feedBackRouter}
