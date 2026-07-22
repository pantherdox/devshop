const express = require("express")

const router = express.Router();

const { register, login, getMe, forgetPassword, verifyOtp } = require("../controllers/auth.controller")

const {protect} = require("../middleware/auth.middleware")

router.post("/register", register);
router.post("/login", login)
router.get("/me", protect, getMe)
router.post("/forget", forgetPassword)
router.post("/verify-otp", verifyOtp)

module.exports = router