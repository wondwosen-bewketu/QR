const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const qrRoutes = require("./Routes/routes");
const cors = require("cors");

// Create Express app
const app = express();
// Allow requests from all origins (replace * with your frontend URL in production)
app.use(cors());

// Set up middleware
app.use(bodyParser.json());

// Mount routes
app.use("/api/qr", qrRoutes);

// Define port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB locally
mongoose
  .connect("mongodb://0.0.0.0:27017/Shareholders")
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successfully connecting to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
