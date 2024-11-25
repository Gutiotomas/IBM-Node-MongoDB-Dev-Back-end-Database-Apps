import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const employees = new Schema({
  emp_name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { versionKey: false }); // Exclude the __v field

export default mongoose.model('employees', employees);