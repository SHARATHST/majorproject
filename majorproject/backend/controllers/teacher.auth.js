const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/teacher.model");
const Subject = require("../models/subject.model");

const mongoose = require('mongoose');


// @desc    Login user
exports.login = async(req, res, next) => {
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

exports.getattendence = async(req,res,next)=> {
  const fs = require('fs');
  const {parse} =require('csv-parse');
  const { subid } = req.body;
  var parser =parse({},function(err,records){
    subfun(records)
  })
  fs.createReadStream('.././FACE DETECTON/Attendance.csv').pipe(parser);
  res.send("ok")
  const subfun = (data) =>{
    var data1=data.map((ele)=>{
      return ele[0]
    })
    // data1.shift()
    // console.log(data1)
    data1.map( async (studentid)=>{
           Subject.find({"_id":subid,student:{$elemMatch:{_id:studentid}}},function(err,response){
            // console.log(response)
            response[0]['student'].map((ele)=>{
              if(ele["_id"]==studentid){
               subfun2(ele['attendence'],subid,studentid)
              }
            })

            
           })
          
    })
    const subfun2 = async (attendence,subid,studentid)=>{
      attendence=Number(attendence)
      attendence=attendence+1
      const data = await Subject.updateOne({"_id":subid ,"student._id":studentid},
      {$set:{
       "student.$.attendence":attendence ,
      
     }}
         );
        // console.log(data)
        fs.writeFile('.././FACE DETECTON/Attendance.csv','',(err)=>{
          if(err){
            console.log(err)
          }
        })
    }
  }
  
}

exports.register = async (req, res, next) => {
 
    const { name,password,id } = req.body;
    const subject=id

      var _id = new mongoose.Types.ObjectId(); 
      try {
        const user = await User.create({
          _id,
          name,
          password,
          subject,
        });
        
        sendToken(user, 200, res);
      } catch (err) {
        next(err);
      }
      Subject.findOneAndUpdate({"_id":subject}, { $push :{ teacher : { "_id" : _id} } },{new : true ,useFindAndModify:false, upsert:true},function(err,res){
        if(err){
          console.log(err)
        }
      });
     
     
     
  };


  exports.remove = async(req, res, next) => {

    const { _id, subid } = req.body;
    var userID =mongoose.Types.ObjectId(_id);
    var subjectID = mongoose.Types.ObjectId(subid);

    try {
        User.findByIdAndUpdate(userID, { $pull: { "subject" : subjectID } },  function(err, res) {
            if (err) {
                console.log(err)
            }
           
    
        });
        
    } catch (err) {
        next(err);
    }

    try{
        Subject.findByIdAndUpdate(subjectID,{ $pull :{ teacher : { "_id" : userID} } },  function(err, res) {
            if (err) {
                console.log(err)
            }
          
        });
    }
    catch (err) {
        next(err);
    }
    res.send("teacher removed sucessfully ")
};
exports.findall = async(req, res) => {
   
 let url = req.url;
    params = url.split('?')[1];
    params = url.split('=')[1];
    const data=await Subject.findById(params).populate({path :"student._id", select : "name usn "})
    res.send(data);
};

exports.getsub = async(req, res, next) => {
    let url = req.url;
    params = url.split('?')[1];
    params = params.split('=')[1];
    var str = params.toString();
    str = str.replace('+', ' ');
    str = str.replace('+', ' ');
    str = str.replace('+', ' ');
    const data = await  User.find({'name':str }).populate({path : "subject",select :"name"})
    res.send(data)

};

exports.removeassignment = async(req, res, next) => {
    let error = 0
    const  { _id,teachid,subid } = req.body
    try{
        await  Subject.findOneAndUpdate({"_id":subid,"teacher._id":teachid},
        { $pull :{ "teacher.$.questions": { "_id" :_id} }
        })
    
      }
      catch (err) {
        next(err);
      }
      if(error==0){
        res.send("ok")
  
      } 
    //   res.send("ok")
    
};
exports.editassignment = async(req, res, next) => {
    let error = 0
    const  { _id,teachid,subid,qno,question } = req.body
    const qnum=Number(qno)
    try{
       const data = await Subject.findOneAndUpdate({"_id":subid},
        { $set :{ "teacher.$[teach].questions.$[quest].qno":qnum ,
        "teacher.$[teach].questions.$[quest].question":question   }},
       {"arrayFilters":[{"teach._id":teachid},{"quest._id":_id}]}
       
        ); 
    //    console.log(data)
      }
      catch (err) {
        next(err);
        error=1
      }
    if(error==0){
      res.send("ok")

    }    
};
exports.addassignment= async(req, res, next) => {
    let error = 0
    const  { teachid,subid,qno,question } = req.body
    console.log(subid,teachid)
    var _id = new mongoose.Types.ObjectId(); 
    try{
       const data =  await  Subject.findOneAndUpdate({"_id":subid,"teacher._id":teachid},
       { $push :{ "teacher.$.questions": { "_id" :_id, "qno":qno, "question":question } } }
       )
       console.log(data)
      }
      catch (err) {
        next(err);
        error=1
      }
    if(error==0){
      res.send("ok")

    }    
};
exports.deleteteach = async(req, res, next) => {
    const  { _id, } = req.body
    try{
        User.deleteMany( {'_id':_id} , function(err){
         
        res.send("teacher deleted!")
        });
       
        Subject.updateMany({},{ $pull :{ teacher : { "_id" : _id} } },function (err){
            if(err){
              console.log(err)
            } 
          })
      }
      catch (err) {
        next(err);
      }
    
};

exports.addsubject = async(req, res,next ) => {
    const { name, id } = req.body;

        asub1(id)
    
        async function asub1(sid) {
            User.find({ 'name': name }, function(err, userobj) {
                if (err) {
                    res.send(err)
                }
                if(userobj.length===0){
                   
                    res.send( new ErrorResponse("Invalid credentials", 401))
                 }
                if(userobj.length!=0){
                 
                    asub2(userobj[0]['_id'], sid)
                    }
            });
    
        }
    
        async function asub2(userid, subjectid) {
    
            Subject.findOneAndUpdate({ "_id": subjectid },{ $push :{ teacher : { "_id" : userid} } } , { new: true, useFindAndModify: false, upsert: true }, function(err, res) {
                if (err) {
                    console.log(err)
                }
            });
            User.findOneAndUpdate({ "_id": userid }, { $push: { "subject": subjectid } }, { new: true, useFindAndModify: false, upsert: true }, function(err, res) {
                if (err) {
                    console.log(err)
                }
               ()=>{ res.send("subject added sucessfully")}
            });
        }
    

    
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};