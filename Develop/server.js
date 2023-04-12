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
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for retrieving all the saved notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for tips`);
    readFromFile('./db/.json').then((data) => res.json(JSON.parse(data)));
  });

// POST Route for a new note to save
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a new note`);
  
    const { note_id, title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        note_id: uuid(),
        title: req.body.title,
        text: req.body.text,
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully!`);
    } else {
      res.error('Error in adding note');
    }
  });  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);