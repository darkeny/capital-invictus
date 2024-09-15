import { Router } from "express";
import * as controller from '../controllers/ContactEmailSender';

const router = Router();

router.post('/', controller.sendMessageController);

export { router as sendMessageRouter };
