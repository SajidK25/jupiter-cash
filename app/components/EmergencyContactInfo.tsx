import React from "react";
import ReadonlyInput from "~/components/Form/ReadonlyInput";
import Grid from "@mui/material/Grid";
import { capitalize, Typography } from "@mui/material";
import { type ApplicationWithDetailsType } from "~/controllers/application.server";

type Props = {
  data: ApplicationWithDetailsType;
};
const EmergencyContactInfo = ({ data }: Props) => {
  const { owner } = data;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body2" fontFamily="Inter-Bold" fontWeight="bold">
          Family Member 1
        </Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Full Name"
          variant="outlined"
          value={capitalize(owner.fm1_fullname)}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={owner.fm1_phonenumber}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Relationship"
          variant="outlined"
          value={capitalize(owner.fmm1_relationship)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" fontFamily="Inter-Bold" fontWeight="bold">
          Family Member 2
        </Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Full Name"
          variant="outlined"
          value={capitalize(owner.fmm2_fullname)}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={owner.fmm2_phone_number}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Relationship"
          variant="outlined"
          value={capitalize(owner.fmm2_relationship)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" fontFamily="Inter-Bold" fontWeight="bold">
          Co-Worker
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Co-worker Fullname"
          variant="outlined"
          value={capitalize(owner.co_worker_fullname)}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Co-Worker Relationship"
          variant="outlined"
          value={capitalize(owner.co_worker_relationship)}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Co-worker Phone"
          variant="outlined"
          value={owner.co_worker_phone}
        />
      </Grid>
    </Grid>
  );
};

export default EmergencyContactInfo;
