import { Facebook, Instagram, Twitter, WhatsApp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";

function TopHeader() {
  return (
    <Box sx={styles.Tpheader}>
      <Box sx={styles.childBox}>
        <WhatsApp sx={styles.itemSt} />
        <Typography sx={styles.itemSt}>0708 055 6555</Typography>
      </Box>

      <Box sx={styles.childBox}>
        <Button sx={styles.itemSt}>Contact us</Button>
        <Button sx={styles.itemSt}>About us</Button>
        <Button sx={styles.itemSt}>Terms and condition</Button>
        <Button sx={styles.itemSt}>Privacy Policy</Button>
        <Button sx={styles.itemSt}>Disclaimer</Button>
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
    bgcolor: "white",
    padding: "2px",
    color: "white",
    borderTop: 1,
  },
  childBox: {
    display: "flex",
    justifyContent: "space-around",
    padding: "5px",
    alignItems: "center",
  },
  itemSt: {
    textTransform: "capitalize",
    color: "#000066",
    fontSize: { xs: 10, md: 12 },
  },
};
