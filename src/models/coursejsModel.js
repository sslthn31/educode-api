const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseJsModel = new schema({
  courseId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
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

module.exports = mongoose.model('jsData', courseJsModel);
