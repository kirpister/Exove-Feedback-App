import { Router } from "express";
import { logoutController } from "../controller/logout/logoutController";
const router = Router();

router.post("/", logoutController);

export { router as logoutRouter };
