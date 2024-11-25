require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./employee'); // Ensure this path is correct

// Access the username and password from the .env file
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME; // Ensure this is set in your .env file

// Create the MongoDB connection string dynamically
const uri = `mongodb+srv://${username}:${password}@db1.8qhzp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { dbName: 'employeeDB', useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to MongoDB Atlas');

    // Perform operations on the database here
    Employee.find().then((data) => {
      console.log(data);
      mongoose.connection.close();
    }).catch((err) => {
      console.error('Error finding employees:', err);
      mongoose.connection.close();
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });