require('dotenv').config();  // Ensure this line is at the very top of your script
const { MongoClient } = require('mongodb');
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@db1.8qhzp.mongodb.net/`;
const dbName = process.env.DB_NAME;

async function connectToMongoDB() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  } finally {
    await client.close();
  }
}

connectToMongoDB();
