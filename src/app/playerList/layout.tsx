"use client";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";

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
            2022 World Cup Players
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={2}>menu</Grid>
          <Grid xs={10}>{children}</Grid>
        </Grid>
      </Box>
    </Box>
  );
}
