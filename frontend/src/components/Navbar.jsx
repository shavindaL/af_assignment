import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

const pages = ["Home", "Results", "Parties"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img src="logo.png" style={{ height: "50px" }}></img>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: "100px",
            }}
          >
            <MenuItem
              sx={{
                my: 2,
                display: "block",
                color: "blue",
                fontFamily: "roboto",
              }}
            >
              <Link to="/">Home</Link>
            </MenuItem>

            <MenuItem
              sx={{
                my: 2,
                display: "block",
                color: "blue",
                fontFamily: "roboto",
              }}
            >
              <Link to="#">Results</Link>
            </MenuItem>

            <MenuItem
              sx={{
                my: 2,
                display: "block",
                color: "blue",
                fontFamily: "roboto",
              }}
            >
              <Link to="/political_parties">Parties</Link>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 , mr:4}}>
          <Tooltip title="Select your language" sx={{disableHoverListener:false}}>
              <Button size="small" onClick={handleOpenUserMenu} sx={{ px: 2, hover:false}}>
                English
              </Button>
            </Tooltip>
            <Tooltip title="ඔබේ භාෂාව තෝරන්න">
              <Button size="small" onClick={handleOpenUserMenu} sx={{ px: 2 }}>
              සිංහල
              </Button>
            </Tooltip>

            <Tooltip title="உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்">
              <Button size="small" onClick={handleOpenUserMenu} sx={{ px: 2 }}>
              தமிழ்
              </Button>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Candidate Login">
              <Button variant="outlined" onClick={handleOpenUserMenu} sx={{ px: 2 , mr:2}}>
                Login
              </Button>
            </Tooltip>
            <Tooltip title="Candidate Signup">
              <Button variant="contained" onClick={handleOpenUserMenu} sx={{ px: 2 }}>
                Sign Up
              </Button>
            </Tooltip>
          </Box>

          
          {/* use below part after login */}

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/vite.svg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
