const router = require('express').Router();
const controller = require('./commentsController');

router.route('/')
  .get(controller.get)
  .post(controller.validate, controller.post);

module.exports = router;
