import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./Dashboard";

const theme = createTheme({
  // Define your theme here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
