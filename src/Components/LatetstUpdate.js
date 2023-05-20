import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
// import waitListibanner from "../assets/waitListibanner.png";

function LatestUpdate() {
  return (
    <Card>
      <CardContent></CardContent>
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
