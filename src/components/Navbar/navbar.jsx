import React from "react";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getUser } from "../../redux/userSlice/userSlice";
import LocationSvg from "../Location-Svg/location-svg";
import { Link } from "react-router-dom";

import chennai from "../../assets/icons/chennai.svg";
import pune from "../../assets/icons/pune.svg";
import surat from "../../assets/icons/surat.svg";
import mumbai from "../../assets/icons/mumbai.svg";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Tooltip,
  InputBase,
  IconButton,
  MenuItem,
  Avatar,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Grid,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LabelIcon from "@mui/icons-material/Label";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";

import "./navbar.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Navbar = () => {
  const userData = useSelector(getUser);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [location, setLocation] = React.useState("Pune");

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" className="upper-nav">
          <Toolbar variant="dense">
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                CRAFTSMAN'S APPRENTICE
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="View Cart">
                <IconButton sx={{ p: 0, mx: 5 }} size="large">
                  <Link to={`/cart`} style={{ color: "#ffffff" }}>
                    <ShoppingCartIcon sx={{ fontSize: 36 }} />
                  </Link>
                </IconButton>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    className="nav-link"
                    to={{
                      pathname: `/profile/${userData["userType"]}/${userData["_id"]}`,
                    }}
                  >
                    {userData.userName}'s Profile
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <AppBar position="static" className="search-nav">
          <Toolbar variant="dense" className="search-toolbar">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={handleModalOpen}>{location}</Button>

            <Modal
              keepMounted
              open={openModal}
              onClose={handleModalClose}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box className="modal-box">
                <div className="locations">
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <IconButton onClick={() => setLocation("Pune")}>
                        <LocationSvg path={pune} location="Pune" />
                      </IconButton>
                      <Item>Pune</Item>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton onClick={() => setLocation("Mumbai")}>
                        <LocationSvg path={mumbai} location="Mumbai" />
                      </IconButton>
                      <Item>Mumbai</Item>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton onClick={() => setLocation("Surat")}>
                        <LocationSvg path={surat} location="Surat" />
                      </IconButton>
                      <Item>Surat</Item>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton onClick={() => setLocation("Chennai")}>
                        <LocationSvg path={chennai} location="chennai" />
                      </IconButton>
                      <Item>Chennai</Item>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </Modal>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={openDrawer}
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              p: 4,
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <h5>Shop By Artists</h5>
          <List>
            <ListItem button>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Ruturaj Patil" />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Sudeep" />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Janhavi Kolte" />
            </ListItem>
          </List>
          <Divider />
          <h5>Shop By Categories</h5>
          <List>
            <ListItem button>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Artwork" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Paintings" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Books" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Sculptures" />
            </ListItem>
          </List>
          <Divider />
          <h5>Help and Settings</h5>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Your Account" />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Customer Service" />
            </ListItem>
          </List>
        </Drawer>
      </ThemeProvider>
    </div>
  );
};

export default Navbar;
