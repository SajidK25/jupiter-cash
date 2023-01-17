import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useField } from "remix-validated-form";
import TextField from "@mui/material/TextField";
import { type SelectProps } from "@mui/material";

interface FormInputProps extends SelectProps {
  name: string;
  //label: string;
  options: OptionProps[];
  //styles?: {};
}

type OptionProps = {
  label: string;
  value: any;
};

export const FormInputDropdown = ({
  name,
  options,
  ...props
}: FormInputProps) => {
  const { getInputProps, error, defaultValue } = useField(name);

  /*React.useEffect(() => {
       setValue(defaultValue)
     }, [defaultValue]) */

  return (
    <TextField
      label={props.label}
      helperText={error ? <span style={{ color: "red" }}>{error}</span> : null}
      size="small"
      key={defaultValue}
      sx={props.sx}
      select
      {...getInputProps({ id: name })}
      variant="outlined"
    >
      {options.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
