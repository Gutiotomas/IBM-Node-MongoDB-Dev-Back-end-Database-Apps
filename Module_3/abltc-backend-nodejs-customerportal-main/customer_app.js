require('dotenv').config();
const mongoose = require('mongoose');
const Customers = require('./customer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Added JWT library
const cors = require('cors');

const saltRounds = 5;
const secretKey = 'your-secret-key';  // Replace with a secure secret key

// Creating an instance of the Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting the port number for the server
const port = 3000;

// Access the username and password from the .env file
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME; // Ensure this is set in your .env file

// Create the MongoDB connection string dynamically
const uri = `mongodb+srv://${username}:${password}@db1.8qhzp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  dbName: "customerDB",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");

    // POST endpoint for user login
    app.post("/api/login", async (req, res) => {
      const data = req.body;
      console.log(data);
      let user_name = data["user_name"];
      let password = data["password"];

      // Querying the MongoDB 'customers' collection for matching user_name and password
      const documents = await Customers.find({
        user_name: user_name,
      });

      // If a matching user is found, set the session username and serve the home page
      if (documents.length > 0) {
        let result = await bcrypt.compare(password, documents[0]['password']);
        if (result) {
          const token = jwt.sign({ user_name: user_name }, secretKey, { expiresIn: '1h' });
          console.log('Generated token:', token); // Log the full token
          res.cookie('username', user_name);
          res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
        } else {
          res.send("Password Incorrect! Try again");
        }
      } else {
        res.send("User Information incorrect");
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });