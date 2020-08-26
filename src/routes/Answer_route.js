const express = require("express");
const router = express.Router();
const answercontroller = require("../controllers/Answer_controller");
const {
     studentAuthenticateToken,
} = require("../middlewares/Student_middleware");
const { adminAuthenticateToken } = require("../middlewares/Admin_middleware");

router.get("/", studentAuthenticateToken, answercontroller.showAnswer);
router.get("/:id", studentAuthenticateToken, answercontroller.singleAnswer);
router.post("/add", studentAuthenticateToken, answercontroller.addAnswer);
router.patch(
     "/update",
     studentAuthenticateToken,
     answercontroller.updateAnswer
);
router.delete(
     "/remove/:id",
     adminAuthenticateToken,
     answercontroller.deleteAnswer
);

router.get(
     "/search-by-qid/:qid",
     studentAuthenticateToken,
     answercontroller.searchByQid
);
router.get(
     "/search-by-email/:email",
     studentAuthenticateToken,
     answercontroller.searchByEmail
);

module.exports = router;
