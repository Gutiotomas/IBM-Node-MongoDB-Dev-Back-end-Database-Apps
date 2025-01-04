require('dotenv').config();
const mongoose = require('mongoose');
const Employees = require('./employee');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

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

    // Middleware to parse JSON requests
    app.use(bodyParser.json());

    // GET endpoint
    app.get('/api/employees', async (req, res) => {
      const documents = await Employees.find();
      res.json(documents);
    });

    // POST endpoint to add an employee
    app.post('/api/add_employee', async (req, res) => {
      console.log(req);
      const data = req.body;
      const emp = new Employees({
        "emp_name": data['name'],
        "age": data['age'],
        "location": data['location'],
        "email": data['email']
      });
      // Save the employee to the database
      await emp.save();
      res.json({ message: 'Employee added successfully' });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });