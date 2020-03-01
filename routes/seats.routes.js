const express = require('express');
const router = express.Router();

const seatControlles = require('./controllers/seats.controller');

router.get('/seats', seatControlles.getAll);
router.get('/seats/random', seatControlles.getRandom);
router.get('/seats/:id', seatControlles.getById);

router.post('/seats', seatControlles.postNew);

router.put('/seats/:id', seatControlles.modifyById);

router.delete('/seats/:id', seatControlles.deleteById);

module.exports = router;