import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { useField } from "remix-validated-form";

type FormInputProps = {
  name: string;
  label: string;
  defaultValue?: string;
};
export const FormInputDate = ({
  name,
  label,
  defaultValue,
}: FormInputProps) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const { error, getInputProps } = useField(name);
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        inputFormat="MM/dd/yyyy"
        value={defaultValue ? defaultValue : value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={
              error ? <span style={{ color: "red" }}>{error}</span> : null
            }
            error={error ? true : false}
            size="small"
            {...getInputProps({ id: name })}
          />
        )}
      />
    </LocalizationProvider>
  );
};
