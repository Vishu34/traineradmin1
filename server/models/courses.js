const { model, Schema, default: mongoose } = require("mongoose");

var schema = new Schema(
  {
    cslug: {
      type: String,
      required: true,
    },
    ctitle: {
      type: String,
      required: true,
    },
    ccategory: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
    },
    ratings: {
      type: Number,
      default: 0,
    },
    cviews: {
      type: Number,
      default: 0,
    },
    cduration: {
      type: String,
      default: "0",
    },

    cdescription: {
      type: String,
    },
    cthumbnail: {
      type: String,
    },
    AccessPeriodDayd: {
      type: Date,
      default: Date.now,
    },
    cdemovideo: {
      type: String,
    },
    ccoverimage: {
      type: String,
    },

    ckeywords: {
      type: String,
    },
    cfees: {
      type: String,
    },
    cofferfees: {
      type: String,
    },
    creviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course_review",
      },
    ],
    ctrainer: {
      type: mongoose.Types.ObjectId,
      ref: "trainer",
    },
    cstatus: {
      type: Number,
      default: 1,
    },
    csubcategory: {
      type: mongoose.Types.ObjectId,
      ref: "sub_category",
    },
    cmodules: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course_module",
      },
    ],
    enrollStudent: [
      {
        type: mongoose.Types.ObjectId,
        ref: "students",
      },
    ],
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Courses = model("courses", schema);
module.exports = Courses;
