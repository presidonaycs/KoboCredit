import * as React from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function GuestFooter() {
    return (
      <Paper sx={{
      marginTop: 'calc(10% + 30px)',
      width: '100%',
      position: 'fixed',
      bottom: 0,
       height: '10%',
      backgroundColor:"#222222"
      }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my:1
            }}
          >
              <div>
              <Image priority src="/favicon.ico" width={50} height={50} alt="Logo" />
              </div>
          </Box>
  
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="initial">
              Copyright ©2023. KoboRush Limited
            </Typography>
          </Box>
        </Container>
      </Paper>
    );
  }