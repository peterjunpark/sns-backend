const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: Schema.DataTypes.ObjectId,
  reactionBody: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
