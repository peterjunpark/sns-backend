const router = require("express").Router();
const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  deleteFriendFromUser,
} = require("../../controllers/userController");

// /api/users
router
  .route("/")
  .get(getUser)
  .post(postUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route("/:userId/friends/:friendId")
  .post(addFriendToUser)
  .delete(deleteFriendFromUser);

module.exports = router;
