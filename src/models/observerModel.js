const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseHtmlModel = new schema({
  ipAdress: {
    type: String,
  },
  question: {
    type: String,
  },
  startedAt: {
    type: String,
  },
});

module.exports = mongoose.model('htmlData', courseHtmlModel);
