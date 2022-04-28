import jwt from "jsonwebtoken";

//custom middleware
export const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        //console.log(token);
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};