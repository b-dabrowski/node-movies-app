const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../util/swagger.json');
const moviesRouter = require('./movies/moviesRoutes');
const commentsRouter = require('./comments/commentsRoutes');

router.use('/movies', moviesRouter);
router.use('/comments', commentsRouter);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
