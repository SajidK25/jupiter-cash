import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//import ProTip from "./ProTip";
//import Copyright from "./Copyright";
import CssBaseline from "@mui/material/CssBaseline";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ my: 4, width: "100%" }}>
        <CssBaseline />
        {children}
      </Box>
    </Container>
  );
}
