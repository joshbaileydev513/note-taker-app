// Import of the required packages
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Built in node packages called path
const path = require('path');

// Helper file to append/write/read input from user
const { readAndAppend, writeToFile, readFromFile } = require('./helpers/fsUtils');

const app = express();

// creating the const port variable
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data while also point at the pub folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET Route for index.html file
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for retrieving all the saved notes
app.get('/api/notes', (req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    console.log(savedNotes);
    res.json(savedNotes);
  });

// POST Route for a new note to save
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a new note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        note_id: uuidv4(),
        title,
        text,
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added- Hooray!`);
    } else {
      res.error('Error 404 - Note not added :(');
    }
  });  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);