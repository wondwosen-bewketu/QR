// Document model schema
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  SNo: String,
  ACNum: String,
  FullName: String,
  Field5: String,
  signedNoOfShare: String,
  AmountSubscribed: String,
  AmountPaidInCash: String,
  UnpaidBalance: String,
  Country: String,
  TelNumber: String,
  EmailAddress: String,
  AccountNo: String,
  Address: String,
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
