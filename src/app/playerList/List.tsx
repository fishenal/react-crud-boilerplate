// material-ui
// import {
//   IMerchantInfoParams,
//   IMerchantItem,
//   deleteMerchant,
//   getMerchantList,
// } from "apis/merchant";
import { useEffect, useState } from "react";
// import { useDispatch } from "store";
// project imports
// import { openSnackbar } from "store/slices/snackbar";
// import { DataTable, IColsItem } from "ui-component/table";
import AlertDelete from "./AlertDelete";
import AddModal from "./AddModal";
// import { FormattedMessage } from "react-intl";
// import { fixDateString } from "utils/utils";
import { IconButton, Tooltip } from "@mui/material";

import EditModal from "./EditModal";
// import DetailDrawer from "../../ui-component/detailDrawer/DetailDrawer";
// import { useNavigate } from "react-router-dom";
import ListFilter from "./ListFilter";
import { PlayerItem, PlayerListReq } from "./types";
import { DataTable, IColsItem } from "@/common/table";
import { defaultPageSize } from "@/common/table/pageConfig";
import { IActionMenu } from "@/common/table/ActionMenu";
// import { defaultPageSize } from "ui-component/table/pageConfig";
// import { IActionMenu } from "ui-component/table/ActionMenu";

const headCells: IColsItem<PlayerItem>[] = [
  {
    id: "mchNo",
    label: "merchant-no",
    align: "left",
    cellRender: (row) => {
      return row.name;
    },
  },
  {
    id: "name",
    label: "merchant-name",
    align: "left",
    cellRender: (row) => {
      return `${row.name}`;
    },
  },
  // {
  //     id: 'status',
  //     label: status",
  //     cellRender: (row) => {
  //         return row.isActive ? (
  //             is-active"
  //         ) : (
  //             not-active"
  //         )
  //     },
  // },
];
const PlayerList = () => {
  const [data, setData] = useState<PlayerItem[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAddDrawer, setOpenAddDrawer] = useState<boolean>(false);
  const [openDetailDrawer, setOpenDetailDrawer] = useState<boolean>(false);
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
  const [focusItem, setFocusItem] = useState<PlayerItem | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(defaultPageSize);
  const [total, setTotal] = useState(0);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    fetchListData();
  }, [page, size]);

  const fetchListData = async () => {
    // const res = await getPlayerList({
    //   page,
    //   size,
    // });
    // setData(res.data.results);
    // setTotal(res.data.count);
  };

  const deleteItem = async () => {
    // if (focusItem?.mchNo) {
    // const res = await deleteMerchant({
    //   mchNo: focusItem.mchNo,
    // });
    // setOpenModal(false);
    // if (res && res.code === 0) {
    // dispatch(
    //   openSnackbar({
    //     open: true,
    //     message: success",
    //     variant: "alert",
    //     alert: {
    //       color: "success",
    //     },
    //     close: false,
    //   })
    // );
    // fetchListData();
    //} else {
    // dispatch(
    //   openSnackbar({
    //     open: true,
    //     message: fail",
    //     variant: "alert",
    //     alert: {
    //       color: "error",
    //     },
    //     close: true,
    //   })
    // );
    // }
    // }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleDelete = (row: PlayerItem) => {
    setFocusItem(row);
    setOpenModal(true);
  };
  const handleAdd = () => {
    setOpenAddDrawer(true);
  };
  const handleEdit = (row: PlayerItem) => {
    setFocusItem(row);
    setOpenEditDrawer(true);
  };

  const handleDetail = (row: PlayerItem) => {
    setFocusItem(row);
    setOpenDetailDrawer(true);
  };

  const handleFilterAction = async (values: PlayerListReq) => {
    setPage(0);
    setSize(5);
    // const fixFilterValues: IMerchantInfoParams = Object.fromEntries(
    //   Object.entries(values).filter(([_, v]) => v !== "")
    // );

    // const res = await getPlayerList({
    //   page,
    //   size,
    //   ...fixFilterValues,
    // });
    // setData(res.data.results);
    // setTotal(res.data.count);
  };

  const actionMenu: IActionMenu[] = [
    {
      label: "delete",
      action: handleDelete,
    },
    {
      label: "edit",
      action: handleEdit,
    },
    {
      label: "detail",
      action: handleDetail,
    },
    {
      label: "merchant-app-list",
      action: (row) => {
        // navigate(`/app/list/${row.mchNo}`);
      },
    },
  ];

  return (
    <>
      <ListFilter onAction={handleFilterAction} />
      <DataTable<PlayerItem>
        data={data}
        cols={headCells}
        uniKey="mchNo"
        title={"merchant-list"}
        handleAdd={handleAdd}
        actionMenu={actionMenu}
        page={page}
        size={size}
        total={total}
        onPageChange={(page) => {
          setPage(page);
        }}
        onSizeChange={(size) => {
          setSize(size);
        }}
      />
      {openModal && (
        <AlertDelete
          title={focusItem && focusItem.name}
          open={openModal}
          handleClose={handleModalClose}
          deleteAction={deleteItem}
        />
      )}
      <AddModal
        open={openAddDrawer}
        handleDrawerClose={() => {
          setOpenAddDrawer(false);
        }}
        refreshList={fetchListData}
      />
      <EditModal
        open={openEditDrawer}
        handleDrawerClose={() => {
          setOpenEditDrawer(false);
        }}
        refreshList={fetchListData}
        item={focusItem}
      />
      {/* <DetailDrawer<PlayerItem>
        open={openDetailDrawer}
        handleClose={() => {
          setOpenDetailDrawer(false);
        }}
        item={focusItem}
      /> */}
    </>
  );
};

export default PlayerList;
