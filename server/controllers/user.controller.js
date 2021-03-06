const User = require('../models/user.model');

// Get a list of users for admin dashboard
exports.getAllUsers = (req, res) => {
  User.find({})
    .populate('roles', '-__v')
    .exec((err, users) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      }
      console.log(users);
      res.status(200).send(users);
    });
};
