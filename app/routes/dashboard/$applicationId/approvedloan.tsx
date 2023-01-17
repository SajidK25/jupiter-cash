import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Link, useFetcher, useOutletContext } from "@remix-run/react";
import {
  checkBalance,
  disburseApplication,
  type ApplicationWithDetailsType,
} from "~/controllers/application.server";
import Stack from "@mui/material/Stack";
import BaseLoanInfo from "~/components/BaseLoanInfo";
import WalletInfo from "~/components/WalletInfo";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import { type ActionFunction, redirect } from "@remix-run/node";

const ApprovedApplication = () => {
  const { data, applicationId } = useOutletContext<{
    applicationId: string;
    data: ApplicationWithDetailsType;
  }>();
  const { owner } = data;
  const disburseFetcher = useFetcher();
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
              Loan Application Summary
            </Typography>
            <Chip
              label="Approved"
              color="success"
              size="small"
              sx={{ ml: 2 }}
            />
            <Box flexGrow={1} />
            <Link
              to="/dashboard/approved"
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
            <BaseLoanInfo data={data} />
          </CardContent>
          <Box display="flex" alignItems="flex-end" pl={2}>
            <Typography variant="h6" fontFamily="Inter-Bold" fontWeight="bold">
              Applicant Wallet Info
            </Typography>
          </Box>
          <CardContent sx={{ borderTop: "1px solid lightgray", mb: 4 }}>
            <WalletInfo data={data} />
          </CardContent>

          <CardActions
            disableSpacing
            sx={{ borderTop: "1px solid lightgray", py: 3 }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  const transactionData = new FormData();

                  transactionData.append("appId", applicationId);
                  transactionData.append(
                    "customer_number",
                    owner.wallet_number
                  );
                  transactionData.append("period", JSON.stringify(data.period));
                  transactionData.append("button", "disburse");
                  transactionData.append("amount", JSON.stringify(data.amount));
                  transactionData.append("exttrid", applicationId);
                  transactionData.append("reference", "Juniper Cash");
                  transactionData.append("nw", owner.wallet_network);
                  transactionData.append("trans_type", "MTC");
                  transactionData.append(
                    "callback_url",
                    `http://localhost:3000/dashboard/${applicationId}/approvedloan`
                  );
                  transactionData.append("service_id", JSON.stringify(40444)); // This is the id assigned to the service account by the payment gateway
                  transactionData.append(
                    "ts",
                    format(new Date(), "yyyy-MM-dd HH:mm:ss")
                  );

                  disburseFetcher.submit(transactionData, { method: "patch" });
                }}
              >
                {disburseFetcher.state === "loading" ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  " Disburse Loan"
                )}
              </Button>
              <Button
                variant="contained"
                color="warning"
                sx={{ textTransform: "capitalize" }}
              >
                Block Application
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ textTransform: "capitalize" }}
              >
                Decline Application
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ApprovedApplication;

export const action: ActionFunction = async ({ request, context }) => {
  let formData: FormData = await request.formData();
  const button = formData.get("button");
  const id = formData.get("appId") as string;
  const period = formData.get("period") as string;
  if (button == "disburse") {
    //make a request to the payment gateway
    //await checkBalance();

    //ON success
    await disburseApplication(id, Number(period));

    return redirect(`/dashboard/${id}/disbursedloan`);
  }
  if (button == "decline") {
    //verify the applicatoin
    // await verifyApplication(id);
    return redirect(`/dashboard/${id}/declinedloan`);
  }

  return null;
};
