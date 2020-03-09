const express = require('express');
const router = express.Router();
const db = require('../db/db');
const uuid = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter(data => data.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const newData = {
        id: uuid.v1(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    };
    if (!db.seats.some(data => data.day == req.body.day && data.seat == req.body.seat)) { 
        db.seats.push(newData);
        req.io.emit('seatsUpdated', db.seats);
        res.json({ message: 'OK' });
    } else { 
        res.status(409).json({ message: "The slot is already taken"})
    };
});

router.route('/seats/:id').put((req, res) => {
    console.log(req.body);
    db.seats = db.seats.map(data => 
        data.id == req.params.id? 
        {...data, day: req.body.day, seat: req.body.seat, client: req.body.client, email: req.body.email, } 
        : data);
    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
    db.seats = db.seats.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

module.exports = router;