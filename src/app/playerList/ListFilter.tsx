// third party
import { object, string } from "yup";
import { useFormik } from "formik";
import { PlayerListReq } from "./types";
import CommonForm, { IField } from "@/common/form";
import { TeamOptions } from "@/data/teamOptions";
import { Box } from "@mui/material";

// project imports
// import { PlayerListReq } from 'apis/merchant'
// import CommonForm, { IField } from 'ui-component/form'
// import MainCard from 'ui-component/cards/MainCard'

interface IProps {
  onAction: (values: PlayerListReq) => void;
}

const validationSchema = object({
  team: string().trim().max(80),
});

// ==============================|| KANBAN BACKLOGS - ADD STORY ||============================== //

const ListFilter = ({ onAction }: IProps) => {
  const formik = useFormik<PlayerListReq>({
    initialValues: {
      team: TeamOptions[0].value,
    },
    validationSchema,
    onSubmit: onAction,
  });
  const fields: IField<PlayerListReq>[] = [
    {
      key: "team",
      type: "select",
      option: TeamOptions,
    },
  ];
  return (
    <Box sx={{ py: 2 }}>
      <CommonForm<PlayerListReq>
        fields={fields}
        formik={formik}
        title=""
        gridValue={4}
      />
    </Box>
  );
};
export default ListFilter;
