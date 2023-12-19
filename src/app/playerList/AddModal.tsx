// third party
import { object, string, boolean } from "yup";
import { useFormik } from "formik";
import { PlayerAddReq } from "./types";
import { IField } from "@/common/form";

// project imports
// import { openSnackbar } from 'store/slices/snackbar'
// import { useDispatch } from 'store'
// import { ICreateMerchant, createMerchant } from 'apis/merchant'
// import FormModal from 'ui-component/formModal'
import FormModal from "@/common/formModal";
// import { IField } from 'ui-component/form'

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
  refreshList: () => void;
}

const validationSchema = object({
  name: string().trim().max(80).required(),
  shortName: string().trim().max(30).required(),
  loginUserName: string().trim().max(30).required(),
  isActive: boolean(),
  contactName: string().trim().max(100).required(),
  contactTel: string().trim().max(30).required(),
  contactEmail: string().trim().email(),
  remark: string().trim().max(1000),
});

// ==============================|| KANBAN BACKLOGS - ADD STORY ||============================== //

const AddModal = ({ open, handleDrawerClose, refreshList }: Props) => {
  // const dispatch = useDispatch()

  const formik = useFormik<PlayerAddReq>({
    initialValues: {
      name: "",
      shortName: "",
      isActive: true,
      loginUserName: "",
      contactName: "",
      contactTel: "",
      contactEmail: "",
      remark: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // const res = await createMerchant(values);
      // if (res.code === 0) {
      //   dispatch(
      //     openSnackbar({
      //       open: true,
      //       message: <FormattedMessage id="success" />,
      //       variant: "alert",
      //       alert: {
      //         color: "success",
      //       },
      //       close: false,
      //     })
      //   );
      //   handleDrawerClose();
      //   refreshList();
      // } else {
      //   // TODO: fix all type of snackbar
      //   dispatch(
      //     openSnackbar({
      //       open: true,
      //       message: <FormattedMessage id="fail" />,
      //       variant: "alert",
      //       alert: {
      //         color: "error",
      //       },
      //       close: true,
      //     })
      //   );
      // }
    },
  });
  const fields: IField[] = [
    {
      key: "name",
      type: "input",
    },
    {
      key: "shortName",
      type: "input",
    },
    {
      key: "loginUserName",
      type: "input",
    },
    {
      key: "contactName",
      type: "input",
    },
    {
      key: "contactTel",
      type: "input",
    },
    {
      key: "contactEmail",
      type: "input",
    },
    // {
    //     key: 'isActive',
    //     type: 'radio',
    //     option: [
    //         {
    //             label: 'Active',
    //             value: true,
    //         },
    //         { label: 'InActive', value: false },
    //     ],
    // },
    {
      key: "remark",
      type: "textarea",
    },
  ];
  return (
    <FormModal
      fields={fields}
      formik={formik}
      title={"add-merchant"}
      open={open}
      handleDrawerClose={handleDrawerClose}
    />
  );
};
export default AddModal;
