const express = require('express');
const router = express.Router();

const testimonialControlles = require('./controllers/testimonials.controller');

router.get('/testimonials', testimonialControlles.getAll);
router.get('/testimonials/random', testimonialControlles.getRandom);
router.get('/testimonials/:id', testimonialControlles.getById);

router.post('/testimonials', testimonialControlles.postNew);

router.put('/testimonials/:id', testimonialControlles.modifyById);

router.delete('/testimonials/:id', testimonialControlles.deleteById);

module.exports = router;