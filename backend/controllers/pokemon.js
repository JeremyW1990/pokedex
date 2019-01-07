const Pokemon = require('../models/pokemon');

exports.getPokemons = (req, res, next) => {

  const pokemonQuery = Pokemon.find();
  let pokemons;
  pokemonQuery
  .then(pokemonsData=>{
    console.log(pokemonsData);
    pokemons = pokemonsData;
    return Pokemon.countDocuments()
    })
    .then((totalPokemonsNumber) => {
      console.log(totalPokemonsNumber);
      res.status(200).json({
        message: 'Pokemons fetched successfully!',
        pokemons: pokemons,
        totalPokemonsNumber: totalPokemonsNumber
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Pokemons fetch failed.'
      })
    });
};

exports.getPokemon = (req, res, next) => {
  Pokemon.findOne({id: req.params.id })
  .then(response => {
    console.log('Pokemon fetched by ID successfully!', response);
    res.json({
      message: 'Pokemon fetched by ID successfully!',
      pokemon: response
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Pokemon fetch by ID failed.'
    })
  });
};

exports.createPokemon = (req, res, next) => {
  console.log('create Pokemon' , req.body);
  const pokemon = new Pokemon({
    id: req.body.id,
    name: req.body.name,
    imagePath: req.body.imagePath,
    description: req.body.description
  });
  pokemon.save()
  .then(response => {
    res.json({
      message: 'Pokemon added successfully!'
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Pokemon added failed.'
    })
  });
}

