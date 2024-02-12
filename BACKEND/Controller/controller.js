const QRModel = require("../Model/QRModel");
const Document = require("../Model/Doucment");

exports.scanQRCode = async (req, res) => {
  try {
    // Find the document by QR code
    const { qrCode } = req.body;
    const document = await Document.findOne({ ACNum: qrCode });

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Calculate total shares and total amount paid from the found document
    const totalShares = parseFloat(document["signedNoOfShare"]) || 0;
    const totalAmountPaid = parseFloat(document["AmountPaidInCash"]) || 0;

    // Find the QR model document or create one if not exists
    let qrInfo = await QRModel.findOne();

    if (!qrInfo) {
      qrInfo = await QRModel.create({
        totalScans: 1,
        totalShares,
        totalAmountPaid,
      });
    } else {
      // Update QRInfo with total counts
      qrInfo.totalScans++;
      qrInfo.totalShares += totalShares;
      qrInfo.totalAmountPaid += totalAmountPaid;
    }

    // Calculate percentage of shares
    const totalSharesConstant = 8886; // Update this value with your total shares constant
    qrInfo.percentageOfShares = (qrInfo.totalScans / totalSharesConstant) * 100;

    await qrInfo.save();

    return res
      .status(200)
      .json({ message: "QR code scanned successfully", qrInfo });
  } catch (error) {
    console.error("Error scanning QR code:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getQRInfo = async (req, res) => {
  try {
    const qrInfos = await QRModel.find();

    if (!qrInfos || qrInfos.length === 0) {
      return res.status(404).json({ error: "No QR codes found" });
    }

    let totalScans = 0;
    let totalShares = 0;
    let totalAmountPaid = 0;
    let totalPercentageOfShares = 0;

    qrInfos.forEach((qrInfo) => {
      totalScans += qrInfo.totalScans;
      totalShares += qrInfo.totalShares;
      totalAmountPaid += qrInfo.totalAmountPaid;
    });

    if (totalShares > 0) {
      const totalSharesConstant = 8886; // Update this value with your total shares constant
      totalPercentageOfShares = (totalScans / totalSharesConstant) * 100;
    }

    const qrData = {
      totalScans,
      totalShares,
      totalAmountPaid,
      totalPercentageOfShares,
    };

    res.status(200).json({ qrData });
  } catch (error) {
    console.error("Error retrieving QR info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
