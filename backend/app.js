const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const pokemonRoutes = require('./routes/pokemon')
const userRoutes = require('./routes/user');

const app = express();

const mongoDB_uri = 'mongodb+srv://jeremy:O40bsdeIn4tea2Nk@cluster0-8qiv1.mongodb.net/pokedex?retryWrites=true'

mongoose.connect(mongoDB_uri, { useNewUrlParser: true })
  .then(response=>{
    console.log("MongoDB connected!");
  })
  .catch(err=>{
    console.log(err);
  })


// const pokemonDatabase =  [

//     {id: 1,
//     name: 'Bulbasaur',
//     description: 'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun\'s rays, the seed grows progressively larger.',
//     imagePath: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'},
//     {id: 2,
//       name: 'Ivysaur',
//       description: 'There is a bud on this Pokémon\'s back. To support its weight, Ivysaur\'s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it\'s a sign that the bud will bloom into a large flower soon.',
//       imagePath: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png'},
//     {id: 3,
//       name: 'Venusaur',
//     description: 'There is a large flower on Venusaur\'s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower\'s aroma soothes the emotions of people.',
//     imagePath: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png'},
//     {id: 4,
//     name: 'Charmander',
//     description: 'The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.',
//     imagePath: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'},
//     {id: 5,
//       name: 'Charmeleon',
//     description: 'Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color.',
//     imagePath: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png'},
//     {id: 6,
//       name: 'Charizard',
//     description: 'Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself.',
//     imagePath: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'}

// ];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, PATCH, OPTIONS");
  next();
});

app.use('/pokemons', pokemonRoutes);
app.use('/user', userRoutes)

module.exports = app;
