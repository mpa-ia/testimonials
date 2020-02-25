const express = require('express');
const uuidv1 = require('uuid/v1');
const db = require('./db/db.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(db);
app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.filter(data => data.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
    const newData = {
        id: uuidv1(),
        author: req.body.author,
        text: req.body.text,
    };
    db.testimonials.push(newData);
    res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
    console.log(req.body);
    db.testimonials = db.testimonials.map(data => data.id == req.params.id? {...data, author: req.body.author, text: req.body.text } : data);
    res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
    db.testimonials = db.testimonials.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

app.use((req, res) => {
    res.status(404).send({ message: 'not found...'});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });