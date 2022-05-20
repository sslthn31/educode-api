const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dummyData = new schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  alternativeLink: {
    type: String,
  },
});

module.exports = mongoose.model('dummyData', dummyData);
