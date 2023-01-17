import React from "react";
//import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { type ApplicationWithDetailsType } from "~/controllers/application.server";
import { format } from "date-fns";
import ReadonlyInput from "./Form/ReadonlyInput";
import { capitalize } from "@mui/material";

type Props = {
  data: ApplicationWithDetailsType;
};
const BaseLoanInfo = ({ data }: Props) => {
  const { owner, amount, period, approved_by, approved_on } = data;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}></Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="First Name"
          variant="outlined"
          value={capitalize(owner.first_name)}
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

      <Grid item md={4} xs={12}>
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

      <Grid item md={2} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Personal Contact2"
          variant="outlined"
          value={capitalize(owner.personal_phone2 as string)}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Loan Amount"
          variant="outlined"
          value={amount}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Loan Period"
          variant="outlined"
          value={period}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Approved By"
          variant="outlined"
          value={capitalize(approved_by as string)}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Approved On"
          variant="outlined"
          value={format(new Date(approved_on as Date), "P")}
        />
      </Grid>
    </Grid>
  );
};

export default BaseLoanInfo;
