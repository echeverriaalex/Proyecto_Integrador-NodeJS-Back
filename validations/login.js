import { body } from 'express-validator';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const validateEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email not found');
    }
    return true;
}

const validatePassword = async (password, { req }) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        throw new Error('Email not found.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password.');
    }
    return true;
}

export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(validateEmail),
    body('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .custom(validatePassword),
];

export default loginValidation;