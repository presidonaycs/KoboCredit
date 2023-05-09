import { MenuTwoTone } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
// import kobologo from "../../public/kobologo.png";
import Image from "next/image";
import Link from "next/link";


function AppHeader() {
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          color="secondary"
        >
          <MenuTwoTone />
        </IconButton>
       
        {/* <Box  sx={styles.appLogo} src={kobologo} /> */}
        <Link href="/">
        <Image
          style={{marginLeft:"6px"}}
          src="/kobologo.png"
          width={20}
          height={20}
        />
        </Link>
        
        
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Typography>KoboRush</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

/** @type {import("@mui/material").SxProps} */

const styles = {
  appBar: {
    bgcolor: "deepOrange.mid",
  },
  appLogo: {
    width: 20,
    ml: 1,
    cursor: "pointer",
  },
};

export default AppHeader;
