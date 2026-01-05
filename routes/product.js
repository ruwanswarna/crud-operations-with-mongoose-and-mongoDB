import express from "express";
import Product from "../model/product.js";
import User from "../model/user.js";
const router = express.Router();

//get all products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json({ success: true, error: null, data: products });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//create a product
router.post("/:userId", async (req, res) => {
	const userId = req.params.userId;
	const { name, image } = req.body;
	try {
		const newProduct = await Product.create({ name, image, user: userId });
		await User.updateOne(
			{ _id: userId },
			{ $push: { products: newProduct._id } }
		);
		//const user = await User.findByIdAndUpdate();
		// user.products.push(newProduct._id);
		// await user.save();
		res.status(200).json({ success: true, error: null, data: newProduct });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal  server error");
	}
});

//update a product
router.put("/:productId", async (req, res) => {
	const productId = req.params.productId;
	const { name, image, user } = req.body;
	try {
        const productData = await Product.findById(productId);
        //previous user = new user
            productData.name = name;
            productData.image = image;
        ////
        if(productData.user===user){
            
            await productData.save();
            return res.status(200).json({ success: true, error: null, data: productData });
        }
        await User.updateOne({_id: productData.user}, {$pull: {products: productData._id}});
        await User.updateOne({_id: user}, {$push: {products: productId}});
        
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal  server error");
	}
});

export default router;
