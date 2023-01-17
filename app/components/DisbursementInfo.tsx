import React from "react";
//import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { type ApplicationWithDetailsType } from "~/controllers/application.server";
import { format, intervalToDuration, isFuture, startOfDay } from "date-fns";
import ReadonlyInput from "./Form/ReadonlyInput";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import AlertTitle from "@mui/material/AlertTitle";

type Props = {
  data: ApplicationWithDetailsType;
};

const DisbursementInfo = ({ data }: Props) => {
  let { days, hours, minutes } = intervalToDuration({
    start: startOfDay(new Date(data.repayment_date as Date)),
    end: new Date(),
  });

  const isDefaulted = (): boolean => {
    return isFuture(startOfDay(new Date(data.repayment_date as Date)))
      ? false
      : true;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {isDefaulted() && data.payment_status != "PAID" ? (
          <Alert severity="error" variant="filled">
            <AlertTitle>
              {days as number} Days, {hours} Hours, {minutes} Minutes past
              Repayment.
            </AlertTitle>
            <Typography>
              Application is in Default State. Applicant had made{" "}
              {data.payments.length} payments so far. Check the payments section
              for more details.
            </Typography>
          </Alert>
        ) : data.payment_status == "PAID" ? (
          <Alert severity="success" variant="filled">
            <AlertTitle>Loan has successfully been Repaid in full.</AlertTitle>
            <Typography>
              Application payment Status is "PAID" with no further areas.
              Applicantion can be successfully closed by Administrator.
            </Typography>
          </Alert>
        ) : (
          <Alert severity="info" variant="filled">
            <AlertTitle>
              {" "}
              {days as number} Days, {hours} Hours, {minutes} Minutes left to
              Repayment.
            </AlertTitle>
            <Typography>
              Application is in Disbursed State. Applicant had made{" "}
              {data.payments.length} payments so far. Check the payments section
              for more details.
            </Typography>
          </Alert>
        )}
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Requested Amount"
          variant="outlined"
          value={data.amount}
        />
      </Grid>

      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Requested Period"
          variant="outlined"
          value={data.period}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Calcualated Service Fee"
          variant="outlined"
          value={data.service_fee}
        />
      </Grid>

      <Grid item md={2} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Calculated Interest"
          variant="outlined"
          value={data.interest}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Disbursement Date"
          variant="outlined"
          value={format(new Date(data.disbursed_date as Date), "P")}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Repayment Date"
          variant="outlined"
          value={format(new Date(data.repayment_date as Date), "P")}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ReadonlyInput
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Total Amount Due"
          variant="outlined"
          value={data.total_amount}
        />
      </Grid>
      {/*isDefaulted() && data.payment_status != "PAID" && (
        <>
          <Grid item xs={12}>
            <Typography
              sx={{ color: "red", mt: 1 }}
              fontWeight="bold"
              fontFamily="Inter-ExtraLight"
            >
              Total Amount Due After {Math.abs(days)} Defaulted Days
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <ReadonlyInput
              size="small"
              error={true}
              //sx={{ border: "1px solid red" }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label="Total Amount Due"
              variant="outlined"
              value={
                isPaidToday() ? data.total_amount : Math.abs(penalty).toFixed(2)
              }
            />
          </Grid>
        </>
            )*/}
    </Grid>
  );
};

export default DisbursementInfo;
