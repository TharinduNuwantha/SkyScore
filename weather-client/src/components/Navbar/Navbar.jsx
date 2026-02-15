import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        backdropFilter: "blur(10px)"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer"
          }}
        >
          SkyScore
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          {/* Dark  Button */}
          <IconButton
            sx={{
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)"
              }
            }}
          >
            <DarkModeIcon />

          </IconButton>


          <Avatar
            alt="User Profile"
            src="https://i.pravatar.cc/300"
            sx={{
              width: 38,
              height: 38,
              border: "2px solid #6366f1"
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
