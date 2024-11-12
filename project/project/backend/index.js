const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3001;
const mongoDB = require("./db");
mongoDB();

// Use CORS middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/Cart"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
