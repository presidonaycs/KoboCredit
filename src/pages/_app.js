import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import React from "react";
import AppHeader from "../Components/AppHeader";
import '@/styles/globals.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import theme from "../config/theme";
import "./index.css";
import SideNav from "../Components/SideNav";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Router } from "react-router-dom";
import TopHeader from "@/Components/TopHeader";

function App({ Component, pageProps, ...appProps }) {


  if ([`/signup`, `/signin`].includes(appProps.router.pathname)) {
    return <Component {...pageProps} />;
  }
  else {
    return (
      <Box>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <ProSidebarProvider>

              <CssBaseline />
              <TopHeader />
              <AppHeader />
              <Toaster
                position="bottom-left"
                reverseOrder={false}
              />
              <Box sx={styles.container}>
                {/* <BrowserRouter> */}
                <SideNav />
                <Box component={"main"} sx={styles.mainSection}>

                  <Component {...pageProps} />

                  {/* <AppRoutes /> */}
                </Box>
                {/* </BrowserRouter> */}
              </Box>

            </ProSidebarProvider>

          </LocalizationProvider>
        </ThemeProvider>
      </Box>
    );
  }


}

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
    height: "88vh",
  },
  mainSection: {
    p: 4,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
};

export default App;
