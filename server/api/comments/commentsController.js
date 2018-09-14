/* eslint prefer-destructuring: 0 */
const mongooseValidator = require('../../util/mongooseValidator');
const comments = require('./commentsModel');

function getQuery(parameters) {
  const query = {};
  if (parameters.movieId) {
    query.Movie = parameters.movieId;
  }

  return query;
}

function getCommentObject(parameters) {
  const commentObject = {};
  commentObject.Movie = parameters.movieId;
  commentObject.Text = parameters.text;

  return commentObject;
}

exports.get = (req, res, next) => {
  const query = getQuery(req.query);

  comments.find(query)
    .then((filteredComments) => {
      res.json({
        comments: filteredComments,
      });
    }, (err) => {
      next(err);
    });
};

exports.post = (req, res, next) => {
  const newComment = getCommentObject(req.body);

  comments.create(newComment)
    .then((comment) => {
      res.json({
        comment,
      });
    }, (err) => {
      next(err);
    });
};

exports.validate = (req, res, next) => {
  const movieId = req.body.movieId;
  const text = req.body.text;

  if (movieId && text) {
    next();
  } else if (!movieId) {
    res.status(422).json({
      errors: {
        movieId: 'Movie id parameter is required',
      },
    });
  } else {
    res.status(422).json({
      errors: {
        comments: 'Comments text parameter is required',
      },
    });
  }
};

exports.validateId = (req, res, next) => {
  if (req.query.movieId) {
    if (!mongooseValidator.isValidId(req.query.movieId)) {
      res.status(422).json({
        errors: {
          movieId: 'Movie id parameter is invalid',
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
