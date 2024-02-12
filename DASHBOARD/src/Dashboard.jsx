import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { FaBarcode, FaUsers, FaMoneyBillAlt } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import axios from "axios";

const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
};

const Dashboard = () => {
  const [qrData, setQRData] = useState({
    totalScans: 0,
    totalShares: 0,
    totalAmountPaid: 0,
    totalPercentageOfShares: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/qr/info");
        setQRData(response.data.qrData);
      } catch (error) {
        console.error("Error fetching QR data:", error);
      }
    };

    fetchData(); // Fetch data initially when component mounts

    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup function to clear interval when component unmounts
  }, []);

  return (
    <Container style={{ marginTop: "100px", textAlign: "center" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "#333" }}
      ></Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              backgroundColor: "#f5f5f5",
              color: "#333",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <IconButton
                style={{
                  fontSize: "40px",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                <FaBarcode />
              </IconButton>
              <Typography variant="h4" gutterBottom>
                Total Scans
              </Typography>
              <Typography
                variant="h4"
                style={{ fontSize: "60px", fontWeight: "bold" }}
              >
                {qrData.totalScans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              backgroundColor: "#ffd54f",
              color: "#333",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <IconButton
                style={{
                  fontSize: "40px",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                <FaUsers />
              </IconButton>
              <Typography variant="h4" gutterBottom>
                Total Shares
              </Typography>
              <Typography
                variant="h4"
                style={{ fontSize: "60px", fontWeight: "bold" }}
              >
                {formatNumber(qrData.totalShares)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              backgroundColor: "#4fc3f7",
              color: "#333",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <IconButton
                style={{
                  fontSize: "40px",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                <FaMoneyBillAlt />
              </IconButton>
              <Typography variant="h4" gutterBottom>
                Total Amount Paid
              </Typography>
              <Typography
                variant="h4"
                style={{ fontSize: "60px", fontWeight: "bold" }}
              >
                {formatNumber(qrData.totalAmountPaid)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Card
            style={{
              backgroundColor: "#66bb6a",
              color: "#333",
              marginTop: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              width: "80%",
              margin: "0 auto",
            }}
          >
            <CardContent>
              <IconButton
                style={{
                  fontSize: "40px",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                <AiOutlinePieChart />
              </IconButton>
              <Typography variant="h4" gutterBottom>
                Percentage of Shares
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h3"
                  style={{
                    marginBottom: "10px",
                    fontSize: "60ppx",
                    fontWeight: "bold",
                  }}
                >
                  {qrData?.totalPercentageOfShares.toFixed(2)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={qrData.totalPercentageOfShares}
                  style={{ width: "100%", borderRadius: "5px" }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
