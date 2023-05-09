import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
// import waitListibanner from "/public/waitListibanner.png"
import Image from "next/image";

function LatestUpdate() {
  return (
    <Card>
      <CardContent>
        <Typography variant="cardTitle">
          While you wait, be on our WAIT-LIST
        </Typography>
        <Box sx={styles.latestUpdateContainer}>
          <Box
            sx={styles.latestUpdateThumbnail}
            component={"img"}
            src="/waitListibanner.png"
          >
            {/* <Image src="/waitListibanner.png" width={450} height={450} /> */}
          </Box>
          <Typography sx={styles.latestUpdateTitle}>
            Join the waitlist
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LatestUpdate;

/** @type {import("@mui/material").SxProps} */
const styles = {
  latestUpdateContainer: {
    width: "100%",
    position: "relative",
  },

  latestUpdateThumbnail: {
    width: "100%",
    mt: 1,
    filter: "brightness(80%)",
    display: "block",
  },

  latestUpdateTitle: {
    position: "absolute",
    bottom: 0,
    color: "neutral.light",
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1rem",
    mb: 2,
  },
};
