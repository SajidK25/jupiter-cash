import React from "react";
import { type ApplicationWithDetailsType } from "~/controllers/application.server";
import Grid from "@mui/material/Grid";
import { capitalize } from "@mui/material";
import ReadonlyInput from "./Form/ReadonlyInput";

type Props = {
  data: ApplicationWithDetailsType;
};
const WalletInfo = ({ data }: Props) => {
  const { owner } = data;
  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Wallet Name"
          variant="outlined"
          value={capitalize(owner.wallet_name)}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Wallet Network"
          variant="outlined"
          value={capitalize(owner.wallet_network)}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Wallet Number"
          variant="outlined"
          value={owner.wallet_number}
        />
      </Grid>
    </Grid>
  );
};

export default WalletInfo;
