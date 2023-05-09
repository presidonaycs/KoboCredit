// import * as React from 'react';
// import '@/styles/globals.css'
// import Footer from '@/Components/Footer'
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import HomeIcon from '@mui/icons-material/Home';
// import TvIcon from '@mui/icons-material/Tv';
// import PhoneIcon from '@mui/icons-material/Phone';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import WifiIcon from '@mui/icons-material/Wifi';
// import HistoryIcon from '@mui/icons-material/History';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
// import Link from 'next/link';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import Image from 'next/image';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// export default function App({ Component, pageProps }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
//   const [isOpen, setIsOpen] = React.useState(false);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleClose = () => {
//     setIsOpen(false);
//   }

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const list = (anchor) => (

//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={() => handleClose()}
//       onKeyDown={() => handleClose()}

//     >
//       {/* <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List> */}
//       <Divider />
//       <List>

//         <Link href="/" >
//           <ListItem disablePadding className=" flex flex-h-center m-b-40">
//             <Image src="/koborush.jpg" width={120} height={120} />
//           </ListItem>
//         </Link>

//         <Link href="/">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <HomeIcon />
//               </ListItemIcon>
//               <ListItemText primary={"Home"} />
//             </ListItemButton>
//           </ListItem>
//         </Link>

//         <Link href="/cable-tv">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <TvIcon />
//               </ListItemIcon>
//               <ListItemText primary={"TV/Cable Subscription"} />
//             </ListItemButton>
//           </ListItem>
//         </Link>

//         <Link href="/airtime-purchase">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <PhoneIcon />
//               </ListItemIcon>
//               <ListItemText primary={"Purchase Airtime"} />
//             </ListItemButton>
//           </ListItem>
//         </Link>

//         <Link href="/data-subscription">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <WifiIcon />
//               </ListItemIcon>
//               <ListItemText primary={"Data Subscription"} />
//             </ListItemButton>
//           </ListItem>
//         </Link>

//         <Link href="/electricity-bill">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <ElectricBoltIcon />
//               </ListItemIcon>
//               <ListItemText primary={"Electric Bill"} />
//             </ListItemButton>
//           </ListItem>
//         </Link>

//         <Link href="/transactions">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <HistoryIcon />
//               </ListItemIcon>
//               <ListItemText primary={"Transaction History"} />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//       </List>
//     </Box>
//   );

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="error">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton
//           size="large"
//           aria-label="show 17 new notifications"
//           color="inherit"
//         >
//           <Badge badgeContent={17} color="error">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <>
//         <Box sx={{ flexGrow: 1 }}>
//           <AppBar position="static" >
//             <Toolbar sx={{ backgroundColor: "#222222" }}>
//               <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="open drawer"
//                 sx={{ mr: 2, color: "#F28437" }}
//                 onClick={() => setIsOpen(true)}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Link href="/" > <Image src="/koborush.jpg" width={40} height={40} /> </Link>

//               <Link href="/" >
//                 <Typography
//                   variant="h6"
//                   noWrap
//                   component="div"
//                   sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: '16px' }}
//                 >
//                   KOBORUSH
//                 </Typography>
//               </Link>

//               {/* <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//             /> */}
//               {/* </Search> */}
//               <Box sx={{ flexGrow: 1 }} />
//               <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: "space-between", alignItems: "center", width: "30%" }}>
//                 {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//               <Badge badgeContent={4} color="error">
//                 <MailIcon />
//               </Badge>
//               </IconButton> */}
//                 {/* <Typography
//                   variant="p"
//                   noWrap
//                   component="div"
//                   sx={{ display: { xs: 'none', sm: 'block' } }}
//                 >
//                   Home
//                 </Typography> */}
//                 {/* <IconButton
//               size="large"
//               aria-label="show 17 new notifications"
//               color="inherit"
//               >
//               <Badge badgeContent={17} color="error">
//                 <NotificationsIcon />
//               </Badge>
//               </IconButton> */}
//                 <Typography
//                   variant="p"
//                   noWrap
//                   component="div"
//                   sx={{ display: { xs: 'none', sm: 'block' } }}
//                 >
//                   About Us
//                 </Typography>
//                 <Typography
//                   variant="p"
//                   noWrap
//                   component="div"
//                   sx={{ display: { xs: 'none', sm: 'block' } }}
//                 >
//                   Contact Us
//                 </Typography>
//                 <IconButton
//                   size="large"
//                   edge="end"
//                   aria-label="account of current user"
//                   aria-controls={menuId}
//                   aria-haspopup="true"
//                   onClick={handleProfileMenuOpen}
//                   color="inherit"
//                 >
//                   <AccountCircle />
//                 </IconButton>
//               </Box>
//               <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//                 <IconButton
//                   size="large"
//                   aria-label="show more"
//                   aria-controls={mobileMenuId}
//                   aria-haspopup="true"
//                   onClick={handleMobileMenuOpen}
//                   color="inherit"
//                 >
//                   <MoreIcon />
//                 </IconButton>
//               </Box>
//             </Toolbar>
//           </AppBar>
//           {renderMobileMenu}
//           {renderMenu}
//         </Box>
//         <Component {...pageProps} />
//         <Footer />
//         <Drawer
//           anchor={"Left"}
//           open={isOpen}
//           onClose={handleClose}

//         >
//           {list()}
//         </Drawer>
//       </>
//     </LocalizationProvider>
//   );
// }

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
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
// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./router/AppRoutes";

function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ProSidebarProvider>
          <CssBaseline />
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
    </React.Fragment>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
    height: "calc(100% - 64px)",
  },
  mainSection: {
    p: 4,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
};

export default App;
