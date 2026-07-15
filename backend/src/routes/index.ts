import { Router, type IRouter } from "express";
import healthRouter from "./health";
import simpleHealthRouter from "./simpleHealth";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(simpleHealthRouter);
router.use(contactRouter);

export default router;
