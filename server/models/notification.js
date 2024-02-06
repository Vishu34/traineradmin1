const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    banner: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userType: {
      type: String,
      default: "All",
      //all  or student or  trainer
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamp: true }
);

exports.NotificationModel = mongoose.model("notification", schema);
