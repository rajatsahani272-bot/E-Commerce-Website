import expres from "express";
import { placeOrder } from "../controllers/orderController.js";

const router=expres.Router();

router.post('/place',placeOrder);

export default router;