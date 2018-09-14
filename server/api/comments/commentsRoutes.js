const router = require('express').Router();
const controller = require('./commentsController');

router.route('/')
  .get(controller.validateId, controller.get)
  .post(controller.validateId, controller.validate, controller.post);

module.exports = router;
