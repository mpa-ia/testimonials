const express = require('express');
const uuidv1 = require('uuid/v1');
const db = require('./db/db.js');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    res.status(404).send({ message: 'not found...'});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });