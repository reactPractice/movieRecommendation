var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
  title: String
});

var Test = module.exports = mongoose.model('Test', testSchema);