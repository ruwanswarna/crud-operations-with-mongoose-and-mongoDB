import { Schema, model } from "mongoose";
/** @type {import('mongoose').Schema<Profile>}  tell vscode to apply mongoose code suggestions*/
//create an schema
const profileSchema = new Schema(
	{
		image: { type: String, unique: false, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true 
        }
	},
	{ timestamps: true }
);
const Profile = model("Profile", profileSchema);
/** @type {import('mongoose').Model<Profile>} for code suggestions in routers */
export default Profile;
 