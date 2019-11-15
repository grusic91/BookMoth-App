const express = require("express");
const router = express.Router()
const { authMiddleware } = require("../controllers/auth");

// route: /api/auth + /register from controllers
router.get("/books", authMiddleware, function(req, res, next) {
  res.json({"success": "true"})
});


module.exports = router;
