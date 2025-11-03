import { header } from "express-validator";

export const tokenValidation = [
    header("Authorization")
        .exists()
        .withMessage("Authorization header is required")
        .custom((value, { req }) => {
            if (!value.startsWith("Bearer ")) {
                throw new Error("Invalid token format");
            }
            req.token = value.split(" ")[1];
            return true;
        }),
];

export default tokenValidation;