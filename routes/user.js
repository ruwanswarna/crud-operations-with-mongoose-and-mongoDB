import express from "express";
import User from "../model/User.js";
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
//delete user by id


export default router;
