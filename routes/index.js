import express from "express";
import userRouter from "./user.js";
import productRouter from "./product.js"

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;