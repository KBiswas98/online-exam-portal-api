const jwt = require("jsonwebtoken");

exports.generateStudentAccessToken = (message) => {
    return jwt.sign(message, process.env.JWT_SEC_STUDENT, {
        expiresIn: "1800s",
    });
};

exports.studentAuthenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SEC_ADMIN, (err, user) => {
        if (err) {
            jwt.verify(token, process.env.JWT_SEC_STUDENT, (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
            });
        } else {
            req.user = user;
            next();
        }
    });
};
