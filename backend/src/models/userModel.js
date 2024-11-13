const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profilePhoto: { type: String, required: false },
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: false },
  gender: { type: String, required: false }, // Changed from Date to String
  age: { type: Number, required: false },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true,unique:true},
  password: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
