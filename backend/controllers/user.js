const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = (req, res, next)=>{

  console.log('Backend: Initiate user signup ', req.body);

  bcrypt.hash(req.body.password, 10)
  .then((hashedPassword) => {

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      admin: false
    });

    user.save()
    .then((response) =>{
      console.log('New user created successfully in DB ', response);
      res.status(200).json({
        message: 'User created successfully.',
        user : {
          id: response._id,
          email: response.email
        }
      });
    })
    .catch(err =>{
      console.log('Email taken.');
      res.status(401).json({
        message: 'This email address has been taken.'
      })
    })
  })
  .catch(err =>{
    console.log(err);
  })
};

exports.loginUser = (req, res, next)=>{

  console.log('Backend: Initiate user login ', req.body);
  User.findOne({email: req.body.email})
  .then((dbUser) =>{
    if (!dbUser) {
      return res.status(401).json({
        message: "Email is not registered."
      });
    }
    bcrypt.compare(req.body.password, dbUser.password)
    .then(result =>{
      if (result) {
        const token = jwt.sign(
          {email: req.body.email, id:dbUser._id},
          process.env.private_key,
          {expiresIn:'1h'}
        );
        res.status(200).json({
          message: 'Login successfully.',
          token: token,
          expiresIn: 3600, // in second
          userId: dbUser._id,
          admin: dbUser.admin
        })}
      else {
        res.status(401).json({
          message: 'Password not match.',
        })
      }
    })
    .catch(err =>{
      console.log(err);
    })
  })
};

exports.addFavouritePokemon = (req, res, next ) => {
  console.log("add favourite pokemon initiate");
  console.log(req.body.userId);
  console.log(req.body.pokemonId);

  User.findOneAndUpdate({_id: req.body.userId}, {$push: {favouritePkList: req.body.pokemonId}})
    .then(response => {
      console.log(response);
    })

};
