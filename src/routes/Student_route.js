const express = require("express");
const router = express.Router();
const studentcontroller = require("../controllers/Student_controller");
const {
    studentAuthenticateToken,
} = require("../middlewares/Student_middleware");

router.get("/", studentAuthenticateToken, studentcontroller.showStudent);
router.get("/:id", studentAuthenticateToken, studentcontroller.singleStudent);
router.post("/add", studentcontroller.addStudent);
router.patch(
    "/update",
    studentAuthenticateToken,
    studentcontroller.updateStudent
);
router.delete(
    "/remove/:id",
    studentAuthenticateToken,
    studentcontroller.deleteStudent
);
router.post("/login", studentcontroller.login);

module.exports = router;
