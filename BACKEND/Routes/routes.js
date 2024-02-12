const express = require("express");
const router = express.Router();
const { scanQRCode, getQRInfo } = require("../Controller/controller");

// Route for scanning QR code
router.post("/scan", scanQRCode);

// Route for getting overall QR info
router.get("/info", getQRInfo);

module.exports = router;
