const { model, Schema, default: mongoose } = require("mongoose");
var schema = new Schema(
  {
    reviewmsg: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const CourseReview = model("course_review", schema);

module.exports = CourseReview;
