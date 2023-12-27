import React, { ReactElement, ReactNode, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// ==============================|| TABLE - DATA TABLE ||============================== //
export interface IActionMenu {
  label: ReactNode;
  action: (row: any) => void;
}

export interface IProps {
  actionMenu: IActionMenu[];
  row: any;
}
export const ActionMenu: (props: IProps) => ReactElement = ({
  actionMenu = [],
  row,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actionMenu.map((menu, k) => (
          <MenuItem
            key={k}
            onClick={() => {
              menu.action(row);
              handleClose();
            }}
          >
            {menu.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
