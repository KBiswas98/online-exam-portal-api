var md5 = require("md5");
const Student = require("../models/Student_model");
const Admin = require("../models/Admin_model");
const jwt = require("jsonwebtoken");
const {
    generateStudentAccessToken,
} = require("../middlewares/Student_middleware");
const { generateAdminAccessToken } = require("../middlewares/Admin_middleware");

exports.passwordEncrypt = (pass) => {
    return md5(pass);
};

exports.bodyValidator = (body, vlid = ["email", "password"]) => {
    return new Promise((resolve, reject) => {
        if (vlid.every((itm) => Object.keys(body).includes(itm) === true)) {
            resolve(body);
        } else {
            reject(
                `You must provide ${vlid
                    .filter((itm) => Object.keys(body).includes(itm) === false)
                    .toString()}`
            );
        }
    });
};

exports.StudentLogin = (email, password) => {
    password = md5(password);

    return new Promise((resolve, reject) => {
        Student.findOne({ email, password })
            .then((result) => {
                console.log(result);
                resolve({
                    email,
                    name: result.name,
                    token: generateStudentAccessToken({
                        id: result._id,
                        weight: Date.now(),
                    }),
                });
            })
            .catch((err) => {
                console.log(err);
                reject("No data found.");
            });
    });
};

exports.AdminLogin = (email, password) => {
    password = md5(password);

    return new Promise((resolve, reject) => {
        Admin.findOne({ email, password })
            .then((result) => {
                console.log(result);
                resolve({
                    email,
                    name: result.name,
                    token: generateAdminAccessToken({
                        id: result._id,
                        weight: Date.now(),
                    }),
                });
            })
            .catch((err) => {
                console.log("err is : ", err);
                reject("No data found.");
            });
    });
};
