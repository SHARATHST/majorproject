const Subject = require("../models/subject.model");
const Teacher = require("../models/teacher.model")
const Student = require("../models/student.model")
const mongoose = require('mongoose');

exports.register = async (req, res, next) => {
  var _id = new mongoose.Types.ObjectId();
  const { subjectname } = req.body;
  const name = subjectname
      try {
      await Subject.create({
        _id,
        name
      });
    res.send("subject registered");
     
    } catch (err) {
      next(err);
    }
    
   
};
exports.getsol = async(req, res) => {
   //sid is subject id
  let url = req.url;
  url = url.split('?')[1];
   var  id = url.split('&')[1];
   id = id.split('=')[1];
   var  sid = url.split('&')[0];
   sid = sid.split('=')[1];
     var query = {$and :[{"_id":sid },{"student._id":id}]}
      const data=await Subject.find(query).populate(
      {path :"student", 
      select : "name"
      })
     res.send(data);

  };


exports.findall = async (req,res,next) => {

  try{
    Subject.find({},function(err,users){
      res.send(users)
  
    });
  }
  catch (err) {
    next(err);
  }

};

exports.deletesub = async (req,res,next) => {
   const  { _id, } = req.body
  try{
    Subject.deleteMany( {'_id':_id} , function(err){
    if(err){
      console.log(err)
    }    
    });
    Teacher.updateMany({subject:_id},{$pull : {subject :_id }},function (err){
      if(err){
        console.log(err)
      } 
    })
    Student.updateMany({subject:_id},{$pull : {subject :_id }},function (err){
      if(err){
        console.log(err)
      } 
    })
   
  }
  catch (err) {
    next(err);
  }
   res.send("subject deleted!")
};






