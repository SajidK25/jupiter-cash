import TextField, { type TextFieldProps } from "@mui/material/TextField";
import React from "react";
import { useField } from "remix-validated-form";

//interface Props extends TextFieldProps
const FormInputText = ({
  name,
  label,
  sx,
  variant,
  type,
  ...props
}: TextFieldProps) => {
  const { error, getInputProps, defaultValue } = useField(name as string);

  return (
    <TextField
      sx={sx}
      label={label}
      type={type ? type : "text"}
      helperText={error ? <span style={{ color: "red" }}>{error}</span> : null}
      error={error ? true : false}
      key={defaultValue}
      size="small"
      {...getInputProps({ id: name })}
      fullWidth
      variant={variant}
    />
  );
};

export default FormInputText;
