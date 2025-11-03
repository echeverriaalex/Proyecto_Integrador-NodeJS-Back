import { query } from "express-validator";

const confirmValidation = [
    query("token")
        .notEmpty()
        .withMessage("Token is required")
        .isLength({ min: 6, max: 6 })
        .withMessage("Token must be 6 characters long")
];

export default confirmValidation;