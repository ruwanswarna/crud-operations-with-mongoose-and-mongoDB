import express from "express";
import User from "../model/user.js";
import Profile from "../model/profile.js";
const router = express.Router();

//create new user
router.post("/", async (req, res) => {
	const data = req.body.data;
	try {
		const newUser = await User.create(data);
		res.status(201).json({ success: true, error: null, data: newUser });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.status(201).json({ success: true, error: null, data: users });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//get user by id
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findOne({ _id: id });
		res.status(200).json({ success: true, error: null, data: user });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//create profile by user id findById()
router.post("/profile/:userId", async (req, res) => {
	const userId = req.params.userId;
	const { image } = req.body;
	if (!image) {
		return res
			.status(400)
			.json({ success: false, error: "Image is required", data: null });
	}

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, error: "user not found", data: null });
		}
		if (user.profile) {
			return res.status(409).json({
				success: false,
				error: "Profile already exists for this user",
				data: null,
			});
		}

		console.log(user);
		const profile = await Profile.create({ image, user: user._id });
		user.profile = profile._id;
		await user.save();
		console.log(profile);
		res.status(201).json({ success: true, error: null, data: profile });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});
//create profile by user id findByIdAndUpdate()
router.post("/_profile/:userId", async (req, res) => {
	const userId = req.params.userId;
	const { image } = req.body;
	if (!image) {
		return res
			.status(400)
			.json({ success: false, error: "Image is required", data: null });
	}

	try {
		const profile = await Profile.create({ user: userId, image });
		const user = await User.findByIdAndUpdate(userId, { profile: profile._id });

		console.log(user);
		console.log(profile);
		res.status(201).json({ success: true, error: null, data: profile });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//delete profile by profile id (pre function)
router.delete("profile/:profileId", async (req, res) => {
	const profileId = req.params.profileId;
	try {
		// await User.updateOne({ profile: profileId }, { profile: null }); //deligated to prefunction

		await Profile.deleteOne({ _id: profileId });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//delete user by user id
router.delete("/:userId", async (req, res) => {
	const userId = req.params.userId;
	try {
		await User.deleteOne({ _id: userId });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

//get profile by user id
router.get("/profile/:userId", async (req, res) => {
	const userId = req.params.userId;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, error: "user not found", data: null });
		}
		if (!user.profile) {
			return res.status(404).json({
				success: false,
				error: "Profile does not exist for this user",
				data: null,
			});
		}
		const profile = await Profile.findOne({ user: user._id });
		res.status(200).json({ success: true, error: null, data: profile });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});
//get profile by user id populate()
router.get("/_profile/:userId", async (req, res) => {
	const userId = req.params.userId;
	try {
		const user = await User.findById(userId).populate("profile");
		//const user = await User.findById(userId).select('profile').populate('profile'); //profile data only
		//const user = await User.findById(userId).select('profile username').populate('profile','image createdAt'); //profile data and user.username only

		if (!user) {
			return res
				.status(404)
				.json({ success: false, error: "user not found", data: null });
		}
		if (!user.profile) {
			return res.status(404).json({
				success: false,
				error: "Profile does not exist for this user",
				data: null,
			});
		}
		res.status(200).json({ success: true, error: null, data: user });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

export default router;
