const mongoose = require('mongoose');
//registrationSchema code defines a property in the documents that will be added to the MongoDB database
const registrationSchema = new mongoose.Schema({
  accountname: {
    type: String,
  },
  
  password: {
    type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length must be 6 characters']
  },

  name: {
    type: String,
    trim: true,
  },

  gender: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
  },

  birthday: {
    type: Date,

  },
  location: {
    type:String,
    trim:true,
  },

  province: {
    type: String,
    trim: true,
  },

});
module.exports = mongoose.model('Registration', registrationSchema,'planets');