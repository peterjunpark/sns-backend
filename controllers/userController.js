const { Thought, User } = require("../models");
const { hashPassword } = require("../utils/helpers");

module.exports = {
  // Get all users or get a user by id.
  getUser: async (req, res) => {
    const { id } = req.body;
    try {
      if (id) {
        // Get a user by id with populated thought and friend data.
        const user = await User.findById(id)
          .populate("thoughts")
          .populate("friends");
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
        res.json(user);
      } else {
        // Get all users
        const users = await User.find()
          .populate("thoughts")
          .populate("friends");
        res.json(users);
      }
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ error: "Failed to get users." });
    }
  },

  // Post a new user.
  postUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user." });
    }
  },

  // Update a user by id.
  updateUser: async (req, res) => {
    const { id, username, email, password } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, password },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user." });
    }
  },

  // Delete a user by id (and associated Thoughts).
  deleteUser: async (req, res) => {
    const { id } = req.body;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found." });
      }
      // Delete user's thoughts
      await Thought.deleteMany({ username: deletedUser.username });
      res.json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user." });
    }
  },

  // Post a user to another user's friends list.
  addFriendToUser: async (req, res) => {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json(user);
    } catch (error) {
      console.error("Error adding friend to user:", error);
      res.status(500).json({ error: "Failed to add friend to user." });
    }
  },

  // Delete a user from another user's friends list.
  deleteFriendFromUser: async (req, res) => {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json(user);
    } catch (error) {
      console.error("Error deleting friend from user:", error);
      res.status(500).json({ error: "Failed to delete friend from user." });
    }
  },
};
