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
} from "@mui/material";
// import FindInPageIcon from '@mui/icons-material/FindInPage'
// project imports
// assets

import { defaultPageSize, pageSizeArr } from "./pageConfig";
import { StyledTableCell, StyledTableRow } from "./CustomerTable";
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
    <Card
      content={false}
      title={title}
      secondary={
        <Tooltip title={"add-title"}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleAdd}
            // endIcon={<AddIcon />}
          >
            add
          </Button>
        </Tooltip>
      }
    >
      {/* table */}
      <TableContainer>
        <Table sx={{ minWidth: 750 }} stickyHeader>
          <TableHead>
            <StyledTableRow>
              {cols.map((col) => (
                <StyledTableCell
                  key={col.id}
                  align={col.align}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {col.label}
                </StyledTableCell>
              ))}
              {actionMenu.length > 0 && (
                <StyledTableCell key="action" align="center">
                  Action
                </StyledTableCell>
              )}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <StyledTableRow hover key={row[uniKey] as string}>
                  {cols.map((col) => {
                    return (
                      <StyledTableCell align={col.align} key={col.id}>
                        {col.cellRender(row)}
                      </StyledTableCell>
                    );
                  })}

                  {actionMenu.length > 0 && (
                    <StyledTableCell align="center">
                      <ActionMenu actionMenu={actionMenu} row={row} />
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              );
            })}
            {data.length === 0 && (
              <StyledTableRow
                style={{
                  height: 50,
                }}
              >
                <StyledTableCell align="center" colSpan={cols.length}>
                  <Box sx={{ py: 5 }}>
                    {/* <FindInPageIcon fontSize="large" */}
                    <Typography variant="h4">Empty</Typography>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
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
