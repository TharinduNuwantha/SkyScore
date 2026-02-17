import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  ListItemIcon
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleEditProfile = () => {
    handleCloseMenu();
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        backdropFilter: "blur(10px)",
        zIndex: 1100,
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 800,
            letterSpacing: 1,
            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            textDecoration: "none",
            fontSize: "1.5rem"
          }}
        >
          SkyScore
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

          <IconButton
            onClick={toggleTheme}
            sx={{
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.05)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
            }}
          >
            {isDarkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>

          {!token ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '20px',
                  px: 3
                }}
              >
                Register
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                  {user?.firstName ? `Hi, ${user.firstName}` : ""}
                </Typography>
                <Tooltip title="Account profile">
                  <IconButton
                    onClick={handleOpenMenu}
                    size="small"
                    sx={{ ml: 0.5, p: 0 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar
                      alt={user?.firstName}
                      sx={{
                        width: 42,
                        height: 42,
                        bgcolor: "#6366f1",
                        border: "2px solid rgba(255,255,255,0.2)",
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
                      }}
                    >
                      {user?.firstName ? user.firstName[0].toUpperCase() : <PersonIcon />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    bgcolor: '#1e293b',
                    color: '#fff',
                    minWidth: 220,
                    border: '1px solid rgba(255,255,255,0.1)',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: '#1e293b',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      borderLeft: '1px solid rgba(255,255,255,0.1)',
                    },
                  },
                }}
              >
                <Box sx={{ px: 2, py: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5, wordBreak: 'break-all' }}>
                    {user?.email}
                  </Typography>
                </Box>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                <MenuItem onClick={handleEditProfile} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" sx={{ color: '#38bdf8' }} />
                  </ListItemIcon>
                  <Typography sx={{ fontWeight: 500 }}>Edit Details</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#ef4444', fontWeight: 600 }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
