const express = require('express');
const router = express.Router();
const db = require('../db/db');
const uuidv1 = require('uuid/v1');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.filter(data => data.id == req.params.id));
});

/* router.route('/testimonials/random').get((req, res) => {
    const random = Math.floor(Math.random() * db.testimonials.length);
    console.log(random);
    res.json(db.testimonials.filter(data => data.id == random));
}); */

router.route('/testimonials').post((req, res) => {
    const newData = {
        id: uuidv1(),
        author: req.body.author,
        text: req.body.text,
    };
    db.testimonials.push(newData);
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
    console.log(req.body);
    db.testimonials = db.testimonials.map(data => data.id == req.params.id? {...data, author: req.body.author, text: req.body.text } : data);
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials = db.testimonials.filter(data => data.id != req.params.id);
    res.json({ message: 'OK' });
});

module.exports = router;