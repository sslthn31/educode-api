const mongoose = require('mongoose');
const schema = mongoose.Schema;

const observerData = new schema({
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
