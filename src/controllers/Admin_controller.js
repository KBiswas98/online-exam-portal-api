const Admin = require("../models/Admin_model");
const {
    AdminLogin,
    bodyValidator,
    passwordEncrypt,
} = require("../helper/authHelper");
const { generateAdminAccessToken } = require("../middlewares/Admin_middleware");

exports.login = (req, res, next) => {
    bodyValidator(req.body, ["email", "password"])
        .then((body) => {
            AdminLogin(body.email, body.password)
                .then((result) => {
                    res.json({
                        status: true,
                        message: "successfull login.",
                        data: result,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({ status: false, message: err });
                });
        })
        .catch((err) => {
            console.log(err);
            res.json({ status: false, message: err });
        });
};

exports.addAdmin = (req, res, next) => {
    const admin = new Admin({
        ...req.body,
        password: passwordEncrypt(req.body.password),
    });

    admin.save((err, data) => {
        if (err) {
            //    console.log(err);
            res.status(201).json({
                status: false,
                message: err._message || req.body.email + " already exist",
            });
        } else {
            const obj = {
                status: true,
                message: "admin added successfully",
                token: generateAdminAccessToken({
                    id: data._id,
                    weight: Date.now(),
                }),
                //  object: data,
            };
            res.status(200).json(obj);
        }
    });
};

exports.showAdmin = (req, res, next) => {
    Admin.find()
        .then((result) => {
            res.json({
                status: true,
                message: "Data from Admin",
                data: result,
            });
        })
        .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.singleAdmin = (req, res, next) => {
    Admin.findById(req.params.id)
        .then((result) => {
            res.json({
                status: true,
                message: "Data from Admin",
                data: result,
            });
        })
        .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.updateAdmin = (req, res, next) => {
    Admin.update(
        { _id: req.body.id },
        {
            $set: { ...req.body, updated_at: new Date().toISOString() },
        },
        { returnOriginal: false },
        (err, result) => {
            if (err) {
                const obj = {
                    status: false,
                    message: err,
                };
                res.status(201).json(obj);
            } else {
                const obj = {
                    status: true,
                    message: "Admin update successfully.",
                    //  object: Admin.findById(req.body.id).then(),
                };
                res.status(200).json(obj);
            }
        }
    );
};

exports.deleteAdmin = (req, res, next) => {
    console.log(req.params.id);
    Admin.findByIdAndRemove(req.params.id)
        .then(() => {
            const obj = {
                status: true,
                message: "Admin deleted successfully.",
            };
            res.status(200).json(obj);
        })
        .catch((err) => res.status(400).send({ status: false, message: err }));
};
