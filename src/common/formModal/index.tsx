// material-ui
import { Box, Drawer } from "@mui/material";

// project imports
import { ReactElement, ReactNode } from "react";
import CommonForm, { IField } from "../form";

interface IProps {
  open: boolean;
  handleDrawerClose: () => void;
  formik: any;
  fields: IField[];
  title: ReactNode;
  buttonLabel?: ReactNode;
}

const FormModal: (props: IProps) => ReactElement = ({
  open,
  handleDrawerClose,
  formik,
  fields,
  title,
  buttonLabel,
}) => {
  return (
    <Drawer
      sx={{
        ml: open ? 3 : 0,
        flexShrink: 0,
        zIndex: 1200,
        overflowX: "hidden",
        width: { xs: 320, md: 450 },
        "& .MuiDrawer-paper": {
          height: "100vh",
          width: { xs: 320, md: 450 },
          position: "fixed",
          border: "none",
          borderRadius: "0px",
        },
      }}
      variant="temporary"
      anchor="right"
      open={open}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerClose}
    >
      {open && (
        <Box sx={{ p: 3 }}>
          <CommonForm
            formik={formik}
            title={title}
            fields={fields}
            mainButtonLabel={buttonLabel}
          />
        </Box>
      )}
    </Drawer>
  );
};
export default FormModal;
