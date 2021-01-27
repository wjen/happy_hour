const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
// Include Express Validator Functions
const { check, validationResult } = require('express-validator');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Validation Array
const loginValidate = [
  // Check Username
  check('username')
    .isLength({ min: 4 })
    .withMessage('Username Must Be at Least 4 Characters')
    .trim()
    .escape(),

  // Check Password
  check('password')
    .isLength({ min: 4 })
    .withMessage('Password Must Be at Least 4 Characters')
    .trim()
    .escape(),
];

router.post(
  '/register',
  loginValidate,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('errors');
      return res.status(422).json({ errors: errors.array() });
    } else {
      let username = req.body.username;
      let password = req.body.password;
      const hash = bcrypt.hashSync(req.body.password, 12);
      User.findOne({ username }, (err, user) => {
        if (err) {
          return res.json(err);
        } else if (user) {
          console.log('user exists');
          return res.status(400).json({
            success: false,
            message: 'User Exists Already',
          });
        }
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;

        newUser.save({ username, password: hash }, (error, doc) => {
          if (error) {
            console.log(error);
            res.redirect('/');
          } else {
            const token = jwt.sign(
              {
                username: username,
                _id: doc._id,
              },
              process.env.SESSION_SECRET,
              {
                expiresIn: '7 days',
              }
            );
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Successfully signed up!',
              token: token,
              user: newUser,
            });
          }
        });
      });
    }
  },
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res, next) => {
    console.log(req);
    console.log('authenticated');
    res.redirect('/');
  }
);

//   app.route('/register').post(
//   (req, res, next) => {
//     const hash = bcrypt.hashSync(req.body.password, 12);
//     myDataBase.findOne({ username: req.body.username }, function (err, user) {
//       if (err) {
//         next(err);
//       } else if (user) {
//         res.redirect('/');
//       } else {
//         myDataBase.insertOne({ username: req.body.username, password: hash }, (err, doc) => {
//           if (err) {
//             res.redirect('/');
//           } else {
//             next(null, doc.ops[0]);
//           }
//         });
//       }
//     });
//   },
//   passport.authenticate('local', { failureRedirect: '/' }),
//   (req, res, next) => {
//     res.redirect('/profile');
//   }
// );
// User.find()
//   .then((users) => res.json(users))
//   .catch((error) => res.status(400).json('Error: ' + err));

module.exports = router;
