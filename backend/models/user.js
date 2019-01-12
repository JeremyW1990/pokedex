const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email : {type: String, require:true, unique:true },
  password: {type: String, require:true },
  admin: { type: Boolean, require: true},
  colletion: {type: [mongoose.Schema.Types.ObjectId], ref: "User"}
})
mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
