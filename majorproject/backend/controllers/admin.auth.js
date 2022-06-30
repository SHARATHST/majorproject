const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/admin.model");
const Subject = require("../models/subject.model");
const Student = require("../models/student.model")
const Teacher = require("../models/teacher.model")


const mongoose = require('mongoose');


// @desc    Login user
exports.login = async (req, res, next) => {
  const { name, password } = req.body;


  if (!name || !password) {
    return next(new ErrorResponse("Please provide an name and password", 400));
  }

  try {

    const user = await User.findOne({ name }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  const { name,password } = req.body;
  var _id = new mongoose.Types.ObjectId(); 
  try {
    const user = await User.create({
      _id,
      name,
      password,
    });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
  
};

exports.getstudent = async (req, res, next) => {
  let str = req.url;
  str = str.split('?')[1];
  str = str.split('=')[1];

  const data = await  Subject.findById({'_id':str }).populate({path : "student._id",select:"name usn" })
  res.send(data)

  
};
exports.getsubofstudent = async (req, res, next) => {
  let url = req.url;
  url = url.split('?')[1];
   var  id = url.split('&')[1];
   id = id.split('=')[1];
   var  sid = url.split('&')[0];
   sid = sid.split('=')[1];
     var query = {$and :[{"_id":sid },{"student._id":id}]}
      const data=await Subject.find(query)
     res.send(data);

  
};
exports.editstudent = async (req, res, next) => {
  const { name,usn, sid,id,attendence,IA1,IA2,CTA } = req.body;
  console.log
  var CIE = Number(IA1)+Number(IA2)+Number(CTA)
 
     try{
      const data=await Subject.updateOne({"_id":sid ,"student._id":id },
      {$set:{
       "student.$.attendence":attendence ,
       "student.$.ia1":IA1 ,
       "student.$.ia2":IA2 ,
       "student.$.cta":CTA,
       "student.$.cie":CIE
     }}
         );
   const data1 = await Student.updateOne({"_id":id},
   {"name":name,
   "usn":usn}) ;
     } 
     catch (err) {
      next(err);
    }    
    //  console.log(data1)       
     res.send("ok");

  
};
exports.editteacher = async(req,res,next) =>{
  const { name,id } = req.body;
  try{
    const data = await Teacher.updateOne({"_id":id},
   {"name":name}) ;
   res.send(data)
  }
  catch(err){
    next(err)
  }
  
}

exports.getteacher = async (req, res, next) => {
  let str = req.url;
  str = str.split('?')[1];
  str = str.split('=')[1];

  const data = await  Subject.findById({'_id':str }).populate({path : "teacher._id",select :"name "})
  res.send(data)

  
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};
