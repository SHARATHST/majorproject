const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/admin.private");
const { protect } = require("../middleware/admin.auth");

router.route("/").get(protect, getPrivateRoute);

module.exports = router;
