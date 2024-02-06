const { model, Schema, default: mongoose } = require("mongoose");
var schema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    sequence: {
      type: Number,
    },
    module: {
      type: mongoose.Types.ObjectId,
      ref: "course_module",
    },
    courses: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
    },
    trainer: {
      type: mongoose.Types.ObjectId,
      ref: "trainer",
    },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const CourseSubModule = model("course_subModule", schema);

module.exports = CourseSubModule;
