const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(data => data.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
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

router.route('/concerts/:id').put((req, res) => {
    console.log(req.body);
    db.concerts = db.concerts.map(data => 
        data.id == req.params.id? 
        {...data, performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image,} 
        : data);
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts = db.concerts.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

module.exports = router;