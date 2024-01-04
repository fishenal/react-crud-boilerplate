// third party
import { object, string, boolean } from "yup";
import { useFormik } from "formik";

// project imports
// import { openSnackbar } from 'store/slices/snackbar'
// import { useDispatch } from 'store'
// import { IEditMerchant, IMerchantItem, editMerchant } from 'apis/merchant'
// import FormModal from 'ui-component/formModal'
import { useContext, useMemo } from "react";
import { PlayerEditReq, PlayerItemWithID } from "./types";
import { IField } from "@/common/form";
import FormModal from "@/common/formModal";
import { validationSchema } from "./AddModal";
import { TeamOptions } from "@/data/teamOptions";
import dayjs from "dayjs";
import { editPlayer } from "./api/playersActions";
import { SnackBarContext } from "@/common/snackBarContext/snackBarContext";
// import { IField } from 'ui-component/form'

interface IProps {
  open: boolean;
  item: PlayerItemWithID;
  handleDrawerClose: () => void;
  refreshList: () => void;
}

const EditModal = ({ open, handleDrawerClose, refreshList, item }: IProps) => {
  const { handleOpen: handleSnackbarOpen } = useContext(SnackBarContext);
  const initialValues = useMemo(
    () => ({
      position: item.position,
      birthDate: dayjs(item.birthDate),
      jerseyNum: item.jerseyNum,
      name: item.name,
      picture: item.picture,
      weight: item.weight,
      height: item.height,
      country: item.country,
      age: item.age,
      id: item.id,
    }),
    [item]
  );
  const formik = useFormik<PlayerItemWithID>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const params = {
        ...values,
        birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
      };
      const res = await editPlayer(params);
      if (res.code === 0) {
        handleSnackbarOpen({
          message: "Add Success!",
          severity: "success",
        });
        handleDrawerClose();
        refreshList();
      } else {
        handleSnackbarOpen({
          message: "Add Failed!",
          severity: "error",
        });
      }
    },
  });
  const fields: IField[] = useMemo(() => {
    const fld: IField[] = [
      {
        key: "position",
        label: "Position",
        type: "input",
      },
      {
        key: "country",
        label: "Country",
        type: "select",
        option: TeamOptions,
      },
      {
        key: "birthDate",
        label: "BirthDate",
        type: "date",
      },
      {
        key: "jerseyNum",
        label: "Jersey Num.",
        type: "input",
      },
      {
        key: "name",
        label: "Name",
        type: "input",
      },
      {
        key: "picture",
        label: "Picture",
        type: "input",
      },
      {
        key: "weight",
        label: "Weight",
        type: "input",
      },
      {
        key: "height",
        label: "Height",
        type: "input",
      },
      {
        key: "age",
        label: "Age",
        type: "input",
      },
    ];

    return fld;
  }, []);
  if (!item) {
    return null;
  }
  return (
    <FormModal
      fields={fields}
      formik={formik}
      title="Edit Player"
      open={open}
      buttonLabel="Update"
      handleDrawerClose={handleDrawerClose}
    />
  );
};
export default EditModal;
