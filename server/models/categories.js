const { model, Schema, default: mongoose } = require("mongoose");

var schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    sequence: {
      type: Number,
    },
    courses: [{ type: mongoose.Types.ObjectId, ref: "courses" }],
    // trainers: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "trainer",
    //   },
    // ],
    subCategory: [{ type: mongoose.Types.ObjectId, ref: "sub_category" }],
  },

  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Categories = model("categories", schema);
module.exports = Categories;
