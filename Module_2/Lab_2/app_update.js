require("dotenv").config();
const mongoose = require("mongoose");
const Employee = require("./employee"); // Ensure this path is correct

// Access the username and password from the .env file
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME; // Ensure this is set in your .env file

// Create the MongoDB connection string dynamically
const uri = `mongodb+srv://${username}:${password}@db1.8qhzp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  dbName: "employeeDB",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
      .then(() => {
          console.log("Connected to MongoDB");
  
          // Update one record in employee
          return Employee.updateOne({ emp_name: "John Doe" },
              { email: "jdoe@somewhere.com" });
      })
      .then((updateOneResult) => {
          console.log("Updated Docs for updateOne:", updateOneResult);
          console.log("One record updated");
  
          // Update many records in employees
          return Employee.updateMany({ age: { $gt: 30 } },
              { location: "New York" });
      })
      .then((updateManyResult) => {
          console.log("Updated Docs for updateMany:", updateManyResult);
          console.log("Many records updated");
  
      })
      .catch((error) => {
          console.error("Error:", error);
      })
      .finally(() => {
          mongoose.connection.close(); // Close the MongoDB connection
      });