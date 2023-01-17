import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button, { type ButtonProps } from "@mui/material/Button";
import { useIsSubmitting } from "remix-validated-form";

interface AppProps extends ButtonProps {
  formId?: string;
  title: string;
}

export default function SubmitButton({
  title,

  ...props
}: AppProps) {
  const isSubmitting = useIsSubmitting();

  return (
    <Button
      type="submit"
      name="button"
      size="small"
      variant="contained"
      color="primary"
      {...props}
    >
      {isSubmitting ? <CircularProgress color="inherit" size={20} /> : title}
    </Button>
  );
}

//export default SubmitButton;
