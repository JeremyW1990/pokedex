const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email : {type: String, require:true, unique:true},
  password: {type: String, require:true}
})
mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
