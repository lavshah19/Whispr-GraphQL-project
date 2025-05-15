const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  musicUrl: {
    type: String, // YouTube URL (can include start/end in frontend)
  },
  startTime: {
    type: Number, // in seconds
  },
  endTime: {
    type: Number, // in seconds
  },
  senderName: {
    type: String,
    default: "Anonymous",
  },
  recipientName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  thumbnailUrl: { type: String },
});

module.exports = mongoose.model("Message", messageSchema);
