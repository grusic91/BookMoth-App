const express = require("express");
const router = express.Router()
const { register, auth } = require("../controllers/auth");

// route: /api/auth + /register from controllers
router.post("/register", register);

router.post("/login", auth);

module.exports = router;
