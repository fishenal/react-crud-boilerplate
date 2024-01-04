// third party
import { object, string, number } from "yup";
import { useFormik } from "formik";
import { PlayerAddReq } from "./types";
import { IField } from "@/common/form";
import FormModal from "@/common/formModal";
import { addPlayer } from "./api/playersActions";
import { SnackBarContext } from "@/common/snackBarContext/snackBarContext";
import { useContext } from "react";
import { TeamOptions } from "@/data/teamOptions";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
  refreshList: () => void;
}

const validationSchema = object({
  position: string().trim().max(80).required(),
  birthDate: string().trim().max(80).required(),
  jerseyNum: number().max(1000).required(),
  name: string().trim().max(100).required(),
  picture: string().trim().max(100).required(),
  country: string().trim().max(100).required(),
  weight: number().max(250).required(),
  height: number().max(250).required(),
  age: number().max(120).required(),
});

const AddModal = ({ open, handleDrawerClose, refreshList }: Props) => {
  const { handleOpen: handleSnackbarOpen } = useContext(SnackBarContext);

  const formik = useFormik<PlayerAddReq>({
    initialValues: {
      position: "",
      birthDate: "",
      jerseyNum: 0,
      name: "",
      picture: "",
      weight: 0,
      height: 0,
      country: "",
      age: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      const params = {
        ...values,
        birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
      };
      const res = await addPlayer(params);
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
  const fields: IField[] = [
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
  return (
    <FormModal
      fields={fields}
      formik={formik}
      title={"Add Player"}
      open={open}
      buttonLabel="Add"
      handleDrawerClose={handleDrawerClose}
    />
  );
};
export default AddModal;
