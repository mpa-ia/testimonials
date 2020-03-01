const express = require('express');
const router = express.Router();

const concertControllers = require('./controllers/concerts.controller');

router.get('/concerts', concertControllers.getAll);
router.get('/concerts/random', concertControllers.getRandom);
router.get('/concerts/:id', concertControllers.getById);

router.post('/concerts', concertControllers.postNew);

router.put('/concerts/:id', concertControllers.modifyById);

router.delete('/concerts/:id', concertControllers.deleteById);

module.exports = router;