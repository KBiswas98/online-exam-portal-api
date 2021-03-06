const jwt = require("jsonwebtoken");

exports.generateAdminAccessToken = (message) => {
     return jwt.sign(message, process.env.JWT_SEC_ADMIN, {
          expiresIn: "1800s",
     });
};

exports.adminAuthenticateToken = (req, res, next) => {
     console.log(req.headers);
     const authHeader = req.headers["authorization"];
     console.log("<<<<<<<<<< admin midd >>>>>>>>>>>>>", authHeader);
     const token = authHeader && authHeader.split(" ")[1];
     if (token == null) return res.sendStatus(401);

     jwt.verify(token, process.env.JWT_SEC_ADMIN, (err, user) => {
          if (err) {
               console.log(err);
               return err.message == "jwt expired"
                    ? res.sendStatus(401)
                    : res.sendStatus(403);
          }
          req.user = user;
          next(); // pass the execution off to whatever request the client intended
     });
};
