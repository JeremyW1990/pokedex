const Pokemon = require('../models/pokemon');

exports.getPokemons = (req, res, next) => {

  const pokemonQuery = Pokemon.find();
  let pokemons;
  pokemonQuery
  .then(pokemonsData=>{
    pokemons = pokemonsData;
    return Pokemon.countDocuments()
    })
    .then((totalPokemonsNumber) => {
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

  // No duplicated pokemon ID
  // Pokemon.findOne({id: req.body.id})
  // .then(response =>{
  //   res.status(500).json({
  //     message: 'Pokemon ID exists in DB.'
  //   })
  // })
  // .catch(() => {

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

exports.updatePokemon = (req, res, next) => {
  const pokemon = {
    id: req.body.id,
    name: req.body.name,
    imagePath: req.body.imagePath,
    description: req.body.description
  };
  Pokemon.findOneAndUpdate({id: req.params.id}, pokemon)
  .then(response => {
    res.json({
      message: 'Pokemon updated successfully!',
      pokemon: response
    })
  })
  .catch(err => {
    console.log('error:', err);
    res.status(500).json({
      message: 'Pokemon updated failed.'
    })
  });
}

exports.deletePokemon = (req, res, next) => {
  Pokemon.findOneAndDelete({id: req.params.id })
  .then(response => {
    res.json({
      message: 'Pokemon detele by ID successfully!'
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Pokemon delete by ID failed.'
    })
  });
};

