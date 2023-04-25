import { Router } from "express";
import { login } from "../controller/login/login";
const router = Router();

router.post("/", login);

export { router as loginRouter };
