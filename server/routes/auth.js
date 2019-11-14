const express = require("express");
const router = express.Router()
const { register } = require("../controllers/auth");

// route: /api/auth + /register from controllers
router.post("/register", register);

module.exports = router;
