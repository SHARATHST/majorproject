const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  findall,
  deletesub,
  getsol,
} = require("../controllers/subject");

router.route("/register").post(register);

router.route("/delete").post(deletesub);

router.route("/findall").get(findall);

router.route("/getsol").get(getsol);

module.exports = router;
