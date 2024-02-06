const { model, Schema, default: mongoose } = require("mongoose");

var schema = new Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    sequence: {
      type: Number,
    },
    courses: [{ type: mongoose.Types.ObjectId, ref: "courses" }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const TrandingCourse = model("trending_course", schema);
module.exports = TrandingCourse;
