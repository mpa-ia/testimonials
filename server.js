const express = require('express');
const uuidv1 = require('uuid/v1');
const db = require('./db/db.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

app.get('/seats', (req, res) => {
    res.json(db.seats);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.filter(data => data.id == req.params.id));
});

app.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.filter(data => data.id == req.params.id));
});

app.get('/seats/:id', (req, res) => {
    res.json(db.seats.filter(data => data.id == req.params.id));
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

app.post('/concerts', (req, res) => {
    const newData = {
        id: uuidv1(),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    };
    db.concerts.push(newData);
    res.json({ message: 'OK' });
});

app.post('/seats', (req, res) => {
    const newData = {
        id: uuidv1(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    };
    db.seats.push(newData);
    res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
    console.log(req.body);
    db.testimonials = db.testimonials.map(data => data.id == req.params.id? {...data, author: req.body.author, text: req.body.text } : data);
    res.json({ message: 'OK' });
});

app.put('/concerts/:id', (req, res) => {
    console.log(req.body);
    db.concerts = db.concerts.map(data => 
        data.id == req.params.id? 
        {...data, performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image,} 
        : data);
    res.json({ message: 'OK' });
});

app.put('/seats/:id', (req, res) => {
    console.log(req.body);
    db.seats = db.seats.map(data => 
        data.id == req.params.id? 
        {...data, day: req.body.day, seat: req.body.seat, client: req.body.client, email: req.body.email, } 
        : data);
    res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
    db.testimonials = db.testimonials.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

app.delete('/concerts/:id', (req, res) => {
    db.concerts = db.concerts.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

app.delete('/seats/:id', (req, res) => {
    db.seats = db.seats.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

app.use((req, res) => {
    res.status(404).send({ message: 'not found...'});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });