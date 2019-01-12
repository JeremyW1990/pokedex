const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const pokemonSchema = mongoose.Schema({
  id: {type: String, require: true, unique: true},
  name:   {type: String, require: true},
  description: {type: String, require: true},
  imagePath: {type: String, require: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})


mongoose.plugin(uniqueValidator);
// {unique: true} is not working as a validator, but a opitimization.

module.exports = mongoose.model('Pokemon', pokemonSchema)
//Collection in the database will be 'Pokemons'.
