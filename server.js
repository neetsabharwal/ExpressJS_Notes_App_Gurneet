//const fs = require('fs');
//const path = require('path');
//const uniqid = require('uniqid');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

//functions
// function validateNoteEntry(note){
//     if(!note.title || typeof note.title !== 'string'){
//         return false;
//     }
//     if(!note.text || typeof note.text !== 'string'){
//         return false;
//     }
//     return true;
// }

// function addNote(note){
//     let { notes } = require('./db/db.json');
//     notes.push(note);
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify({ "notes" : notes}, null, 2)
//     );
// }

//get methods
// app.get('/notes',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./public/notes.html'));
// });

// app.get('/api/notes',(req,res)=>{
//     let { notes } = require('./db/db.json');
//     res.json(notes);
// });

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./public/index.html'));
// });

// //post method
// app.post('/api/notes',(req,res)=>{
//     req.body.id = uniqid();
//     if(!validateNoteEntry(req.body)){
//         res.status(400).send('Please enter the notes correctly.');
//     }
//     else {
//         addNote(req.body);
//         res.status(200).send('Added the note to list.');
//     }
// })

// //delete method
// app.delete('/api/notes/:index',(req,res)=>{
//     let { notes } = require('./db/db.json');
//     let newNotes = notes.filter(i=>i.id!==req.params.index);
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify({ "notes" : newNotes }, null, 2)
//     );
//     res.status(200).send('Deleted to note from list.');
//});

//start listening
app.listen(`${PORT}`,()=>{
    console.log('listening on 3001!');
})