const mongoose = require("mongoose")

const { Schema } = mongoose;

const ArtsSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        lowercase: true,
      },
      date: Date,
      userID: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
})

module.exports = Arts = mongoose.model("Arts", ArtsSchema);