import React from "react";
import ReadonlyInput from "~/components/Form/ReadonlyInput";
import Grid from "@mui/material/Grid";
import { capitalize } from "@mui/material";
import { type ApplicationWithDetailsType } from "~/controllers/application.server";
import { format } from "date-fns";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

type Props = {
  data: ApplicationWithDetailsType;
};

const PaymentInfo = ({ data }: Props) => {
  const { payment_status } = data;

  return (
    <Box sx={{ width: "100%" }}>
      {data.payments.map((payment) => (
        <Grid container spacing={5} key={payment.id} sx={{ mb: 3 }}>
          <Grid item md={4} xs={12}>
            <ReadonlyInput
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label="Payment Amount"
              variant="outlined"
              value={payment.amount}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <ReadonlyInput
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label="Payment Date"
              variant="outlined"
              value={format(new Date(payment.createdAt), "P")}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <Chip
              label={capitalize(payment_status)}
              color={payment_status == "OWEING" ? "error" : "success"}
              size="small"
              sx={{ ml: 2 }}
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default PaymentInfo;
