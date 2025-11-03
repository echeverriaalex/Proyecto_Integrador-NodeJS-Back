import  { hashSync } from "bcryptjs";

const hashPassword = (req, res, next) => {
    const { password } = req.body;
    req.body.password = hashSync(password, 10);
    next();
};

export default hashPassword;