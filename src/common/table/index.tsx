import React, { ReactElement, ReactNode } from "react";

// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Button,
  TableCellProps,
  TablePagination,
  Typography,
  Box,
  Card,
  CardHeader,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { defaultPageSize, pageSizeArr } from "./pageConfig";
import { ActionMenu, IActionMenu } from "./ActionMenu";

// ==============================|| TABLE - DATA TABLE ||============================== //
export interface IColsItem<ItemInterface> {
  id: string;
  label: ReactNode;
  align?: TableCellProps["align"];
  cellRender: (row: ItemInterface) => ReactNode;
}
export interface IDataTableProps<ItemInterface> {
  data: ItemInterface[];
  cols: IColsItem<ItemInterface>[];
  uniKey: keyof ItemInterface;
  page: number;
  size: number;
  total: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
  title?: ReactNode;
  handleAdd?: () => void;
  actionMenu?: IActionMenu[];
}

export const DataTable: <ItemInterface>(
  props: IDataTableProps<ItemInterface>
) => ReactElement = ({
  data = [],
  cols = [],
  page = 0,
  size = defaultPageSize,
  total,
  onPageChange,
  onSizeChange,
  uniKey,
  title = "",
  handleAdd,
  actionMenu = [],
}) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    onSizeChange(parseInt(event?.target.value!, 10));
    onPageChange(0);
  };

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <Button
            variant="contained"
            size="small"
            onClick={handleAdd}
            endIcon={<AddIcon />}
          >
            Add Player
          </Button>
        }
      />
      {/* table */}
      <TableContainer>
        <Table sx={{ minWidth: 750 }} stickyHeader>
          <TableHead>
            <TableRow>
              {cols.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {col.label}
                </TableCell>
              ))}
              {actionMenu.length > 0 && (
                <TableCell key="action" align="center">
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow hover key={row[uniKey] as string}>
                  {cols.map((col) => {
                    return (
                      <TableCell align={col.align} key={col.id}>
                        {col.cellRender(row)}
                      </TableCell>
                    );
                  })}

                  {actionMenu.length > 0 && (
                    <TableCell align="center">
                      <ActionMenu actionMenu={actionMenu} row={row} />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            {data.length === 0 && (
              <TableRow
                style={{
                  height: 50,
                }}
              >
                <TableCell align="center" colSpan={cols.length}>
                  <Box sx={{ py: 5 }}>
                    {/* <FindInPageIcon fontSize="large" */}
                    <Typography variant="h4">Empty</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* table data */}
      {total > 0 && (
        <TablePagination
          rowsPerPageOptions={pageSizeArr}
          component="div"
          count={total}
          rowsPerPage={size}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"row-per-page"}
        />
      )}
    </Card>
  );
};
