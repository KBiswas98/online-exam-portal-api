const Answer = require("../models/Answer_model");

exports.addAnswer = (req, res, next) => {
     const answer = new Answer(req.body);

     answer.save((err, data) => {
          if (err) {
               //    console.log(err);
               res.status(201).json({
                    status: false,
                    message: err._message || "Something went wrong",
               });
          } else {
               const obj = {
                    status: true,
                    message: "answer added successfully",
                    object: data,
               };
               res.status(200).json(obj);
          }
     });
};

exports.showAnswer = (req, res, next) => {
     Answer.find()
          .then((result) => {
               res.json({
                    status: true,
                    message: "Data from Answer",
                    data: result,
               });
          })
          .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.singleAnswer = (req, res, next) => {
     Answer.findById(req.params.id)
          .then((result) => {
               res.json({
                    status: true,
                    message: "Data from Answer",
                    data: result,
               });
          })
          .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.searchByQid = (req, res, next) => {
     Answer.find({ qid: req.params.qid })
          .then((result) => {
               res.json({
                    status: true,
                    message: "Data from Answer",
                    data: result,
               });
          })
          .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.searchByEmail = (req, res, next) => {
     Answer.find({ semail: req.params.email })
          .then((result) => {
               res.json({
                    status: true,
                    message: "Data from Answer",
                    data: result,
               });
          })
          .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.updateAnswer = (req, res, next) => {
     Answer.update(
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
                         message: "Answer update successfully.",
                         //  object: Answer.findById(req.body.id).then(),
                    };
                    res.status(200).json(obj);
               }
          }
     );
};

exports.deleteAnswer = (req, res, next) => {
     console.log(req.params.id);
     Answer.findByIdAndRemove(req.params.id)
          .then(() => {
               const obj = {
                    status: true,
                    message: "Answer deleted successfully.",
               };
               res.status(200).json(obj);
          })
          .catch((err) =>
               res.status(400).send({ status: false, message: err })
          );
};
