// material-ui
import {
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  FormLabel,
  Checkbox,
} from "@mui/material";
// project imports
import { ReactElement, ReactNode } from "react";
import { red } from "@mui/material/colors";
import { FormikProps } from "formik";
import { OptionObj, RangeDate, RangeNum } from "./types";
import { ComponentRangeNum } from "./RangeNum";
import { BootstrapInput } from "./BootstrapInput";
import { CustomerDatePicker } from "./CustomerDatePicker";
import { CustomerFormControl } from "./CustomerFormControl";
import { ComponentRangeDate } from "./RangeDate";

export interface IField<ItemInterface = { [key: string]: string }> {
  key: keyof ItemInterface;
  type:
    | "input"
    | "textarea"
    | "radio"
    | "date"
    | "attachment"
    | "select"
    | "mul-select"
    | "rangeNum"
    | "rangeDate";
  option?: OptionObj[];
  required?: boolean;
}

interface IProps<ItemInterface> {
  formik: FormikProps<ItemInterface>;
  fields: IField<ItemInterface>[];
  title: ReactNode;
  gridValue?: 4 | 6 | 12;
  submitErrorMsg?: string;
}

// ==============================|| KANBAN BACKLOGS - ADD STORY ||============================== //

const CommonForm: <ItemInterface = { [key: string]: string }>(
  props: IProps<ItemInterface>
) => ReactElement = ({
  formik,
  fields,
  title,
  gridValue = 12,
  submitErrorMsg,
}) => {
  const renderFormLabel = (stringLabelKey: string, nomb: boolean = false) => {
    return (
      <FormLabel htmlFor={stringLabelKey} sx={{ mb: nomb ? 0 : 1 }}>
        {stringLabelKey}
      </FormLabel>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {title && (
          <Grid item xs={12}>
            <Typography variant="h4">{title}</Typography>
          </Grid>
        )}
        {fields.map((item) => {
          const labelKey = item.key;
          const stringLabelKey = String(item.key);
          const error =
            formik.touched[labelKey] && Boolean(formik.errors[labelKey]);
          if (item.type === "input" || item.type === "textarea") {
            return (
              <Grid item xs={gridValue} key={stringLabelKey}>
                <CustomerFormControl
                  variant="standard"
                  required={item.required}
                  error={error}
                  fullWidth
                >
                  {renderFormLabel(stringLabelKey, true)}
                  <BootstrapInput
                    fullWidth
                    multiline={item.type === "textarea"}
                    value={formik.values[labelKey]}
                    onChange={formik.handleChange}
                    id={stringLabelKey}
                    required={item.required}
                    onBlur={formik.handleBlur}
                  />
                  <FormHelperText error={error}>
                    <>{error && formik.errors[labelKey]}</>
                  </FormHelperText>
                </CustomerFormControl>
              </Grid>
            );
          }
          if (item.type === "rangeNum") {
            return (
              <Grid item xs={gridValue} key={stringLabelKey}>
                <CustomerFormControl
                  variant="standard"
                  required={item.required}
                  error={error}
                  fullWidth
                >
                  {renderFormLabel(stringLabelKey)}
                  <ComponentRangeNum
                    value={formik.values[labelKey] as RangeNum}
                    onChange={(value) => {
                      formik.setFieldValue(stringLabelKey, value, true);
                    }}
                  />
                  <FormHelperText error={error}>
                    <>
                      {error &&
                        Object.values(
                          formik.errors[labelKey] as Record<string, string>
                        ).map((msg) => {
                          return <div key="msg">{msg}</div>;
                        })}
                    </>
                  </FormHelperText>
                </CustomerFormControl>
              </Grid>
            );
          }
          // if (item.type === 'rangeDate') {
          //     return (
          //         <Grid item xs={gridValue} key={stringLabelKey}>
          //             <CustomerFormControl
          //                 variant="standard"
          //                 required={item.required}
          //                 error={error}
          //                 fullWidth
          //             >
          //                 {renderFormLabel(stringLabelKey)}
          //                 <ComponentRangeDate
          //                     value={
          //                         formik.values[
          //                             labelKey
          //                         ] as RangeDate
          //                     }
          //                     onChange={(value) => {
          //                         const rangeDate = value

          //                         formik.setFieldValue(
          //                             stringLabelKey,
          //                             rangeDate,
          //                             true
          //                         )
          //                     }}
          //                 />
          //                 <FormHelperText error={error}>
          //                     <>
          //                         {error &&
          //                             formik.errors[labelKey]}
          //                     </>
          //                 </FormHelperText>
          //             </CustomerFormControl>
          //         </Grid>
          //     )
          // }
          // if (item.type === 'date') {
          //     return (
          //         <Grid item xs={gridValue} key={stringLabelKey}>
          //             <CustomerFormControl
          //                 variant="standard"
          //                 required={item.required}
          //                 error={error}
          //                 fullWidth
          //             >
          //                 {renderFormLabel(stringLabelKey)}
          //                 <CustomerDatePicker
          //                     reduceAnimations
          //                     value={formik.values[labelKey]}
          //                     format="yyyy-MM-dd"
          //                     onChange={(date) => {
          //                         formik.setFieldValue(
          //                             stringLabelKey,
          //                             date,
          //                             true
          //                         )
          //                     }}
          //                 />
          //                 <FormHelperText error={error}>
          //                     <>
          //                         {error &&
          //                             formik.errors[labelKey]}
          //                     </>
          //                 </FormHelperText>
          //             </CustomerFormControl>
          //         </Grid>
          //     )
          // }
          if (item.type === "select") {
            return (
              <Grid item xs={gridValue} key={stringLabelKey}>
                <CustomerFormControl
                  variant="standard"
                  required={item.required}
                  error={error}
                  fullWidth
                >
                  {renderFormLabel(stringLabelKey, true)}
                  <Select
                    labelId={stringLabelKey}
                    value={formik.values[labelKey]}
                    name={stringLabelKey}
                    onChange={formik.handleChange}
                    input={<BootstrapInput />}
                  >
                    <MenuItem value="">
                      <em>---</em>
                    </MenuItem>
                    {item.option &&
                      item.option.map((opt) => {
                        return (
                          <MenuItem value={String(opt.value)} key={opt.label}>
                            {opt.label}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText error={error}>
                    <>{error && formik.errors[labelKey]}</>
                  </FormHelperText>
                </CustomerFormControl>
              </Grid>
            );
          }
          if (item.type === "mul-select") {
            return (
              <Grid item xs={gridValue} key={stringLabelKey}>
                <CustomerFormControl
                  variant="standard"
                  required={item.required}
                  error={error}
                  fullWidth
                >
                  {renderFormLabel(stringLabelKey, true)}
                  <Select
                    labelId={stringLabelKey}
                    value={formik.values[labelKey]}
                    multiple
                    name={stringLabelKey}
                    onChange={formik.handleChange}
                    renderValue={(selected) =>
                      //@ts-ignore
                      selected.join(", ")
                    }
                    input={<BootstrapInput />}
                  >
                    {item.option &&
                      item.option.map((opt) => {
                        return (
                          <MenuItem value={String(opt.value)} key={opt.label}>
                            <Checkbox
                              checked={
                                formik.values[
                                  labelKey
                                  //@ts-ignore
                                ].indexOf(String(opt.value)) > -1
                              }
                            />
                            {opt.label}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText error={error}>
                    <>{error && formik.errors[labelKey]}</>
                  </FormHelperText>
                </CustomerFormControl>
              </Grid>
            );
          }
          return null;
        })}

        <Grid
          container
          sx={{
            gap: 2,
            justifyContent: "end",
            pt: 2,
            alignItems: "center",
          }}
        >
          {submitErrorMsg && (
            <Typography color={red[500]}>{submitErrorMsg}</Typography>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              formik.resetForm();
            }}
          >
            Reset
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default CommonForm;
