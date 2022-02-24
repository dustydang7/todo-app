const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        //1. get token

        const jwtToken = req.header("jwtToken");

        //check if not token
        if(!jwtToken) {
            return res.status(403).json({msg: "authorization denied"});
        }

        //2. verify token

        try {
            const payload = jwt.verify(jwtToken, process.env.jwtSecret);

            req.user = payload.user;
            next();

        } catch (err) {
            console.error(err.message);
        }
        
    } catch (err) {
        console.error(err.message)
        return res.status(403).json("not authorize");
    }
}