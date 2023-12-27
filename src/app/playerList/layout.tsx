"use client";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import { SideNav } from "./SideNav";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Sport Players
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ py: 3, pr: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={2}>
            <SideNav />
          </Grid>
          <Grid xs={10}>{children}</Grid>
        </Grid>
      </Box>
    </Box>
  );
}
