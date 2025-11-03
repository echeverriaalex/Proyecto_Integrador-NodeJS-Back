import mongoose from "mongoose";

export const connect = async (req, res, next) => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("✔️ MongoDB connected successfully.");
		next()
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		throw error;
	}
};

export default connect;