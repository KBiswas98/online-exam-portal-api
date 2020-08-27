const Student = require("../models/Student_model");
const {
     bodyValidator,
     passwordEncrypt,
     StudentLogin,
} = require("../helper/authHelper");
const {
     generateStudentAccessToken,
} = require("../middlewares/Student_middleware");

exports.login = (req, res, next) => {
     bodyValidator(req.body, ["email", "password"])
          .then((body) => {
               StudentLogin(body.email, body.password)
                    .then((result) => {
                         console.log(result);
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

exports.addStudent = (req, res, next) => {
     const student = new Student({
          ...req.body,
          password: passwordEncrypt(req.body.password),
     });

     student.save((err, data) => {
          if (err) {
               console.log(err);
               res.status(201).json({
                    status: false,
                    message: err._message || req.body.email + " already exist",
               });
          } else {
               const obj = {
                    status: true,
                    message: "student added successfully",
                    data: {
                         email: req.body.email,
                         name: req.body.name,
                         token: generateStudentAccessToken({
                              id: data._id,
                              weight: Date.now(),
                         }),
                    },

                    //  object: data,
               };
               res.status(200).json(obj);
          }
     });
};

exports.showStudent = (req, res, next) => {
     Student.find()
          .then((result) => {
               res.json({
                    status: true,
                    message: "Data from Student",
                    data: result,
               });
          })
          .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.singleStudent = (req, res, next) => {
     console.log(req.params);
     let rgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     if (!rgx.test(req.params.id)) {
          Student.findById(req.params.id)
               .then((result) => {
                    res.json({
                         status: true,
                         message: "Data from Student",
                         data: result,
                    });
               })
               .catch((err) =>
                    res.status(400).json({ status: false, data: err })
               );
     } else {
          Student.find({ email: req.params.id })
               .then((result) => {
                    res.json({
                         status: true,
                         message: "Data from Student",
                         data: result,
                    });
               })
               .catch((err) =>
                    res.status(400).json({ status: false, data: err })
               );
     }
};

exports.updateStudent = (req, res, next) => {
     Student.update(
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
                         message: "Student update successfully.",
                         //  object: Student.findById(req.body.id).then(),
                    };
                    res.status(200).json(obj);
               }
          }
     );
};

exports.deleteStudent = (req, res, next) => {
     console.log(req.params.id);
     Student.findByIdAndRemove(req.params.id)
          .then(() => {
               const obj = {
                    status: true,
                    message: "Student deleted successfully.",
               };
               res.status(200).json(obj);
          })
          .catch((err) =>
               res.status(400).send({ status: false, message: err })
          );
};
