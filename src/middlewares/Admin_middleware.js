const jwt = require("jsonwebtoken");

exports.generateAdminAccessToken = (message) => {
    return jwt.sign(message, process.env.JWT_SEC_ADMIN, {
        expiresIn: "1800s",
    });
};

exports.adminAuthenticateToken = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SEC_ADMIN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
};
