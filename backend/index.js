import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware for enabling CORS
app.use(cors());

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Connection URI (replace 'your_connection_string' with your actual MongoDB connection string)
const uri = 'mongodb+srv://muneebafzal381a:muneebafzal381a@cluster0.d85ukdt.mongodb.net/?retryWrites=true&w=majority';

app.get('/api/locations', (req, res) => {
  // Create a new MongoClient
  const client = new MongoClient(uri);

  // Connect to the MongoDB server
  client.connect()
    .then(() => {
      // Access a specific database (replace 'test' with your actual database name)
      const database = client.db('test');

      // Access a specific collection (replace 'locations' with your actual collection name)
      const collection = database.collection('locations');

      // Find all documents in the collection
      collection.find({}).toArray()
        .then(documents => {
          // Send the MongoDB query results as the API response
          res.json(documents);
        })
        .catch(error => {
          console.error('Error fetching documents:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        })
        .finally(() => {
          // Close the connection when done
          client.close();
        });
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
