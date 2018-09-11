const router = require('express').Router();
const moviesRouter = require('./movies/moviesRoutes');
const commentsRouter = require('./comments/commentsRoutes');

router.use('/movies', moviesRouter);
router.use('/comments', commentsRouter);

module.exports = router;
