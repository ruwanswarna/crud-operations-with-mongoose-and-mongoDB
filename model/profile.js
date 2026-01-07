import { Schema, model } from "mongoose";
import User from "./user.js";
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

//prefunction for profile delete
profileSchema.pre('deleteOne',async function (next){
    const profile = await this.model.findOne(this.getQuery());
    if(profile){
        await User.updateOne({profile: profile._id},{profile:null});
    }
    next();
} );


const Profile = model("Profile", profileSchema);
/** @type {import('mongoose').Model<Profile>} for code suggestions in routers */
export default Profile;
 