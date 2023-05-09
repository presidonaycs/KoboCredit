import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
// import { Link, useLocation } from "react-router-dom";
import theme from "../config/theme";
import  PhoneIcon from "@mui/icons-material/Phone";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import WifiIcon from '@mui/icons-material/Wifi';


import Link from "next/link";
import {useRouter} from 'next'

function SideNav() {
  const { collapsed } = useProSidebar();

  // const location = useLocation();
  return (
    <Sidebar style={{ height: "100%", top: "auto" }} breakPoint="md">
      {!collapsed ? (
        <Menu
          menuItemStyles={{
            button: ({ active }) => {
              return {
                backgroundColor: active
                  ? theme.palette.neutral.medium
                  : undefined,
              };
            },
          }}
        >
          {/* <Link href="/electricity-bill">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, marginLeft: "16px" }}
            >
              KOBORUSH
            </Typography>
          </Link> */}
          <Link href="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/airtime">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={"Purchase Airtime"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/data">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <WifiIcon />
                </ListItemIcon>
                <ListItemText primary={"Data Subscription"} />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link href="/electricity">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ElectricBoltIcon />
                </ListItemIcon>
                <ListItemText primary={"Electric Bill"} />
              </ListItemButton>
            </ListItem>
          </Link>
          {/* <MenuItem
          // active={location.pathname === "/airtime"}
          // component={<Link to="airtime" />}
          >
            <Typography variant="body2">Buy Airtime</Typography>
          </MenuItem>
          <MenuItem
          // active={location.pathname === "/electricity"}
          // component={<Link to="electricity" />}
          >
            <Typography variant="body2">Buy Electricity</Typography>
          </MenuItem>
          <MenuItem
          // active={location.pathname === "/data"}
          // component={<Link to="data" />}
          >
            <Typography variant="body2">Buy Data</Typography>
          </MenuItem> */}
        </Menu>
      ) : null}
    </Sidebar>
  );
}

export default SideNav;
