import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import theme from "~/src/theme";
import CustomNav from "./CustomNav";
import navlist from "~/src/Nav";
import ListItemBody from "./ListItemBody";
import SingleLevelBody from "./SingleLevelBody";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Search, SearchIconWrapper, StyledInputBase } from "./Search";
import Button from "@mui/material/Button";
import { AppBar, Drawer, DrawerHeader } from "./AppBar";
import { Avatar, ListItemButton } from "@mui/material";
import { useFetcher, useLocation, useNavigate } from "@remix-run/react";
import useNavStore from "~/lib/stores/navStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const open = useNavStore((state) => state.open);
  const handleOpen = useNavStore((state) => state.handleOpen);
  const fetcher = useFetcher();

  const handleDrawerOpen = () => {
    handleOpen();
  };

  const handleDrawerClose = () => {
    handleOpen();
  };
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.pathname);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "gray" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button
              size="small"
              sx={{ px: 2, py: 0 }}
              color="inherit"
              onClick={() =>
                fetcher.submit(
                  { button: "signout" },
                  { method: "post", action: "/dashboard" }
                )
              }
            >
              Logout
            </Button>

            <Avatar src="/avatar-1.jpg" />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
              //onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          height: "100%",

          "& .MuiDrawer-paper": {
            backgroundImage: "url(/drawerbg.jpg)",
            backgroundSize: "cover",
            "&:before": {
              position: "absolute",
              width: "100%",
              minHeight: "100vh", //conditionally set it based on the contents height
              content: '""',
              background: "#000",
              opacity: "0.8",
            },
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <CustomNav
          component="nav"
          sx={{ "& .MuiListItemButton-root": { borderRadius: open ? 2 : 0 } }}
        >
          {navlist.map(({ title, Icon, children, route }, index) => (
            <ListItemButton
              key={index}
              onClick={() => route && navigate(route)}
              selected={location.pathname === route}
              sx={{ display: "block", px: open ? 2 : 0, my: 1 }}
            >
              {typeof children != "undefined" ? (
                <ListItemBody
                  title={title}
                  Icon={Icon}
                  parentOpen={open}
                  children={children}
                />
              ) : (
                <SingleLevelBody title={title} Icon={Icon} toggle={open} />
              )}
            </ListItemButton>
          ))}
        </CustomNav>
      </Drawer>
      <Box
        component="main"
        sx={{
          //flex: 1,
          pl: 2,
          pt: 4,
          // p: 3,
          width: "100%",
          //pl: 3,

          backgroundColor: "#e3f2fd",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
