const { Schema, model } = require("mongoose");
const { hashPassword, isEmail } = require("../utils/helpers");

const userSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
