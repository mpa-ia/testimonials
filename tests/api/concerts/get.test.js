const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
// const Concert = require('../../../routes/models/concert.model');
const mongoose = require('mongoose');
const Concert = mongoose.models.Concert;

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        try {
            const concertOne = new Concert({
                _id: '5d9f1140f10a81216cfd4408',
                performer: 'Justin Timberlake',
                genre: 'Pop',
                price: 25,
                day: 1,
                image: './picture.jpeg',
            });
            await concertOne.save();

            const concertTwo = new Concert({
                _id: '5d9f1159f81ce8d1ef2bee48',
                performer: 'Justin Bieber',
                genre: 'Rock',
                price: 30,
                day: 2,
                image: './picture.jpeg',
            });

            await concertTwo.save();
        } catch (e) {
            console.log(e);
        }
    });

    it('should return concerts list', async () => {
        try {
            const res = await request(server).get('/api/concerts');
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(2);
        } catch (e) {
            console.log(e);
        }
    });
    after(async () => {
        // mongoose.models = {};
        try {
            await Concert.deleteMany();

        } catch (e) {
            console.log(e);
        }
    });
});