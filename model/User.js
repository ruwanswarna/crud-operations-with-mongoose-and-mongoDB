import { model, Schema } from "mongoose";
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
