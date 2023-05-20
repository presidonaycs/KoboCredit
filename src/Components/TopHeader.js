import { Facebook, Instagram, Twitter, WhatsApp } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";

function TopHeader() {
  return (
    <Box sx={styles.Tpheader}>
      <Box sx={styles.childBox}>
        <WhatsApp />
        <Typography sx={{ fontSize: { xs: 10, md: 12 }, pl: 1 }}>
          0708 055 6555
        </Typography>
      </Box>

      <Box sx={styles.childBox}>
        <Twitter sx={{ fontSize: { xs: 22, md: 28 }, pr: 1 }} />
        <Facebook sx={{ fontSize: { xs: 22, md: 28 }, pr: 1 }} />
        <Instagram sx={{ fontSize: { xs: 22, md: 28 }, pr: 1 }} />
      </Box>
    </Box>
  );
}

export default TopHeader;

/** @type {import("@mui/material").SxProps} */
const styles = {
  Tpheader: {
    display: "flex",
    justifyContent: "space-between",
    bgcolor: blue["900"],
    padding: "5px",
    color: "white",
  },
  childBox: {
    display: "flex",
    justifyContent: "space-around",
    padding: "5px",
    alignItems: "center",
  },
};
