import { Router } from "express";
//import { createOrder, updateOrder, deleteOrder, getUserOrders, getAllOrders, getMonthlyIncome } from "../controllers/orderController.js";
///import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middleware/verifyToken.js";
import { createOrder, getOrders } from "../controllers/orders.js";
import protect from "../middlewares/protect.js";
import { orderValidation } from "../validations/order.js";
import hasErrors from "../middlewares/hasErrors.js";

const router = Router();

router.post("/create", [protect, orderValidation, hasErrors], createOrder);
router.get("/mypurchases", protect, getOrders);

export default router;