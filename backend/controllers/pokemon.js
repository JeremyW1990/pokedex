const Pokemon = require('../models/pokemon');

exports.getPokemons = (req, res, next)=>{


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
