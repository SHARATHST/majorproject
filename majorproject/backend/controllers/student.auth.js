const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/student.model");
const Subject = require("../models/subject.model");

const mongoose = require('mongoose');

// @desc    Login user
exports.login = async(req, res, next) => {
    const { usn, password } = req.body;

    // Check if email and password is provided
    if (!usn || !password) {
        return next(new ErrorResponse("Please provide an usn and password", 400));
    }

    try {
        const user = await User.findOne({ usn }).select("+password");

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

// @desc    Register user
exports.register = async(req, res, next) => {

    const { name, usn, password, id,attendence,IA1,IA2,CTA } = req.body;
    const subject = id
    var _id = new mongoose.Types.ObjectId();
    var CIE = Number(IA1)+Number(IA2)+Number(CTA)
    const student = {
        "_id":_id,
        "attendence":attendence,
        "ia1":IA1,
        "ia2":IA2,
        "cta":CTA,
        "cie":CIE
    }

    try {
        const user = await User.create({
            _id,
            name,
            usn,
            password,
            subject,
            
        });

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
    Subject.findOneAndUpdate({ "_id": subject }, {$push :{ student :student} }  , { new: true, useFindAndModify: false, upsert: true }, function(err, res) {
        if (err) {
            console.log(err)
        }
    });

};
exports.findbyid = async(req, res, next) => {
    const { usn } = req.body;

    try {

        const result = await User.find({ usn: usn }).exec();
        res.send(result)
    } catch (err) {
        next(err);
    }
};

exports.addsubject = async(req, res,next ) => {
    const {  usn, id,attendence,IA1,IA2,CTA } = req.body;
    

        asub1(id)

    async function asub1(sid) {
       try{
        User.find({ 'usn': usn }, function(err, userobj) {
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
       catch(err){
           res.send(err)
       }

    }

    async function asub2(userid, subjectid) {
       
       try{
        var CIE = Number(IA1)+Number(IA2)+Number(CTA)
        const student = {
            "_id":userid,
            "attendence":attendence,
            "ia1":IA1,
            "ia2":IA2,
            "cta":CTA,
            "cie":CIE
        }
        Subject.findOneAndUpdate({ "_id": subjectid }, { $push :{ student : student } }  , { new: true, useFindAndModify: false, upsert: true }, function(err, res) {
            if (err) {
                console.log(err)
            }
            

        });
       }
        catch(err){
            res.send(err)
        }
       try{
        User.findByIdAndUpdate({ "_id": userid }, { $push: { "subject": subjectid } }, { new: true, useFindAndModify: false, upsert: true }, function(err, res) {
            if (err) {
                console.log(err)
            }
            
           () =>{
            
            res.send("student added to subject  sucessfully")}
        });
       }
        catch(err){
            res.send(err)
        }
    }

    
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
        Subject.findByIdAndUpdate({ "_id": subjectID },  {$pull:{ student:{_id : userID}}} ,  function(err, res) {
            if (err) {
                console.log(err)
            }
          
        });
    }
    catch (err) {
        next(err);
    }
    res.send("student removed sucessfully ")
};

exports.editsolution = async(req, res, next) => {
    let error = 0
    const  { _id,studentid,subid,qno,solution } = req.body
    const qnum=Number(qno)
    try{
       const data = await Subject.findOneAndUpdate({"_id":subid},
        { $set :{ "student.$[stud].solutions.$[sol].qno":qnum ,
        "student.$[stud].solutions.$[sol].solution":solution   }},
       {"arrayFilters":[{"stud._id":studentid},{"sol._id":_id}]}
       
        ); 
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
exports.addsolution= async(req, res, next) => {
    let error = 0
    const  {subid ,studentid,qno,solution } = req.body
    var _id = new mongoose.Types.ObjectId(); 
    try{
       const data =  await  Subject.findOneAndUpdate({"_id":subid,"student._id":studentid},
       { $push :{ "student.$.solutions": { "_id" :_id, "qno":qno, "solution":solution } } }
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

exports.removesolution = async(req, res, next) => {
    let error = 0
    const  { _id,studentid,subid } = req.body
    // console.log(subid,studentid,_id)

    try{
        await  Subject.findOneAndUpdate({"_id":subid,"student._id":studentid},
        { $pull :{ "student.$.solutions": { "_id" :_id} }
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
exports.deletestudent = async(req, res, next) => {
    const { _id, } = req.body
    try {
        User.deleteMany({ '_id': _id }, function(err) {

            res.send("student deleted!")
        });
        Subject.updateMany({},{$pull:{ student:{_id : _id}}},function (err){
            if(err){
              console.log(err)
            } 
          })

    } catch (err) {
        next(err);
    }

};

exports.getsub = async(req, res, next) => {
    let str = req.url;
    str = str.split('?')[1];
    str = str.split('=')[1];

    const data = await User.find({ 'usn': str }).populate({ path: "subject", select: "name" })
    res.send(data)


};


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};