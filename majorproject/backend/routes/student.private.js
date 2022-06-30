const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/student.private");
const { protect } = require("../middleware/student.auth");

router.route("/").get(protect, getPrivateRoute);

module.exports = router;
