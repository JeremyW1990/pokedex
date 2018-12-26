const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon');


router.get('/index', pokemonController.getPokemons);
router.get('/:id', pokemonController.getPokemon);


module.exports = router;
