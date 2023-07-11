const { Schema, model } = require("mongoose");

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
        validator: function (email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
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
      getters: true,
      setters: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
