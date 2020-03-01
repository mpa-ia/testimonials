const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Testimonial.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.json(err);
    }
};

exports.getById = async (req, res) => {
    try {
        const dep = await Testimonial.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.postNew = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({ author: author, text: text });
        await newTestimonial.save();
        res.json(newTestimonial);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.modifyById = (req, res) => {
    const { author, text } = req.body;
    try {
        Testimonial.findByIdAndUpdate(req.params.id, { $set: { author: author, text: text }}, { new: true }, (err, doc) => {
            err ? res.status(404).json({ message: 'Not found...' }) : res.json(doc);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteById = (req, res) => {
    try {
        Testimonial.findByIdAndDelete(req.params.id, { new: false }, (err, doc) => {
            err ? res.status(404).json({ message: 'Not found...' }) : res.json(doc);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};