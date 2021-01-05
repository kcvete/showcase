const mongoose = require("mongoose")

const UserSchema = {
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
      },
      password : {
          type: String,
          required: true
      }
}

module.exports = User = mongoose.model("users", UserSchema);