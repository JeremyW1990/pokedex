const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon');

router.get('', pokemonController.getPokemons);
router.get('/:id', pokemonController.getPokemon);
router.post('', pokemonController.createPokemon);
router.delete('/:id', pokemonController.deletePokemon);

module.exports = router;
