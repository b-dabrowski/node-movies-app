/* eslint no-undef: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-shadow: 0 */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

describe('[Comments]', () => {
  it('should return the error if there is no movie with that id', (done) => {
    request(app)
      .post('/api/comments')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, resp) => {
        expect(resp.body.errors).to.be.an('object');
        expect(resp.body.errors).has.property('id');
        expect(resp.body.errors).property('id').eq('Id parameter is required');
        done();
      });
  });

  it('should return the comment', (done) => {
    request(app)
      .post('/api/movies')
      .send({
        title: 'test',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const movie = resp.body.user.movie;

        request(app)
          .post('/api/comments')
          .send({
            movie: movie._id,
            text: 'test comment',
          })
          .end((err, resp) => {
            expect(resp.body.comment).to.be.an('object');
            expect(resp.body.comment).has.property('text');
            expect(resp.body.comment).property('text').eq('test comment');
            done();
          });
      });
  });

  it('should get comments for the movie', (done) => {
    request(app)
      .get('/api/movies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        const movie = resp.body.movies[0];

        request(app)
          .get('/api/comments')
          .send({
            movie: movie._id,
          })
          .end((err, resp) => {
            expect(resp.body.comments).to.be.an('array');
            expect(resp.body.comments).has.property('movie');
            expect(resp.body.comments).property('movie').eq(movie._id);
            done();
          });
      });
  });

  it('should get all comments', (done) => {
    request(app)
      .get('/api/comments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body.comments).to.be.an('array');
        done();
      });
  });
});
