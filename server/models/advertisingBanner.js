const { model, Schema } = require("mongoose");
var schema = new Schema(
  {
    title: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
    },
    position: {
      type: String,
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
const AdvertiseBanner = model("advertising_banner", schema);

module.exports = AdvertiseBanner;
