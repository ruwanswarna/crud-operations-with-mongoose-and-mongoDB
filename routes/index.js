import express from "express";
import userRouter from "./user.js";
import productRouter from "./product.js";
import categoryRouter from "./category.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

export default router;