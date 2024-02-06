const { model, Schema, default: mongoose } = require("mongoose");

var schema = new Schema({
  tname: {
    type: String,
  },
  temail: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  tmobile: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  tgender: {
    type: String,
  },
  tdob: {
    type: String,
  },
  taddress: {
    type: String,
  },
  tcity: {
    type: String,
  },
  tpincode: {
    type: String,
  },
  tpic: {
    type: String,
  },
  totp: {
    type: String,
  },
  tfcm: {
    type: String,
  },
  tabout: {
    type: String,
  },
  tstatus: {
    type: Number,
    default: 1,
  },
  tcountry: {
    type: String,
  },

  varified: {
    type: Boolean,
    default: false,
  },
  walletAmt: {
    type: String,
    default: "0.0",
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "courses",
    },
  ],
  // categories: { type: mongoose.Types.ObjectId, ref: "categories" },
  // subCategories: { type: mongoose.Types.ObjectId, ref: "sub_category" },
});

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Trainer = model("trainer", schema);
module.exports = Trainer;
