import { Router } from 'express';
import { createFeedbackController, deleteFeedbackController, getFeedbackController, getFeedbackRequestController } from '../controller/feedbackController';


const router = Router()


router
  .post('/',createFeedbackController)
  .get('/',getFeedbackController)
  .delete('/',deleteFeedbackController)
  .get('/requested_feedback',getFeedbackRequestController)
export {router as feedBackRouter}
