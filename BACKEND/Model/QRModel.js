// QRModel.js
const mongoose = require("mongoose");

const QRSchema = new mongoose.Schema({
  totalScans: {
    type: Number,
    default: 0,
  },
  totalShares: {
    type: Number,
    default: 0,
  },
  totalAmountPaid: {
    type: Number,
    default: 0,
  },
  percentageOfShares: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("QRModel", QRSchema);
