const jwt = require("jsonwebtoken");
const { studentLavel } = require("../helper/accessLavel");

exports.generateStudentAccessToken = (message) => {
    return jwt.sign(message, process.env.JWT_SEC_STUDENT, {
        expiresIn: "1800s",
    });
};

exports.studentAuthenticateToken = (req, res, next) => {
    console.log(">>>>>>>>>>>>>>>>..");
    console.log(req.headers);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SEC_ADMIN, (err, user) => {
        if (err) {
            jwt.verify(token, process.env.JWT_SEC_STUDENT, (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next(); // pass the execution off to whatever request the client intended
            });
        } else {
            req.user = user;
            next();
        }
    });
};
