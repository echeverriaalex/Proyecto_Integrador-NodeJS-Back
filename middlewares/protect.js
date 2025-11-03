import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
    try {
        //const token = req.header("x-token");
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded.user);

        if(!user) {
            return res.status(401).json({ message: "Unauthorized, user not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized, invalid token.", error: error.message });
    }
};

export default protect;