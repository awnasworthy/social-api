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
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  },
    //get single user
    getUsersById({ params }, res) {
      Users.findOne({ _id: params.id })
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
    },
    //update user by id
    updateUsers({ params, body }, res) {
      Users.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id'});
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err));
    },
    //delete by id
    deleteUsers({ params }, res) {
      Users.findOneAndDelete({ _id: params.id })
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;