/* eslint no-undef: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-shadow: 0 */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

describe('[Movies]', () => {
  it('should return status 422 if no title req', (done) => {
    request(app)
      .post('/api/movies')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, resp) => {
        expect(resp.body.errors).to.be.an('object');
        expect(resp.body.errors).has.property('title');
        expect(resp.body.errors).property('title').eq('Title parameter is required');
        done();
      });
  });

  it('should return new movie', (done) => {
    request(app)
      .post('/api/movies')
      .send({
        title: 'test',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body.movie).to.be.an('object');
        expect(resp.body.movie).has.property('Title');
        expect(resp.body.movie).property('Title').eq('Test');
        done();
      });
  });

  it('should get all movies', (done) => {
    request(app)
      .get('/api/movies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body.movies).to.be.an('array');
        done();
      });
  });
});
