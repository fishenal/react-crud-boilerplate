// third party
import { object, string, boolean } from "yup";
import { useFormik } from "formik";

// project imports
// import { openSnackbar } from 'store/slices/snackbar'
// import { useDispatch } from 'store'
// import { IEditMerchant, IMerchantItem, editMerchant } from 'apis/merchant'
// import FormModal from 'ui-component/formModal'
import { useMemo } from "react";
import { PlayerEditReq, PlayerItemWithID } from "./types";
import { IField } from "@/common/form";
import FormModal from "@/common/formModal";
// import { IField } from 'ui-component/form'

interface IProps {
  open: boolean;
  item: PlayerItemWithID;
  handleDrawerClose: () => void;
  refreshList: () => void;
}

const validationSchema = object({
  name: string().trim().max(80).required(),
  shortName: string().trim().max(30).required(),
  isActive: boolean(),
  contactName: string().trim().max(100).required(),
  contactTel: string().trim().max(30).required(),
  contactEmail: string().trim().email(),
  remark: string().trim().max(1000),
});

// ==============================|| KANBAN BACKLOGS - ADD STORY ||============================== //

const EditModal = ({ open, handleDrawerClose, refreshList, item }: IProps) => {
  // const dispatch = useDispatch()
  const initialValues = useMemo(
    () => ({
      name: item?.name || "",
      shortName: item?.shortName || "",
      isActive: item?.isActive || true,
      contactName: item?.contactName || "",
      contactTel: item?.contactTel || "",
      contactEmail: item?.contactEmail || "",
      remark: item?.remark || "",
    }),
    [item]
  );
  const formik = useFormik<PlayerEditReq>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // if (item?.mchNo) {
      //     const res = await editMerchant(item.mchNo, values)
      //     if (res && res?.code === 0) {
      //         dispatch(
      //             openSnackbar({
      //                 open: true,
      //                 message: <FormattedMessage id="success" />,
      //                 variant: 'alert',
      //                 alert: {
      //                     color: 'success',
      //                 },
      //                 close: false,
      //             })
      //         )
      //         handleDrawerClose()
      //         refreshList()
      //     } else {
      //         // TODO: fix all type of snackbar
      //         dispatch(
      //             openSnackbar({
      //                 open: true,
      //                 message: <FormattedMessage id="fail" />,
      //                 variant: 'alert',
      //                 alert: {
      //                     color: 'error',
      //                 },
      //                 close: true,
      //             })
      //         )
      //     }
      // }
    },
  });
  const fields: IField[] = useMemo(() => {
    const fld: IField[] = [
      {
        key: "name",
        type: "input",
      },
      {
        key: "shortName",
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
      {
        key: "isActive",
        type: "radio",
        option: [
          {
            label: "Active",
            value: true,
          },
          { label: "InActive", value: false },
        ],
      },
      {
        key: "remark",
        type: "textarea",
      },
    ];

    return fld;
  }, []);

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
export default EditModal;
