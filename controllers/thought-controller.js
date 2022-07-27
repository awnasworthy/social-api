const { Users, Thoughts } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    // get thought by id
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id})
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    //post new thought
    addThought({ params, body }, res) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.usersId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user with this id' });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },
    //update thought
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbUsersData => {
          if (!dbUsersData) {
            res.status(404).json({ message: 'No thought found with this id'});
            return;
          }
          res.json(dbUsersData);
        })
        .catch(err => res.json(err));
      },
    //delete thought
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
          .then(dbUsersData => res.json(dbUsersData))
          .catch(err => res.json(err));
      },
    //add reaction
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUsersData => res,json(dbUsersData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;