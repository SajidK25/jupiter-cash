/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import FormInputText from "~/components/Form/FormInputText";
import Grid from "@mui/material/Grid";
//import { capitalize } from "@mui/material";
import { userEmploymentValidator } from "~/lib/Validators";
import { ValidatedForm } from "remix-validated-form";
import { useFetcher, useLoaderData } from "@remix-run/react";
import SubmitButton from "./Form/SubmitButton";
import { type RegisteredUser } from "~/controllers/userController.server";
import { useSnackbar } from "notistack";

const EditEmploymentInfo = () => {
  const {
    company_name,
    company_phone,
    company_location,
    company_city,
    company_landmark,
    monthly_income,
    designation,
  } = useLoaderData<RegisteredUser>();
  const fetcher = useFetcher();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (fetcher.type === "done") {
      enqueueSnackbar("Employment details updated successfully..", {
        preventDuplicate: true,
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "success",
      });
    }
  }, [fetcher.type]);
  return (
    <ValidatedForm
      subaction="employmentInfo"
      fetcher={fetcher}
      method="patch"
      defaultValues={{
        company_name,
        company_phone,
        company_location,
        company_city,
        company_landmark,
        monthly_income,
        designation,
      }}
      validator={userEmploymentValidator}
      onSubmit={async (data) => {
        fetcher.submit({ ...data });
      }}
    >
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            name="company_name"
            fullWidth
            label="Company Name"
            variant="outlined"
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            name="company_location"
            label="Company Location"
            variant="outlined"
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Company Phone"
            variant="outlined"
            name="company_phone"
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Monthly Income"
            variant="outlined"
            name="monthly_income"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Designation"
            variant="outlined"
            name="designation"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Company City"
            variant="outlined"
            name="company_city"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Landmark"
            variant="outlined"
            name="company_landmark"
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={12}
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <Grid item>
            <SubmitButton title="Update Employment Info" />
          </Grid>
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

export default EditEmploymentInfo;
