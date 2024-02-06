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
    subModule: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course_subModule",
      },
    ],
    course: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
    },
    trainer: {
      type: mongoose.Types.ObjectId,
      ref: "trainer",
    },
    status: {
      type: Number,
      default: 1,
    },
    sequence: {
      type: Number,
    },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const CourseModule = model("course_module", schema);

module.exports = CourseModule;
