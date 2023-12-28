// material-ui
// import {
//   IMerchantInfoParams,
//   IMerchantItem,
//   deleteMerchant,
//   getMerchantList,
// } from "apis/merchant";
import { useCallback, useEffect, useState } from "react";
// import { useDispatch } from "store";
// project imports
// import { openSnackbar } from "store/slices/snackbar";
// import { DataTable, IColsItem } from "ui-component/table";
import AlertDelete from "./AlertDelete";
import AddModal from "./AddModal";
// import { FormattedMessage } from "react-intl";
// import { fixDateString } from "utils/utils";
import { Divider, IconButton, Tooltip } from "@mui/material";

import EditModal from "./EditModal";
// import DetailDrawer from "../../ui-component/detailDrawer/DetailDrawer";
// import { useNavigate } from "react-router-dom";
import ListFilter from "./ListFilter";
import { PlayerItemWithID, PlayerListReq, TeamName } from "./types";
import { DataTable, IColsItem } from "@/common/table";
import { defaultPageSize } from "@/common/table/pageConfig";
import { IActionMenu } from "@/common/table/ActionMenu";
import { deletePlayer, getPlayers } from "./api/playersActions";
import { TeamOptions } from "@/data/teamOptions";
import dayjs from "dayjs";
import DetailDrawer from "@/common/detailDrawer/DetailDrawer";
// import { defaultPageSize } from "ui-component/table/pageConfig";
// import { IActionMenu } from "ui-component/table/ActionMenu";

const headCells: IColsItem<PlayerItemWithID>[] = [
  {
    id: "country",
    label: "Country",
    align: "left",
    cellRender: (row) => {
      return row.country;
    },
  },
  {
    id: "name",
    label: "Name",
    align: "left",
    cellRender: (row) => {
      return row.name;
    },
  },
  {
    id: "position",
    label: "Position",
    align: "left",
    cellRender: (row) => {
      return `${row.position}`;
    },
  },
  {
    id: "jerseyNum",
    label: "Jersey Num",
    align: "left",
    cellRender: (row) => {
      return `${row.jerseyNum}`;
    },
  },
  {
    id: "birthDate",
    label: "Birth",
    align: "left",
    cellRender: (row) => {
      return dayjs(row.birthDate).format("YYYY-MM-DD");
    },
  },
  {
    id: "heightWeight",
    label: "Height/Weight",
    align: "left",
    cellRender: (row) => {
      return `${row.height}/${row.weight}`;
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
  const [data, setData] = useState<PlayerItemWithID[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAddDrawer, setOpenAddDrawer] = useState<boolean>(false);
  const [openDetailDrawer, setOpenDetailDrawer] = useState<boolean>(false);
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
  const [focusItem, setFocusItem] = useState<PlayerItemWithID | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(defaultPageSize);
  const [total, setTotal] = useState(0);
  const [team, setTeam] = useState<TeamName>(TeamOptions[0].value);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const fetchListData = useCallback(async () => {
    const res = await getPlayers({
      page: String(page),
      size: String(size),
      team,
    });
    if (res.status === 200) {
      setData(res.data);
      setTotal(res.total);
    }
  }, [page, size, team]);

  useEffect(() => {
    fetchListData();
  }, [page, size, team, fetchListData]);

  const deleteItem = async () => {
    if (focusItem?.id) {
      const res = await deletePlayer({
        id: focusItem.id,
      });
      setOpenModal(false);
      if (res && res.code === 0) {
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
        fetchListData();
      } else {
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
      }
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleDelete = (row: PlayerItemWithID) => {
    setFocusItem(row);
    setOpenModal(true);
  };
  const handleAdd = () => {
    setOpenAddDrawer(true);
  };
  const handleEdit = (row: PlayerItemWithID) => {
    setFocusItem(row);
    setOpenEditDrawer(true);
  };

  const handleDetail = (row: PlayerItemWithID) => {
    setFocusItem(row);
    setOpenDetailDrawer(true);
  };

  const handleFilterAction = async (values: PlayerListReq) => {
    setPage(0);
    setSize(defaultPageSize);
    setTeam(values.team);
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
      label: "Delete",
      action: handleDelete,
    },
    {
      label: "Edit",
      action: handleEdit,
    },
    {
      label: "Detail",
      action: handleDetail,
    },
    {
      label: "Open Avatar",
      action: (row) => {
        if (row.picture) {
          window.open(row.picture);
        }
      },
    },
  ];

  return (
    <>
      <ListFilter onAction={handleFilterAction} />
      <Divider />
      <DataTable<PlayerItemWithID>
        data={data}
        cols={headCells}
        uniKey="id"
        title={"Player List"}
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
      <DetailDrawer<PlayerItemWithID>
        open={openDetailDrawer}
        handleClose={() => {
          setOpenDetailDrawer(false);
        }}
        item={focusItem}
      />
    </>
  );
};

export default PlayerList;
