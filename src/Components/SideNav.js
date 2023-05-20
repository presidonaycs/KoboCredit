import { Typography } from "@mui/material";
import Link from "next/link";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
// import { Link, useLocation } from "react-router-dom";
import theme from "../config/theme";

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
          <Link href="/">
            <MenuItem
            // active={location?.pathname === "/"}
            // component={<Link to="/" />}
            >
              <Typography variant="body2">Home</Typography>
            </MenuItem>
          </Link>

          <Link href="/airtime">
            <MenuItem
            // active={location?.pathname === "/airtime"}
            // component={<Link to="airtime" />}
            >
              <Typography variant="body2">Buy Airtime</Typography>
            </MenuItem>
          </Link>

          <Link href="/electricity">
            <MenuItem
            // active={location?.pathname === "/electricity"}
            // component={<Link to="electricity" />}
            >
              <Typography variant="body2">Buy Electricity</Typography>
            </MenuItem>
          </Link>

          <Link href="/data">
            <MenuItem
            // active={location?.pathname === "/data"}
            // component={<Link to="data" />}
            >
              <Typography variant="body2">Buy Data</Typography>
            </MenuItem>
          </Link>

          <Link href="/tv">
            <MenuItem
            // active={location?.pathname === "/tv"}
            // component={<Link to="tv" />}
            >
              <Typography variant="body2">TV Subscription</Typography>
            </MenuItem>
          </Link>

        </Menu>
      ) : null}
    </Sidebar>
  );
}

export default SideNav;
