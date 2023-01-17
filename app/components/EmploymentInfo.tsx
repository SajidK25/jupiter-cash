import React from "react";
import ReadonlyInput from "~/components/Form/ReadonlyInput";
import Grid from "@mui/material/Grid";
import { type ApplicationWithDetailsType } from "~/controllers/application.server";
import { capitalize } from "@mui/material";

type Props = {
  data: ApplicationWithDetailsType;
};
const EmploymentInfo = ({ data }: Props) => {
  const { owner } = data;
  return (
    <Grid
      container
      spacing={3}
      //sx={{ mb: 3 }}
    >
      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Company Name"
          variant="outlined"
          value={capitalize(owner.company_name)}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Company Location"
          variant="outlined"
          value={capitalize(owner.company_location)}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Company Phone"
          variant="outlined"
          value={owner.company_phone}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Monthly Income"
          variant="outlined"
          value={owner.monthly_income}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Designation"
          variant="outlined"
          value={capitalize(owner.designation)}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Company City"
          variant="outlined"
          value={capitalize(owner.company_city)}
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
          value={capitalize(owner.company_landmark)}
        />
      </Grid>
    </Grid>
  );
};

export default EmploymentInfo;
