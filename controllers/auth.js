import User from "../models/user.js";
import randomstring from "randomstring";
import mail from "../utils/mail.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {      
        const { name, email, password } = req.body;
        const token = randomstring.generate(6);
        const user = new User({ name, email, password, token });
        await user.save();
        //mail(email, "Confirm your email", `Please confirm your email by clicking on this link: ${process.env.APP_URL}/auth/confirm/${token}`);
        mail(
            email, 
            "Confirm your registration", 
            `Thank you for registering ${name}. Please confirm your email. Your token is: ${token} http://localhost:4000/auth/confirm?token=${token}`
        );
        //res.status(201).json({ message: "User registered successfully" });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const confirmEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.confirmed = true;
        //user.token = null;
        await user.save();
        mail(
            user.email, 
            "Email confirmed",
            `Thank you for confirming your email, ${user.name}.`
        );
        res.status(200).json({ message: "Email confirmed successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        /*
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // para cuando encripte la password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        */

        const token = jwt.sign({ user: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { email, token } = req.body;
        const user = await User.findOne({ email });
        jwt.verify(req.headers["token"], process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token" });
            }

            const newToken = jwt.sign({ user: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });
            res.status(200).json({ message: "Token refreshed successfully", token: newToken });
        });

        /*
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const newToken = jwt.sign({ user: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "Token refreshed successfully", token: newToken });
        */
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const refreshTokenFromHeader = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token" });
            }

            const newToken = jwt.sign({ user: decoded.user }, process.env.JWT_KEY, { expiresIn: "1h" });
            res.status(200).json({ message: "Token refreshed successfully", token: newToken });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};