const express = require("express");
const router = express.Router();
const questioncontroller = require("../controllers/Question_controller");
const { adminAuthenticateToken } = require("../middlewares/Admin_middleware");
const {
    studentAuthenticateToken,
} = require("../middlewares/Student_middleware");

router.get("/", studentAuthenticateToken, questioncontroller.showQuestion);
router.get("/:id", studentAuthenticateToken, questioncontroller.singleQuestion);
router.post("/add", adminAuthenticateToken, questioncontroller.addQuestion);
router.patch(
    "/update",
    adminAuthenticateToken,
    questioncontroller.updateQuestion
);
router.delete(
    "/remove/:id",
    adminAuthenticateToken,
    questioncontroller.deleteQuestion
);

module.exports = router;
