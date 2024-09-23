import { Router } from "express";
import * as controller from '../controllers/ibuildSignup';

const router = Router();

router.post('/', controller.IBuild);
router.get('/', controller.getAll);
router.delete('/', controller.deleteCustomer);

export { router as IbuildRouter };
