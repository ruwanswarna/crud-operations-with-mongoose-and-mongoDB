import express from "express";
import Category from "../model/category.js";
import Product from "../model/product.js";
const router = express.Router();

//get all categories
router.get("/", async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json({ success: true, error: null, data: categories });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//create category
router.post("/", async (req, res) => {
	const { name } = req.body;
	try {
		const newCategory = await Category.create({ name });
		res.status(201).json({ success: true, error: null, data: newCategory });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//add product to category
router.put("/:catId", async (req, res) => {
	const catId = req.params.catId;
	const { product } = req.body;

	try {
		const categoryData = await Category.findById(catId);
		if (!categoryData) {
			return res
				.status(404)
				.json({ success: false, error: "no such category", data: null });
		}
		const productData = await Product.findById(product);
		if (!productData) {
			return res
				.status(404)
				.json({ success: false, error: "no such product to add", data: null });
		}

		await Category.updateOne({ _id: catId }, { $push: { products: product } });
		res.status(200).json({ success: true, error: null, data: categoryData });
		//or
		// categoryData.products.push(product);
		// await categoryData.save();

		await Product.updateOne(
			{ _id: productData._id },
			{ $push: { category: categoryData._id } }
		);
		res
			.status(200)
			.json({ success: true, error: null, data: "product added to category" });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//delete product from multiple categories
router.delete("/:catId", async (req, res) =>                             {
	const catId = req.params.catId;
	const productId = req.body.productId;
	if (!productId) {
		return res.status(400).json({
			success: false,
			error: "request body data not found/ bad request",
			data: null,
		});
	}
	try {
		await Category.updateMany(
			{ products: productId },
			{ $pull: { products: productId } }
		);
		await Product.updateOne({ _id: productId }, { $pull: { category: catId } });
		res.status(200).json({
			success: true,
			error: null,
			data: "product removed",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

export default router;
