const router = require('express').Router();
const controller = require('./moviesController');

router.route('/')
  .get(controller.get)
  .post(controller.validate, controller.getExternalData, controller.post);

module.exports = router;
