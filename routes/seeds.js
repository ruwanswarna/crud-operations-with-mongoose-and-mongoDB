import express from "express";
import User from "../model/user.js";
import Profile from "../model/profile.js";
const router = express.Router();

const users = [
	{
		name: "Anusha",
		username: "fekwsah",
		password: "123434235",
		email: "a@gmail.com",
	},
	{
		name: "Kamal",
		username: "fekwsasedfh",
		password: "12343dfvgh4235",
		email: "b@gmail.com",
	},
	{
		name: "Ajith",
		username: "fekwrsgsah",
		password: "1234sdfv34235",
		email: "e@gmail.com",
	},
	{
		name: "Ravindu",
		username: "fenjkwsah",
		password: "123dv434235",
		email: "d@gmail.com",
	},
	{
		name: "Amal",
		username: "fekwsafxh",
		password: "12343d4235",
		email: "c@gmail.com",
	},
];

const profileImage = [
	{ image: "image 1" },
	{ image: "image 2" },
	{ image: "image 3" },
	{ image: "image 4" },
	{ image: "image 5" },
];

router.post("/", async (req, res) => {
	for (const user of users) {
		try {
			const newUser = await User.create(user);

			const index = users.indexOf(user);
			const newProfile = await Profile.create({
				image: profileImage[index],
				user: newUser._id,
			});

			await User.updateOne({ _id: newUser._id }, { profile: newProfile._id });
		} catch (error) {
			console.log(error);
            return res.status(500).json({error: "database seeding failed"})
		}
        res.status(201).json({msg: "database successfully seeded."})
	}
});

export default router;
