const express = require('express');
const path = require('path');
const fs = require('fs');
const { get } = require('express/lib/response');

const PORT = 3001;

const app = express();


// MIDDLEWARES
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/test/:name/hello/:age', (req, res) => {
    console.log("Hello " + req.params.name)
    console.log("You are " + req.params.age + " years old");
    res.send("Check terminal")
})


// API ROUTES
app.get('/api/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, './db/db.json'));
    fs.readFile('./db/db.json', 'utf-8', (err, db) => {
        console.log(db)
        res.json(JSON.parse(db));
    })

})

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const db = JSON.parse(data)
        db.push(req.body);

        fs.writeFile('./db/db.json', JSON.stringify(db), () => {
            res.json(req.body)
        })

    });
});


// HTML ROUTES
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('*', (req, res) => {

    // send back a response
    res.sendFile(path.join(__dirname, './public/index.html'));
})



app.listen(PORT, () => {
    console.log(`Server has started and is listening to PORT ${PORT}!`)
})