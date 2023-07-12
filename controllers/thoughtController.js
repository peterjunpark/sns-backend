const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts or get a thought by id.
  getThought: async (req, res) => {
    const { id } = req.body;
    try {
      if (id) {
        // Get a thought by id
        const thought = await Thought.findById(id).populate("reactions");
        if (!thought) {
          return res.status(404).json({ message: "Thought not found." });
        }
        res.json(thought);
      } else {
        // Get all thoughts
        const thoughts = await Thought.find();
        res.json(thoughts);
      }
    } catch (error) {
      console.error("Error getting thoughts:", error);
      res.status(500).json({ error: "Failed to get thoughts." });
    }
  },

  // Post a new thought (and update associated user's thoughts list).
  postThought: async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
      const thought = await Thought.create({ thoughtText, username });
      // Add thought to associated user's thoughts list
      const user = await User.findOneAndUpdate(
        { username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(201).json(thought);
    } catch (error) {
      console.error("Error creating thought:", error);
      res.status(500).json({ error: "Failed to create thought." });
    }
  },

  // Update a thought by id.
  updateThought: async (req, res) => {
    const { id, thoughtText } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        id,
        { thoughtText },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "Thought not found." });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error("Error updating thought:", error);
      res.status(500).json({ error: "Failed to update thought." });
    }
  },

  // Delete a thought by id.
  deleteThought: async (req, res) => {
    const { id } = req.body;
    try {
      const deletedThought = await Thought.findByIdAndDelete(id);
      if (!deletedThought) {
        return res.status(404).json({ message: "Thought not found." });
      }
      // Remove thought from associated user's thoughts list
      await User.findOneAndUpdate(
        { username: deletedThought.username },
        { $pull: { thoughts: deletedThought._id } }
      );
      res.json({ message: "Thought deleted successfully." });
    } catch (error) {
      console.error("Error deleting thought:", error);
      res.status(500).json({ error: "Failed to delete thought." });
    }
  },

  // Create a reaction and add it to an existing thought.
  addReactionToThought: async (req, res) => {
    const { id } = req.params;
    const { reactionBody, username } = req.body;
    try {
      const thought = await Thought.findById(id);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found." });
      }
      const reaction = { reactionBody, username };
      thought.reactions.push(reaction);
      const updatedThought = await thought.save();
      res.status(201).json(updatedThought);
    } catch (error) {
      console.error("Error creating reaction:", error);
      res.status(500).json({ error: "Failed to create reaction." });
    }
  },

  // Delete a reaction from a thought by id.
  deleteReactionFromThought: async (req, res) => {
    const { id } = req.params;
    const { reactionId } = req.params;
    try {
      const thought = await Thought.findById(id);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found." });
      }
      thought.reactions = thought.reactions.filter(
        (reaction) => reaction._id.toString() !== reactionId
      );
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (error) {
      console.error("Error deleting reaction:", error);
      res.status(500).json({ error: "Failed to delete reaction." });
    }
  },
};
