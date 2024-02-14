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

    // Calculate total shares constant
    let totalSharesConstant = 0;
    const documents = await Document.find();
    if (documents) {
      totalSharesConstant = documents.reduce(
        (total, doc) => total + parseFloat(doc.signedNoOfShare || 0),
        0
      );
    }

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

    // Calculate total shares constant
    let totalSharesConstant = 0;
    const documents = await Document.find();
    if (documents) {
      totalSharesConstant = documents.reduce(
        (total, doc) => total + parseFloat(doc.signedNoOfShare || 0),
        0
      );
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

    if (totalSharesConstant > 0) {
      totalPercentageOfShares = (totalShares / totalSharesConstant) * 100;
    }

    const qrData = {
      totalScans,
      totalShares,
      totalAmountPaid,
      totalPercentageOfShares,
      totalSharesConstant, // Include total shares constant in the response
    };

    res.status(200).json({ qrData });
  } catch (error) {
    console.error("Error retrieving QR info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
