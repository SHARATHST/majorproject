const express = require("express");
const router = express.Router();

// Controllers
const {
    login,
    register,
    findbyid,
    addsubject,
    getsub,
    deletestudent,
    remove,
    addsolution,
    editsolution,
    removesolution,
} = require("../controllers/student.auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/findbyid").post(findbyid);

router.route("/getsub").get(getsub);

router.route("/delete").post(deletestudent);

router.route("/addsubject").post(addsubject);

router.route("/editsolution").post(editsolution);

router.route("/addsolution").post(addsolution);

router.route("/remove").post(remove);

router.route("/removesolution").post(removesolution);




module.exports = router;