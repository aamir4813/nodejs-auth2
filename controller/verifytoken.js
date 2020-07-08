const jwt = require("jsonwebtoken");

// function auth (req , res , res)
const auth = (req, res, next) => {
    const token = req.header("x-access-token");

    // IF THERE IS NO x-access-token HEADER
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("INVALID TOKEN");
    }
};

module.exports = auth;