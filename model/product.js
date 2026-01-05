import { Schema, model } from "mongoose";
/** @type {import('mongoose').Schema<Product>}  tell vscode to apply mongoose code suggestions*/
//create an schema
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
/** @type {import('mongoose').Model<Product>} for code suggestions in routers */
export default Product;
