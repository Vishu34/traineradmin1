const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    cardType: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    transId: {
      type: String,
      required: true,
    },
    transmethod: {
      type: String,
    },
    remark: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    status: {
      type: Number,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },
    userType: {
      type: String,
      enum: ["student", "trainer"],
    },
    utrNo: {
      type: String,
    },
  },
  { timestamps: true }
);
exports.WalletTransation = mongoose.model("wallet_transaction", schema);
