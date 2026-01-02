import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DATABASE_URL);
		console.log("MongoDB Connected");  
	} catch (error) {
		console.log("MongoDB refused to connect" + error.message);
		process.exit(1); //1-means faliure or unexpected, 0 - means expected termination
	}
};

export default connectMongoDB;
