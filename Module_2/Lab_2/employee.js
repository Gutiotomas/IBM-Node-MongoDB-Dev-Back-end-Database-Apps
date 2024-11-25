const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  emp_name: String,
  age: Number,
  location: String,
  email: String
}, { versionKey: false }); // Exclude the __v field

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;