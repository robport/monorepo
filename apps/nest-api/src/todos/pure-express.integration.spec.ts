import request from 'supertest';
import express from 'express';

const app = express();

app.get('/user', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.status(200).send({ msg: 'Done' });
});

describe('super-test', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err);
        console.log(res);
        done();
      });
  });
});
