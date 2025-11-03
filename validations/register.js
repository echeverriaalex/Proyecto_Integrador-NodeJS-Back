import { body } from 'express-validator';
import User from '../models/user.js';

const validateExistEmail = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error('Email is already in use');
        //return Promise.reject('E-mail already in use');
    }
    return true;
}

const registerValidation = [
    body('name')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .notEmpty()
        .withMessage('Name is required'),
	body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(validateExistEmail),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
        .notEmpty()
        .withMessage('Password is required')
        .isStrongPassword()
        .withMessage('Password must include uppercase, lowercase, number, and symbol')
    // Otras formas de validar
    //body('password').custom(validatePassword),
    //body('email').custom(validateExistUser),
];

export default registerValidation;