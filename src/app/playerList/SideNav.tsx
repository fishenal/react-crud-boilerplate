import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";

export const SideNav = () => {
  return (
    <nav>
      <List sx={{ px: 2 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SportsSoccerIcon />
            </ListItemIcon>
            <ListItemText primary="Football" secondary="World cup players" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SportsFootballIcon />
            </ListItemIcon>
            <ListItemText primary="Rugby" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};
