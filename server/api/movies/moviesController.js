/* eslint prefer-destructuring: 0 */
const request = require('request');
const config = require('../../config/config');
const movies = require('./moviesModel');

function getFullApiUrl(title) {
  return `${config.movieApi}&t=${title}`;
}

exports.get = (req, res, next) => {
  movies.find()
    .then((allMovies) => {
      res.json({
        movies: allMovies,
      });
    }, (err) => {
      next(err);
    });
};

exports.getExternalData = (req, res, next) => {
  const title = req.body.title;

  request(getFullApiUrl(title),
    (error, response, body) => {
      if (error) {
        res.status(422).json({
          errors: { error },
        });
      } else {
        req.movie = JSON.parse(body);
        next();
      }
    });
};

exports.post = (req, res, next) => {
  const newMovie = req.movie;

  movies.create(newMovie)
    .then((movie) => {
      res.json({
        movie,
      });
    }, (err) => {
      next(err);
    });
};

exports.validate = (req, res, next) => {
  const title = req.body.title;

  if (title) {
    next();
  } else {
    res.status(422).json({
      errors: { title: 'Title parameter is required' },
    });
  }
};
