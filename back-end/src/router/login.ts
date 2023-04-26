import { Router } from 'express';
import { loginController } from '../controller/login/loginController';
const router = Router();

router.post('/', loginController);

export { router as loginRouter };
