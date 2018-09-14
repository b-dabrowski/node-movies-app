/* eslint no-undef: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-shadow: 0 */
/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

describe('[Comments]', () => {
  it('should return the error if there is no movieId in request', (done) => {
    request(app)
      .post('/api/comments')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, resp) => {
        expect(resp.body.errors).to.be.an('object');
        expect(resp.body.errors).has.property('movieId');
        expect(resp.body.errors).property('movieId').eq('Movie id parameter is required');
        done();
      });
  });

  it('should return the error if there is no comments text in request', (done) => {
    request(app)
      .post('/api/comments')
      .send({
        movieId: '53cb6b9b4f4ddef1ad47f943',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, resp) => {
        expect(resp.body.errors).to.be.an('object');
        expect(resp.body.errors).has.property('comments');
        expect(resp.body.errors).property('comments').eq('Comments text parameter is required');
        done();
      });
  });

  it('should return the empty array if there is no movie with that id', (done) => {
    request(app)
      .get('/api/comments')
      .query({
        movieId: '53cb6b9b4f4ddef1ad47f943',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body.comments).to.be.an('array').that.is.empty;
        done();
      });
  });

  it('should return error if there is no valid movie id', (done) => {
    request(app)
      .get('/api/comments')
      .query({
        movieId: 'magicNumber',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, resp) => {
        expect(resp.body.errors).to.be.an('object');
        expect(resp.body.errors).has.property('movieId');
        expect(resp.body.errors).property('movieId').eq('Movie id parameter is invalid');
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
        const movie = resp.body.movie;

        request(app)
          .post('/api/comments')
          .send({
            movieId: movie._id,
            text: 'test comment',
          })
          .end((err, resp) => {
            expect(resp.body.comment).to.be.an('object');
            expect(resp.body.comment).has.property('Text');
            expect(resp.body.comment).property('Text').eq('test comment');
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
        const movie = resp.body.movies.slice(-1).pop();

        request(app)
          .get('/api/comments')
          .query({
            movieId: movie._id,
          })
          .end((err, resp) => {
            expect(resp.body.comments).to.be.an('array');
            expect(resp.body.comments[0]).has.property('Movie');
            expect(resp.body.comments[0]).property('Movie').eq(movie._id);
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
        expect(resp.body.comments).to.be.an('array').that.is.not.empty;
        done();
      });
  });
});
