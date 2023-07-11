const router = require("express").Router();
const {
  getThought,
  postThought,
  updateThought,
  deleteThought,
  addReactionToThought,
  deleteReactionFromThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router
  .route("/")
  .get(getThought)
  .post(postThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route("/:thoughtId/reactions")
  .post(addReactionToThought)
  .delete(deleteReactionFromThought);

module.exports = router;
