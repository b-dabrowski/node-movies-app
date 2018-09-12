/* eslint comma-dangle: 0 */
/* eslint prefer-destructuring: 0 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  Text: {
    type: String,
    required: true
  },
  Movie:
    {
      type: Schema.Types.ObjectId,
      ref: 'movies',
      required: true
    }
});

module.exports = mongoose.model('comments', CommentsSchema);
