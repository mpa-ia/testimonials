const express = require('express');

const db = [
    {id: 1, author: 'John Doe', text: 'This company is worth every coin!'},
    {id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.'},
    {id: 3, author: 'Peter Doe', text: 'High quality products'},
    {id: 4, author: 'Anne Doe', text: 'Perfect service'},
    {id: 5, author: 'Simon Doe', text: 'They respect clients'},
];

const app = express();

app.use(express.json());

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.filter(data => data.id == req.params.id));
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });