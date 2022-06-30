const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  getstudent,
  getteacher,
  getsubofstudent,
  editstudent,
  editteacher,
} = require("../controllers/admin.auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/getstudent").get(getstudent);

router.route("/getteacher").get(getteacher);

router.route("/editstudent").post(editstudent);

router.route("/editteacher").post(editteacher);

router.route("/getsubofstudent").get(getsubofstudent);



module.exports = router;
