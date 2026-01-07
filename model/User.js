import { model, Schema } from "mongoose";
import Profile from "./profile.js";
import Product from "./product.js";
import Category from "./category.js";
/** @type {import('mongoose').Schema<User>}  tell vscode to apply mongoose code suggestions*/

// create an schema
const userSchema = new Schema(
	{
		name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		email: {
			type: String,
			lowercase: true,
			match: [/.+@.+\..+/, "Please enter a valid email address"],
		},
		profile: {
			type: Schema.Types.ObjectId,
			ref: "Profile",
			unique: true,
			sparse: true,
		},
		products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
	},
	{
		timestamps: true,
	}
);

//prefunction for user delete and all relations profile, product, categories
userSchema.pre("deleteOne", async function (next) {
	const user = await this.model.findOne(this.getQuery());
	if (user) {
		await Profile.deleteOne({ user: user._id });

		const products = user.products;
		products.forEach(async (product) => {
			await Category.updateMany(
				{ product: product },
				{ $pull: { product: product } }
			);
			//await Product.deleteOne({_id: product});
		});

		await Product.deleteMany({ user: user._id });
	}
	next();
});

//create model with that schema
const User = model("User", userSchema); //using that schema create a model

/** @type {import('mongoose').Model<User>} for code suggestions in routers */
export default User;

//NOTE
// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare passwords
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Remove password from output
// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };
