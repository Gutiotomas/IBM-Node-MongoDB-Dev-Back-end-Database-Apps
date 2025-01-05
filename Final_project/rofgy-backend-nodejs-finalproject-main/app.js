require ('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

mongoose.set('strictQuery', false);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME; // Ensure this is set in your .env file

// Create the MongoDB connection string dynamically
const uri = `mongodb+srv://${username}:${password}@db1.8qhzp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri,{dbName:'SocialDB', useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', { username: String, email: String, password: String });
const Post = mongoose.model('Post', { userId: mongoose.Schema.Types.ObjectId, text: String });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: true, cookie: { secure: false } }));


// Insert your authenticateJWT Function code here.

// Insert your requireAuth Function code here.

// Insert your routing HTML code here.

// Insert your user registration code here.

// Insert your user login code here.

// Insert your post creation code here.

// Insert your post updation code here.

// Insert your post deletion code here.

// Insert your user logout code here.

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
