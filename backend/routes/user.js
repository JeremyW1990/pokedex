const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/signup', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/getfavouritepklist', UserController.getfavouritepk);
router.patch('/addfavouritepk', UserController.addFavouritePokemon);

module.exports = router;
