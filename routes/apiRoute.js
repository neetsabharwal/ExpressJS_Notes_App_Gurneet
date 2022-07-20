const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
let { notes } = require('../db/db.json');

//functions
function validateNoteEntry(note){
    if(!note.title || typeof note.title !== 'string'){
        return false;
    }
    if(!note.text || typeof note.text !== 'string'){
        return false;
    }
    return true;
};

function addNote(note){
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ "notes" : notes}, null, 2)
    );
}

module.exports = (app) => {
    
    //get method
    app.get('/api/notes',(req,res)=>{
        res.json(notes);
    });

    //post method
    app.post('/api/notes',(req,res)=>{
        req.body.id = uniqid();
        if(!validateNoteEntry(req.body)){
            res.status(400).send('Please enter the notes correctly.');
        }
        else {
            addNote(req.body);
            res.status(200).send('Added the note to list.');
        }   
    })

    //delete method
    app.delete('/api/notes/:index',(req,res)=>{
        notes = notes.filter(i=>i.id!==req.params.index);
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify({ "notes" : notes }, null, 2)
        );
        res.status(200).send('Deleted to note from list.');
    });
}