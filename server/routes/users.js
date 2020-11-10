const express = require("express");
const router = express.Router();
const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
/* const { confirmEmail } = require("../controllers/confirmEmail"); */
/* router.get("/confirm/:id", confirmEmail); */

// route: /api/users + /register
router.post("/register", register);

// route: /api/users/login
router.post("/login", login);

module.exports = router;
