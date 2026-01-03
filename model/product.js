import { Schema, model } from "mongoose";

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		image: { type: String },
		user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	},
	{
		timestamps: true,
	}
);

const Product = model("Product", productSchema);
export default Product;
