import { Router } from "express";
import { RequestsController } from "../controllers/requests.controller.js";
import { validateDNI } from "../middlewares/vadalite.middleware.js";

const router = Router();

router.get('/request/:dni', validateDNI, RequestsController.getById);
// router.post('/consult-and-save', RequestsController.consultAndSave);

export default router;