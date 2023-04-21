import { Router } from "express";
import { welcome } from "../controller/welcomeController";
const router = Router();

router.get("/", welcome);

export { router as welcomeRouter };
