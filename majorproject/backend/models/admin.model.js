const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;


const adminSchema = new Schema({
      _id: Schema.Types.ObjectId,
       name: { type: String, required: true  },
       password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
                 },
  }, {
    timestamps: true,
  });
  adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  adminSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  adminSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;