import React from "react";
import ReadonlyInput from "~/components/Form/ReadonlyInput";
import Grid from "@mui/material/Grid";
import { format } from "date-fns";
import { type ApplicationWithDetailsType } from "~/controllers/application.server";
import { capitalize } from "@mui/material";

type Props = {
  data: ApplicationWithDetailsType;
};
const UserInfo = ({ data }: Props) => {
  const { owner } = data;
  return (
    <Grid
      container
      spacing={3}
      //sx={{ mb: 3 }}
    >
      <Grid item xs={12}></Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={capitalize(owner.first_name)}
          label="First Name"
          variant="outlined"
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Last Name"
          variant="outlined"
          value={capitalize(owner.last_name)}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Personal Contact1"
          variant="outlined"
          value={owner.personal_phone1}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Personal Contact2"
          variant="outlined"
          value={owner.personal_phone2}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Email"
          variant="outlined"
          value={capitalize(owner.email)}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          label="Date of Birth"
          name="dob"
          defaultValue={format(new Date(owner.dob), "P")}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="GH Card Number"
          variant="outlined"
          value={owner.ghcard_number}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Education"
          variant="outlined"
          value={capitalize(owner.education)}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Residential Address"
          variant="outlined"
          value={capitalize(owner.residential_address)}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          disabled
          label="City"
          variant="outlined"
          value={capitalize(owner.city)}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Landmark"
          variant="outlined"
          value={capitalize(owner.landmark)}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Area"
          variant="outlined"
          value={capitalize(owner.area)}
        />
      </Grid>
      <Grid item xs={2}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Marital Status"
          variant="outlined"
          defaultValue={capitalize(owner.marital_status)}
        />
      </Grid>
      <Grid item xs={1}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value="Male"
          label="Gender"
          variant="outlined"
          defaultValue={capitalize(owner.gender)}
        />
      </Grid>
      <Grid item xs={12}>
        <img
          src="/ghcard.jpeg"
          width={700}
          height={350}
          style={{ objectFit: "cover", marginRight: 50 }}
          alt="GHC"
          loading="lazy"
        />
      </Grid>
    </Grid>
  );
};

export default UserInfo;
