// third party
import { object, string } from "yup";
import { useFormik } from "formik";
import { PlayerListReq } from "./types";
import CommonForm, { IField } from "@/common/form";

// project imports
// import { PlayerListReq } from 'apis/merchant'
// import CommonForm, { IField } from 'ui-component/form'
// import MainCard from 'ui-component/cards/MainCard'

interface IProps {
  onAction: (values: PlayerListReq) => void;
}

const validationSchema = object({
  name: string().trim().max(80),
  mchNo: string().trim().max(30),
});

// ==============================|| KANBAN BACKLOGS - ADD STORY ||============================== //

const ListFilter = ({ onAction }: IProps) => {
  const formik = useFormik<PlayerListReq>({
    initialValues: {
      name: "",
      mchNo: "",
    },
    validationSchema,
    onSubmit: onAction,
  });
  const fields: IField<PlayerListReq>[] = [
    {
      key: "name",
      type: "input",
    },
    {
      key: "mchNo",
      type: "input",
    },
  ];
  return (
    <div title="Filter">
      <CommonForm<PlayerListReq>
        fields={fields}
        formik={formik}
        title=""
        gridValue={4}
      />
    </div>
  );
};
export default ListFilter;
