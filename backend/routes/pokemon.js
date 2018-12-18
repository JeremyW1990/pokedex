const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon');


router.get('/index', pokemonController.getPokemons);


module.exports = router;
