const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : { type: String, required: true },
    student :[{
             _id: {type : mongoose.Schema.Types.ObjectId ,ref : 'Student'  },
             attendence:{type:Number},
             ia1:{type :Number},
             ia2:{type :Number},
             cta:{type :Number},
             cie:{type :Number},
             solutions:[{
              qno:{type :Number },
              solution:{type:String}
             }]
             
              }],
    teacher :[{
      _id:{type :mongoose.Schema.Types.ObjectId ,ref : 'Teacher' },
      questions:[{
        _id:{type :mongoose.Schema.Types.ObjectId},
        qno:{type :Number},
      question:String
      }]
    }],
   
  }
  );

  
  const Subject = mongoose.model('Subject', SubjectSchema);

  module.exports = Subject;

