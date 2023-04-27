import { Router } from 'express';
import { validateController } from '../controller/validate/validateController';
const router = Router();

router.post('/', validateController);

export { router as validateRouter };
