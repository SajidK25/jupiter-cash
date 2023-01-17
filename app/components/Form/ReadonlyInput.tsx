import TextField, { type TextFieldProps } from "@mui/material/TextField";
import React from "react";

const ReadonlyInput = ({
  defaultValue,
  value,
  name,
  label,
  sx,
  variant,
  error,
  type,

  ...props
}: TextFieldProps) => {
  return (
    <TextField
      sx={sx}
      error={error}
      label={label}
      inputProps={{ readOnly: true }}
      type={type ? type : "text"}
      value={value}
      // defaultValue={defaultValue}
      size="small"
      fullWidth
      variant={variant}
    />
  );
};

export default ReadonlyInput;
