import { Router } from "express";
import * as controller from '../controllers/ibuildLoan';

const router = Router();

router.post('/', controller.IBuildLoan);
router.get('/', controller.getAll);
router.delete('/', controller.deleteLoan);

export { router as IbuildRouterLoan };
