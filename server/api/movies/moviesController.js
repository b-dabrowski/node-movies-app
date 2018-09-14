/* eslint prefer-destructuring: 0 */
const request = require('request');
const config = require('../../config/config');
const movies = require('./moviesModel');

function getFullApiUrl(title) {
  return `${config.movieApi}&t=${title}`;
}

exports.get = (req, res, next) => {
  movies.find()
    .then((filteredMovies) => {
      res.json({
        movies: filteredMovies,
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
        const externalData = JSON.parse(body);
        if (externalData.Response === 'True') {
          req.movie = JSON.parse(body);
          next();
        } else {
          res.status(404).json({
            errors: { title: 'There is no movie with that title' },
          });
        }
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
    res.status(405).json({
      errors: { title: 'Title parameter is required' },
    });
  }
};
