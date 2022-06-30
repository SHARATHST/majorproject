const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : { type: String, required: true  },
    usn: { type: String, required: true ,unique: true},
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    subject: [{type : mongoose.Schema.Types.ObjectId , ref : "Subject" }],
   
    
  }, {
    timestamps: true,
  });
  
  StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  StudentSchema.methods.matchPassword =  function (password) {
    return  bcrypt.compare(password, this.password);
  };
  
  StudentSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;