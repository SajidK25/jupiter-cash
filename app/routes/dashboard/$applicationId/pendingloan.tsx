import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Link, useFetcher, useOutletContext } from "@remix-run/react";
import UserInfo from "~/components/UserInfo";
import EmploymentInfo from "~/components/EmploymentInfo";
import EmergencyContactInfo from "~/components/EmergencyContactInfo";
import {
  verifyApplication,
  type ApplicationWithDetailsType,
} from "~/controllers/application.server";
import Stack from "@mui/material/Stack";
import { redirect, type ActionFunction } from "@remix-run/node";
import { type Admin } from "@prisma/client";
//import { LoaderFunction } from "@remix-run/node";

const PendingApplication = () => {
  const { data, applicationId, admin } = useOutletContext<{
    applicationId: string;
    data: ApplicationWithDetailsType;
    admin: Omit<Admin, "password">;
  }>();
  const verifyFetcher = useFetcher();
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
              Loan Application Overview
            </Typography>
            <Chip label="Pending" color="warning" size="small" sx={{ ml: 2 }} />
            <Box flexGrow={1} />
            <Link
              to="/dashboard/pending"
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
            <UserInfo data={data} />
          </CardContent>
          <Box display="flex" alignItems="flex-end" pl={2}>
            <Typography variant="h6" fontFamily="Inter-Bold" fontWeight="bold">
              Applicant Employment Info
            </Typography>
          </Box>
          <CardContent sx={{ borderTop: "1px solid lightgray", mb: 4 }}>
            <EmploymentInfo data={data} />
          </CardContent>
          <Box display="flex" alignItems="flex-end" pl={2}>
            <Typography variant="h6" fontFamily="Inter-Bold" fontWeight="bold">
              Applicant Emergency Contact Info
            </Typography>
          </Box>
          <CardContent sx={{ borderTop: "1px solid lightgray", mb: 4 }}>
            <EmergencyContactInfo data={data} />
          </CardContent>
          <Box display="flex" alignItems="flex-end" pl={2}>
            <Typography variant="h6" fontFamily="Inter-Bold" fontWeight="bold">
              Image Verification Section
            </Typography>
          </Box>
          <CardContent sx={{ borderTop: "1px solid lightgray", mb: 2 }}>
            <Box display="flex" flexGrow={1}>
              <Stack direction="column" spacing={2}>
                {data.owner.loans.length > 1 && (
                  <img
                    src="/ghcard.jpeg" //{data.owner.loans[0]?.selfie_img} //"/ghcard.jpeg"
                    width={500}
                    height={300}
                    style={{ objectFit: "cover", marginRight: 50 }}
                    alt="GHC"
                    loading="lazy"
                  />
                )}

                <Typography fontFamily="Inter-Bold" align="center">
                  Permanent Seflie Image
                </Typography>
              </Stack>
              <Stack direction="column" spacing={2}>
                <img
                  src={data.selfie_img} //"/ghcard.jpeg"
                  width={500}
                  height={300}
                  style={{ objectFit: "cover", marginRight: 50 }}
                  alt="GHC"
                  loading="lazy"
                />
                <Typography fontFamily="Inter-Bold" align="center">
                  Dynamic Selfie Image
                </Typography>
              </Stack>
            </Box>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{ borderTop: "1px solid lightgray", py: 3 }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                color="success"
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  verifyFetcher.submit(
                    {
                      button: "verify",
                      Id: applicationId,
                      admin: admin.name,
                    },
                    {
                      method: "post",
                    }
                  );
                }}
              >
                {verifyFetcher.state === "loading" ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  " Verify Application"
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

export default PendingApplication;

export const action: ActionFunction = async ({ request, context }) => {
  let formData: FormData = await request.formData();
  const button = formData.get("button");
  const id = formData.get("Id") as string;
  const name = formData.get("admin") as string;
  if (button == "verify") {
    //verify the applicatoin
    await verifyApplication(id, name);
    return redirect(`/dashboard/${id}/approvedloan`);
  }
  if (button == "decline") {
    //verify the applicatoin
    // await verifyApplication(id);
    return redirect(`/dashboard/${id}/declinedloan`);
  }

  return null;
};
