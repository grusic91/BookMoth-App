const express = require("express");
const router = express.Router()
const { register, auth } = require("../controllers/auth");
const { sendVerificationEmail } = require("../controllers/email.controller");
const { confirmEmail } = require("../controllers/confirmEmail");

// route: /api/auth + /register from controllers

router.post("/send", sendVerificationEmail); // before register sen verification email

router.post("/register", register);

router.get("/confirm/:id", confirmEmail);


router.post("/login", auth);

module.exports = router;
