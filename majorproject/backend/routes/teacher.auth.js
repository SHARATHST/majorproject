const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  findall,
  getsub,
  addsubject,
  deleteteach,
  remove,
  removeassignment,
  editassignment,
  addassignment,
  getattendence,
} = require("../controllers/teacher.auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/findall").get(findall);

router.route("/getsub").get(getsub);

router.route("/delete").post(deleteteach);

router.route("/remove").post(remove);

router.route("/addsubject").post(addsubject);

router.route("/removeassignment").post(removeassignment);

router.route("/editassignment").post(editassignment);

router.route("/addassignment").post(addassignment);

router.route("/getattendence").post(getattendence);


module.exports = router;
