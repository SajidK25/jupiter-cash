/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import FormInputText from "~/components/Form/FormInputText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ValidatedForm } from "remix-validated-form";
import { userEmergencyContactValidator } from "~/lib/Validators";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { type loader } from "~/routes/dashboard/users/$userId";
import SubmitButton from "./Form/SubmitButton";
import { useSnackbar } from "notistack";

const EditContactInfo = () => {
  const {
    fm1_fullname,
    fm1_phonenumber,
    fmm1_relationship,
    fmm2_fullname,
    fmm2_phone_number,
    fmm2_relationship,
    co_worker_fullname,
    co_worker_phone,
    co_worker_relationship,
  } = useLoaderData<typeof loader>();
  const contactDetails = useFetcher();
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (contactDetails.type === "done") {
      enqueueSnackbar("Emergency contact details updated successfully..", {
        preventDuplicate: true,
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
        variant: "success",
      });
    }
  }, [contactDetails.type]);

  return (
    <ValidatedForm
      subaction="contactInfo"
      fetcher={contactDetails}
      defaultValues={{
        fm1_fullname,
        fm1_phonenumber,
        fmm1_relationship,
        fmm2_fullname,
        fmm2_phone_number,
        fmm2_relationship,
        co_worker_fullname,
        co_worker_phone,
        co_worker_relationship,
      }}
      validator={userEmergencyContactValidator}
      method="patch"
      onSubmit={async (data) => {
        contactDetails.submit({ ...data });
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body2" fontFamily="Inter-Bold" fontWeight="bold">
            Family Member 1
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Full Name"
            variant="outlined"
            name="fm1_fullname"
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Phone Number"
            variant="outlined"
            name="fm1_phonenumber"
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Relationship"
            variant="outlined"
            name="fmm1_relationship"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" fontFamily="Inter-Bold" fontWeight="bold">
            Family Member 2
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Full Name"
            variant="outlined"
            name="fmm2_fullname"
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Phone Number"
            variant="outlined"
            name="fmm2_phone_number"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Relationship"
            variant="outlined"
            name="fmm2_relationship"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" fontFamily="Inter-Bold" fontWeight="bold">
            Co-Worker
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Co-worker Fullname"
            variant="outlined"
            name="co_worker_fullname"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Co-Worker Relationship"
            variant="outlined"
            name="co_worker_relationship"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Co-worker Phone"
            variant="outlined"
            name="co_worker_phone"
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
            <SubmitButton title="Update Contact Info" />
          </Grid>
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

export default EditContactInfo;
