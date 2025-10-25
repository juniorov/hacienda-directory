import { Router } from "express";
import { RequestsController } from "../controllers/requests.controller.js";

const router = Router();

router.get('/request/:dni', RequestsController.getById);
// router.post('/consult-and-save', RequestsController.consultAndSave);

export default router;