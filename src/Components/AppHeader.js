import { MenuTwoTone } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
// import kobologo from "/mainlogo.png";
import { blue } from "@mui/material/colors";
// import { Router } from "react-router-dom";

function AppHeader() {
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          color="#000080"
        >
          <MenuTwoTone />
        </IconButton>
        <Box component="img" sx={styles.appLogo} src="/mainlogo.png" />
        <Typography sx={{ p: 1, color: "#000080" }}>KOBOrush</Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={styles.rightTopHeader}>
          <Button
            variant="outlined"
            sx={{ color: blue[900], textTransform: "capitalize", mr: 2 }}
          >
            Sign up
          </Button>

          <Button
            variant="outlined"
            sx={{ color: blue[900], textTransform: "capitalize" }}
          >
            Sign in
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

/** @type {import("@mui/material").SxProps} */

const styles = {
  appBar: {
    bgcolor: "white",
  },
  appLogo: {
    width: 22,
    ml: 1,
    cursor: "pointer",
  },
  rightTopHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mr: 2,
  },
};

export default AppHeader;
