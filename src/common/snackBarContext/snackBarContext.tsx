"use client";
import {
  Alert,
  AlertColor,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { SyntheticEvent, createContext, useState, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface SnackbarConfig {
  message: string;
  severity: AlertColor;
}

export const SnackBarContext = createContext<{
  handleOpen: (config: SnackbarConfig) => void;
}>({
  handleOpen: () => {},
});

export const SnackBarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig>({
    message: "",
    severity: "info",
  });

  const handleOpen = ({ message, severity }: SnackbarConfig) => {
    setSnackbarConfig({
      message,
      severity,
    });
    setOpen(true);
  };

  const handleClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => {
        setOpen(false);
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <SnackBarContext.Provider
      value={{
        handleOpen,
      }}
    >
      {children}
      <Snackbar open={open} onClose={handleClose}>
        <Alert severity={snackbarConfig.severity}>
          {snackbarConfig.message} {action}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
