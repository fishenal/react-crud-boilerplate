// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";

// types
interface Props {
  title: ReactNode;
  open: boolean;
  handleClose: () => void;
  deleteAction: () => void;
}

export default function AlertDelete({
  title,
  open,
  handleClose,
  deleteAction,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      keepMounted
      maxWidth="xs"
      aria-labelledby="item-delete-title"
      aria-describedby="item-delete-description"
    >
      {open && (
        <>
          <DialogTitle id="item-delete-title">Delete Check</DialogTitle>
          <DialogContent>
            <DialogContentText id="item-delete-description">
              {`Are you sure to Delete "${title}"`}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mr: 2 }}>
            <Button onClick={() => handleClose()} color="error">
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={deleteAction}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
