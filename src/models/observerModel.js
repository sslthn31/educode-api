const mongoose = require('mongoose');
const schema = mongoose.Schema;

const observerData = new schema({
  course: {
    type: String,
  },
  ipAdress: {
    type: String,
  },
  question: {
    type: Array,
  },
  startedAt: {
    type: String,
  },
});

module.exports = mongoose.model('observerData', observerData);
