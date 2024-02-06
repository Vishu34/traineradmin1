const { model, Schema, default: mongoose } = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

var schema = new Schema(
  {
    sname: {
      type: String,
      required: true,
      trim: true,
    },
    sbackgroundUrl: {
      type: String,
      default: "",
    },
    sprofilepicUrl: {
      type: String,
      default: "",
    },
    semail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    smobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    sgender: {
      type: String,
      trim: true,
    },
    sdob: {
      type: String,
      trim: true,
      default: "",
    },
    levelOfeducation: {
      type: String,
      default: "",
    },
    passOutYear: {
      type: String,
      default: "",
    },
    scity: {
      type: String,
      trim: true,
      default: "",
    },
    sstate: {
      type: String,
      default: "",
    },
    scountry: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      trim: true,
      default: 0,
    },
    varified: {
      type: String,
      trim: true,
      default: "0",
    },
    spincode: {
      type: String,
      trim: true,
    },
    saddress: {
      type: String,
      trim: true,
      default: "",
    },
    spassword: {
      type: String,
      trim: true,
    },
    phoneOtp: {
      type: String,
      trim: true,
      default: "",
    },
    emailOtp: {
      type: String,
      trim: true,
      default: "",
    },
    walletAmt: {
      type: String,
      default: "0.0",
    },
    reviewspost: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course_review",
      },
    ],
    enrollCourse: [
      {
        type: mongoose.Types.ObjectId,
        ref: "courses",
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

// schema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.spassword);
// };

// encrypt password before saving into mongoDB
// schema.methods.encryptPassword = async function (password) {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

schema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const Student = model("students", schema);
module.exports = Student;
