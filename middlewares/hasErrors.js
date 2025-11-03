import { validationResult } from "express-validator";

const hasErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Puedo usar mapped o array segun lo que necesite
        //return res.status(400).json({ errors: errors.array() });
        return res.status(400).json({ errors: errors.mapped() });
    }
    next();
};

export default hasErrors;