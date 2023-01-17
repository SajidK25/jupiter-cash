/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Grid from "@mui/material/Grid";
import { format } from "date-fns";
//import { Box, capitalize } from "@mui/material";
import FormInputText from "./Form/FormInputText";
import { ValidatedForm } from "remix-validated-form";
import { userInfoValidator } from "~/lib/Validators";
import { FormInputDropdown } from "./Form/FormInputDropdown";
import SubmitButton from "./Form/SubmitButton";
import { FormInputDate } from "./Form/FormInputDate";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { type RegisteredUser } from "~/controllers/userController.server";
import { useSnackbar } from "notistack";

const EditUserInfo = () => {
  const {
    first_name,
    last_name,
    personal_phone1,
    personal_phone2,
    email,
    dob,
    ghcard_number,
    education,
    city,
    area,
    landmark,
    marital_status,
    gender,
    residential_address,
  } = useLoaderData<RegisteredUser>();
  const editUserDetails = useFetcher();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (editUserDetails.type === "done") {
      enqueueSnackbar("User details updated successfully..", {
        preventDuplicate: true,
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "success",
      });
    }
  }, [editUserDetails.type]);

  //console.log(data);

  return (
    <ValidatedForm
      subaction="personalInfo"
      fetcher={editUserDetails}
      onSubmit={async (data) => {
        editUserDetails.submit({ ...data });
      }}
      method="patch"
      defaultValues={{
        first_name,
        residential_address,
        last_name,
        email,
        personal_phone1,
        personal_phone2,
        ghcard_number,
        education,
        city,
        area,
        landmark,
        marital_status,
        gender,
      }}
      validator={userInfoValidator}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            name="first_name"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            // value={capitalize(owner.first_name)}
            label="First Name"
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
            label="Last Name"
            name="last_name"
            variant="outlined"
            // value={capitalize(owner.last_name)}
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            name="personal_phone1"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Personal Contact1"
            variant="outlined"
            //value={owner.personal_phone1}
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Personal Contact2"
            name="personal_phone2"
            variant="outlined"
            //value={owner.personal_phone2}
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            //value={capitalize(owner.email)}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FormInputDate
            label="Date of Birth"
            name="dob"
            defaultValue={format(new Date(dob), "P")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="GH Card Number"
            variant="outlined"
            name="ghcard_number"
            // value={owner.ghcard_number}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Education"
            name="education"
            variant="outlined"
            // value={capitalize(owner.education)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Residential Address"
            name="residential_address"
            variant="outlined"
            //value={capitalize(owner.residential_address)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            disabled
            label="City"
            name="city"
            variant="outlined"
            // value={capitalize(owner.city)}
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
            name="landmark"
            variant="outlined"
            // value={capitalize(owner.landmark)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Area"
            name="area"
            variant="outlined"
            // value={capitalize(owner.area)}
          />
        </Grid>
        <Grid item xs={2}>
          <FormInputDropdown
            label="Marital Status"
            sx={{ width: "70%" }}
            name="marital_status"
            options={[
              { label: "Single", value: "Single" },
              { label: "Married", value: "Married" },
            ]}
          />
        </Grid>
        <Grid item xs={1}>
          <FormInputDropdown
            label="Gender"
            sx={{ mr: 1 }}
            name="gender"
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
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
            <SubmitButton title="Update User Info" />
          </Grid>
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

export default EditUserInfo;
