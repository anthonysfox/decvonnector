const mongoose = require("mongoose");

// Defining the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Exporting the user model.
// Mongoose.model takes in two arguements which are the name of the schema and then the actually schema
// which is defined above
module.exports = User = mongoose.model("user", UserSchema);
