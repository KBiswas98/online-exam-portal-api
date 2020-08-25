const Question = require("../models/Question_model");

exports.addQuestion = (req, res, next) => {
    const question = new Question(req.body);

    question.save((err, data) => {
        if (err) {
            //    console.log(err);
            res.status(201).json({
                status: false,
                message: err._message || "question already exist.",
            });
        } else {
            const obj = {
                status: true,
                message: "question added successfully",
                object: data,
            };
            res.status(200).json(obj);
        }
    });
};

exports.showQuestion = (req, res, next) => {
    Question.find()
        .then((result) => {
            res.json({
                status: true,
                message: "Data from Question",
                data: result,
            });
        })
        .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.singleQuestion = (req, res, next) => {
    Question.findById(req.params.id)
        .then((result) => {
            res.json({
                status: true,
                message: "Data from Question",
                data: result,
            });
        })
        .catch((err) => res.status(400).json({ status: false, data: err }));
};

exports.updateQuestion = (req, res, next) => {
    Question.update(
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
                    message: "Question update successfully.",
                    //  object: Question.findById(req.body.id).then(),
                };
                res.status(200).json(obj);
            }
        }
    );
};

exports.deleteQuestion = (req, res, next) => {
    console.log(req.params.id);
    Question.findByIdAndRemove(req.params.id)
        .then(() => {
            const obj = {
                status: true,
                message: "Question deleted successfully.",
            };
            res.status(200).json(obj);
        })
        .catch((err) => res.status(400).send({ status: false, message: err }));
};
