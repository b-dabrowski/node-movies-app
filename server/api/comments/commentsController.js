/* eslint prefer-destructuring: 0 */
const mongooseValidator = require('../../util/mongooseValidator');
const comments = require('./commentsModel');

function getQuery(req) {
  const query = {};
  if (req.query.movieId || req.body.movieId) {
    const movieId = req.query.movieId ? req.query.movieId : req.body.movieId;
    query.Movie = movieId;
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
  const query = getQuery(req);

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
    res.status(405).json({
      errors: {
        movieId: 'Movie id parameter is required',
      },
    });
  } else {
    res.status(405).json({
      errors: {
        comments: 'Comments text parameter is required',
      },
    });
  }
};

exports.validateId = (req, res, next) => {
  if (req.query.movieId || req.body.movieId) {
    const parameter = req.query.movieId ? req.query.movieId : req.body.movieId;
    if (!mongooseValidator.isValidId(parameter)) {
      res.status(405).json({
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
