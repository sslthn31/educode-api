const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseCssModel = new schema({
  courseId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('cssData', courseCssModel);
