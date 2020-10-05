const express = require("express");
const router = express.Router()
const { register, auth } = require("../controllers/auth");
const { confirmEmail } = require("../controllers/confirmEmail");

// route: /api/auth + /register from controllers



router.post("/register", register);

router.get("/confirm/:id", confirmEmail);


router.post("/login", auth);

module.exports = router;
