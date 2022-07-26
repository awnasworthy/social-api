const { Users } = require('../models');

const userController = {
    // Post new user 
    createUsers({body}, res) {
      Users.create(body)
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => res.status(400).json(err));
  },
    //get all users
    getAllUsers(req, res) {
      Users.find({})
      // populate users thoughts
      .populate({path: 'thoughts', select: '-__v'})
      // populate user friends
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      // .sort({_id: -1})
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  },

    //get single user

    //post new user

    //update user by id

    //delete by id
};

module.exports = userController;