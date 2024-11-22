require('dotenv').config();
// Import the MongoDB client
const { MongoClient } = require('mongodb');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;
// Replace the URL with your actual MongoDB connection string
const url = 'mongodb+srv://${username}:${password}@db1.8qhzp.mongodb.net/'; // Or your MongoDB Atlas connection string
const dbName = name;

async function connectToMongoDB() {
  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected successfully to MongoDB server');

    // Select the database you want to work with
    const db = client.db(dbName);

    // Perform database operations here...

    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  } finally {
    // Close the client when done
    await client.close();
  }
}

connectToMongoDB();
