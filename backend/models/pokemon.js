const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
  id: {type: String, require: true},
  name:   {type: String, require: true},
  description: {type: String, require: true},
  imagePath: {type: String, require: true}
})

module.exports = mongoose.model('Pokemon', pokemonSchema)
//Collection in the database will be 'Pokemons'.
