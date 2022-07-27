const router = require('express').Router();
const { getAllThoughts,
        getThoughtsById,
        addThought,
        updateThoughts,
        deleteThoughts,
        addReaction,
        removeReaction } = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

router
    .route('/:usersId')
    .post(addThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router 
    .route('./thoughtId/reactions/reactionId')
    .delete(removeReaction);

module.exports = router;