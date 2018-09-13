const mongoose = require('mongoose');

exports.isValidId = function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
};
