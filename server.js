const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const socket = require('socket.io');
const helmet = require('helmet');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/client/build')));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', socket => {
    console.log(`new socket - ${socket.id}`);
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'), err => {
        if (err) res.status(500).send(err);
    });
});

app.use((req, res) => {
    res.status(404).send({ message: 'not found...' });
});

process.env.NODE_ENV === "production" ?
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.APP_PASSWORD}@cluster0-314sb.mongodb.net/NewWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }) :
    mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log('Conected to the database');
});

db.on('error', err => console.log('Error' + err));

console.log(process.env.NODE_ENV);

module.exports = server;