const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/teacher.private");
const { protect } = require("../middleware/teacher.auth");

router.route("/").get(protect, getPrivateRoute);

module.exports = router;
