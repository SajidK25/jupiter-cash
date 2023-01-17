/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Grid from "@mui/material/Grid";
//import { capitalize } from "@mui/material";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { type loader } from "~/routes/dashboard/users/$userId";
import { ValidatedForm } from "remix-validated-form";
import { walletInfoValidator } from "~/lib/Validators";
import { FormInputDropdown } from "./Form/FormInputDropdown";
import FormInputText from "./Form/FormInputText";
import SubmitButton from "./Form/SubmitButton";
import { useSnackbar } from "notistack";

const EditWalletInfo = () => {
  const { wallet_network, wallet_number, wallet_name, otp } =
    useLoaderData<typeof loader>();
  const editWalletInfo = useFetcher();
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (editWalletInfo.type === "done") {
      enqueueSnackbar("Wallet or password details updated successfully..", {
        preventDuplicate: true,
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
        variant: "success",
      });
    }
  }, [editWalletInfo.type]);

  return (
    <ValidatedForm
      subaction="walletInfo"
      fetcher={editWalletInfo}
      onSubmit={async (data) => {
        editWalletInfo.submit({ ...data });
      }}
      method="patch"
      defaultValues={{
        wallet_network,
        wallet_number,
        wallet_name,
        otp,
      }}
      validator={walletInfoValidator}
    >
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Wallet Name"
            variant="outlined"
            name="wallet_name"
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <FormInputDropdown
            label="Mobile Wallet Network"
            sx={{ width: "70%" }}
            name="wallet_network"
            options={[
              { label: "Vodafone", value: "VOD" },
              { label: "MTN", value: "MTN" },
              { label: "AIRTEL-TIGO", value: "AIR" },
            ]}
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Wallet Number"
            variant="outlined"
            name="wallet_number"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FormInputText
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="User Personal Pin"
            variant="outlined"
            name="otp"
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
            <SubmitButton title="Update Account Info" />
          </Grid>
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

export default EditWalletInfo;
