import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Link, useFetcher, useOutletContext } from "@remix-run/react";
import {
  closeApplication,
  payLoan,
  type ApplicationWithDetailsType,
} from "~/controllers/application.server";
import DisbursementInfo from "~/components/DisbursementInfo";
import PaymentInfo from "~/components/PaymentInfo";
import CardActions from "@mui/material/CardActions";
import MakePayment from "~/components/MakePayment";
import { redirect, type ActionFunction } from "@remix-run/node";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

const DisbursedApplication = () => {
  const { data } = useOutletContext<{
    applicationId: string;
    data: ApplicationWithDetailsType;
  }>();
  const closeFetcher = useFetcher();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ mb: 10, boxShadow: 5 }} variant="outlined">
          <Box display="flex" alignItems="center" p={2}>
            <Typography
              variant="h6"
              //color="common.grey"
              //sx={{ color: "#424242" }}
              fontFamily="Inter-Bold"
              fontWeight="bold"
            >
              Loan Repayment Summary
            </Typography>
            <Chip
              label="Disbursed"
              color="secondary"
              size="small"
              sx={{ ml: 2 }}
            />
            <Box flexGrow={1} />
            <Link
              to="/dashboard/disbursed"
              prefetch="render"
              style={{
                alignSelf: "flex-end",
                //marginBottom: 5,
                textDecoration: "none",
              }}
            >
              <Button
                //href="/dashboard/create"
                //color="warning"
                variant="contained"
                size="small"
                sx={{ textTransform: "capitalize", mr: 2 }}
              >
                Back to Applications
              </Button>
            </Link>
          </Box>

          <CardContent sx={{ borderTop: "1px solid lightgray", mb: 4 }}>
            <DisbursementInfo data={data} />
          </CardContent>
          <Box display="flex" alignItems="flex-end" pl={2}>
            <Typography variant="h6" fontFamily="Inter-Bold" fontWeight="bold">
              Make Payment
              <Typography
                variant="caption"
                color="error"
                fontFamily="Inter-Regular"
                sx={{ ml: 2 }}
              >
                This is just for testing purpose. It would be removed once all
                tests have passed
              </Typography>
            </Typography>
          </Box>
          <CardContent sx={{ borderTop: "1px solid lightgray", mb: 4 }}>
            <MakePayment data={data} />
          </CardContent>
          <Box display="flex" alignItems="flex-end" pl={2}>
            <Typography variant="h6" fontFamily="Inter-Bold" fontWeight="bold">
              Payment History Details
            </Typography>
          </Box>
          <CardContent sx={{ borderTop: "1px solid lightgray", mb: 4 }}>
            {data.payments.length ? (
              <PaymentInfo data={data} />
            ) : (
              <Alert severity="info" variant="standard">
                <AlertTitle>Application Payment so far</AlertTitle>
                <Typography>
                  No payments recorded for this Application thus far..
                </Typography>
              </Alert>
            )}
          </CardContent>
          {data.payment_status === "PAID" && (
            <CardActions sx={{ borderTop: "1px solid lightgray", py: 3 }}>
              <Box flexGrow={1} />
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  const form = new FormData();
                  form.append("subaction", "close");
                  form.append("appId", data.id);
                  closeFetcher.submit(form, { method: "post" });
                }}
              >
                {closeFetcher.state === "loading" ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "  Close Application"
                )}
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default DisbursedApplication;

export const action: ActionFunction = async ({ request, context }) => {
  let formData: FormData = await request.formData();
  const id = formData.get("subaction") as string;
  const userId = formData.get("userId") as string;
  const amount = formData.get("amount") as string;
  const penalty = formData.get("penalty") as string;
  const rpdate = formData.get("rpdate") as string;
  const paidToday = formData.get("paidToday") as string;

  if (id == "close") {
    const appId = formData.get("appId") as string;
    await closeApplication(appId);
    return redirect("/dashboard/home");
  }
  let parsedBoolean = JSON.parse(paidToday);

  await payLoan(
    id,
    Number(amount),
    userId,
    rpdate,
    Number(penalty),
    parsedBoolean
  );
  return true;
};
