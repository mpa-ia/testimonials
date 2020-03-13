const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        let concerts = await Concert.find();
        let seats = await Seat.find();
        const freeTickets = 50 - seats.filter(seat => concerts.map(concert => concert._doc.day).includes(seat.day)).length;
        concerts = concerts.map(concert => ({ ...concert._doc, tickets: freeTickets }));
        res.json(concerts);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Concert.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.json(err);
    }
};

exports.getById = async (req, res) => {
    try {
        const dep = await Concert.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.postNew = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
        await newConcert.save();
        res.json(newConcert);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.modifyById = (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        Concert.findByIdAndUpdate(req.params.id, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } }, { new: true }, (err, doc) => {
            err ? res.status(404).json({ message: 'Not found...' }) : res.json(doc);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteById = (req, res) => {
    try {
        Concert.findByIdAndDelete(req.params.id, { new: false }, (err, doc) => {
            err ? res.status(404).json({ message: 'Not found...' }) : res.json(doc);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};