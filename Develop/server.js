const express = require('express');

const app = express();

// creating the const port variable
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for notes.html file
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);