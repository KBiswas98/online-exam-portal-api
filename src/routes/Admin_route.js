const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/Admin_controller");
const { adminAuthenticateToken } = require("../middlewares/Admin_middleware");

router.get("/", adminAuthenticateToken, admincontroller.showAdmin);
router.get("/:id", adminAuthenticateToken, admincontroller.singleAdmin);
router.post("/add", admincontroller.addAdmin);
router.patch("/update", adminAuthenticateToken, admincontroller.updateAdmin);
router.delete(
    "/remove/:id",
    adminAuthenticateToken,
    admincontroller.deleteAdmin
);
router.post("/login", admincontroller.login);

module.exports = router;
