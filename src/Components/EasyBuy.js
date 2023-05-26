import { PhoneAndroid } from "@mui/icons-material";
import WifiIcon from "@mui/icons-material/Wifi";
import PowerIcon from "@mui/icons-material/Power";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import React from "react";
import { blue, deepOrange } from "@mui/material/colors";
import Link from "next/link";
// import { Link } from "react-router-dom";

function EasyBuy() {
  return (
    <Card>
      <CardContent>
        <Typography variant="cardTitle">
          Need Airtime, Data, TV subscription or Power
        </Typography>
        <Box sx={styles.easyContainer}>
          <Box sx={styles.columnContent}>
            <Link href="/airtime">
              <Box sx={styles.easyItem}>
                <IconButton >
                  <PhoneAndroid sx={styles.IconStyle} />
                </IconButton>
                <Typography sx={styles.Typography}>Airtime</Typography>
              </Box>
            </Link>

            <Link href="/data">
              <Box sx={styles.easyItem}>
                <IconButton >
                  <WifiIcon sx={styles.IconStyle} />
                </IconButton>
                <Typography sx={styles.Typography}>Data</Typography>
              </Box>
            </Link>

            <Link href="/electricity">
              <Box sx={styles.easyItem}>
                <IconButton >
                  <PowerIcon sx={styles.IconStyle} />
                </IconButton>
                <Typography sx={styles.Typography}>Electricity</Typography>
              </Box>
            </Link>

            <Link href="tv">
              <Box sx={styles.easyItem}>
                <IconButton >

                  <PowerIcon sx={styles.IconStyle} />
                </IconButton>
                <Typography sx={styles.Typography}>Cable TV</Typography>
              </Box>
            </Link>

          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EasyBuy;

/** @type {import("@mui/material").SxProps} */

const styles = {
  columnContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  easyContainer: {
    width: "100%",
    position: "relative",
    mt: "2rem",
  },
  easyItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    minWidth: "6rem",
    maxWidth: "6rem",
    cursor: "pointer",
    borderRadius: "0.5rem",
    bgcolor: blue["900"],
    color: "whitesmoke",
    mt: "1rem",
  },

  Typography: {
    fontSize: { xs: 10, md: 14 },
  },

  IconStyle: {
    fontSize: { xs: 30, md: 40 },
    color: "white",
  },
};
