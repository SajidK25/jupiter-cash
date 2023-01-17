/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
//import { json, LoaderFunction } from "@remix-run/node";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "@remix-run/react";
import EditUserInfo from "./EditUserInfo";
import EditEmploymentInfo from "./EditEmployment";
import EditContactInfo from "./EditContactInfo";
import EditWalletInfo from "./EditWalletInfo";

const EditDetails = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Card sx={{ mb: 10, boxShadow: 5 }} variant="outlined">
            <Box display="flex" alignItems="center" p={2}>
              <Box flexGrow={1} />
              <Link
                to="/dashboard/users/home"
                //prefetch="intent"
                style={{
                  alignSelf: "flex-end",
                  //marginBottom: 5,
                  textDecoration: "none",
                }}
              >
                <Button
                  //href="/dashboard/create"
                  color="warning"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "capitalize", mr: 2 }}
                >
                  Back to Applications
                </Button>
              </Link>
            </Box>

            <CardContent sx={{ borderTop: "1px solid lightgray" }}>
              <EditUserInfo />
            </CardContent>
            <Box display="flex" alignItems="flex-end" pl={2}>
              <Typography
                variant="h6"
                fontFamily="Inter-Bold"
                fontWeight="bold"
              >
                Applicant Employment Section
              </Typography>
            </Box>
            <CardContent sx={{ borderTop: "1px solid lightgray", mb: 2 }}>
              <EditEmploymentInfo />
            </CardContent>
            <Box display="flex" alignItems="flex-end" pl={2}>
              <Typography
                variant="h6"
                fontFamily="Inter-Bold"
                fontWeight="bold"
              >
                Applicant Emergency Contact Info
              </Typography>
            </Box>
            <CardContent sx={{ borderTop: "1px solid lightgray" }}>
              <EditContactInfo />
            </CardContent>
            <Box display="flex" alignItems="flex-end" pl={2}>
              <Typography
                variant="h6"
                fontFamily="Inter-Bold"
                fontWeight="bold"
              >
                Applicant Wallet Information
              </Typography>
            </Box>
            <CardContent sx={{ borderTop: "1px solid lightgray", mb: 2 }}>
              <EditWalletInfo />
            </CardContent>
            <CardActions disableSpacing>
              <Box sx={{ flexGrow: 1 }} />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default EditDetails;
