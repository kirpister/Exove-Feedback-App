import {Router} from 'express';
import { welcome } from '../controller/welcome';
const router = Router();

router.get('/', welcome);

export { router as welcomeRouter };
