import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import InfoCard from "~/components/InfoCard";
//import ActiveUsersCard from "~/components/ActiveUsersCard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import Grid from "@mui/material/Grid"; // Grid version 2
import Box from "@mui/material/Box"; // Grid version 2
import Container from "@mui/material/Container";
import styles from "~/styles/global.css";
import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { type Admin } from "@prisma/client";
import {
  type ApplicationStatusType,
  getAllApplications,
} from "~/controllers/application.server";
import { type LoaderFunction } from "@remix-run/node";
import CssBaseline from "@mui/material/CssBaseline";

const Home = () => {
  const [greeting, setGreeting] = React.useState("");
  const { name } = useOutletContext<Admin>();

  React.useMemo(() => {
    const getTimeOfDay = () => {
      let myDate = new Date();
      const hrs = myDate.getHours();

      if (hrs < 12) setGreeting("Good Morning");
      else if (hrs >= 12 && hrs <= 17) setGreeting("Good Afternoon");
      else if (hrs >= 17 && hrs <= 24) setGreeting("Good Evening");
    };
    getTimeOfDay();
  }, []);
  const data = useLoaderData<ApplicationStatusType>();
  const pending =
    data &&
    data.filter(({ application_status }) => application_status === "PENDING")
      .length;
  const approved =
    data &&
    data.filter(({ application_status }) => application_status === "APPROVED")
      .length;
  const disbursed =
    data &&
    data.filter(({ application_status }) => application_status === "DISBURSED")
      .length;
  const rejected =
    data &&
    data.filter(({ application_status }) => application_status === "DECLINED")
      .length;
  return (
    <>
      <Stack
        width="100%"
        display="flex"
        mb={3}
        alignItems="flex-start"
        direction="column"
      >
        <Box display="flex">
          <Typography
            fontFamily="Inter-ExtraLight"
            variant="h3"
            color="#616161"
          >
            {greeting}
          </Typography>
          <Typography sx={{ alignSelf: "flex-end", mb: 1, fontSize: 25 }}>
            ,
          </Typography>
          <Typography
            fontSize={40}
            fontFamily="Inter-Regular"
            //fontWeight="bold"
          >
            {name}
          </Typography>
        </Box>
        <Typography variant="body1" fontFamily="Inter-Regular">
          Your Performance Metrices this week
        </Typography>
      </Stack>
      <Grid container spacing={1}>
        <Grid xs={3} item>
          <Link
            to="/dashboard/pending"
            prefetch="render"
            style={{ textDecoration: "none" }}
          >
            <InfoCard
              title="Pending Requests"
              total={pending}
              icon={<PendingActionsIcon sx={{ fontSize: 90, color: "gray" }} />}
              color="#00bfa5"
            />
          </Link>
        </Grid>
        <Grid xs={3} item>
          <Link
            to="/dashboard/approved"
            prefetch="render"
            style={{ textDecoration: "none" }}
          >
            <InfoCard
              title="Approved Requests"
              total={approved}
              icon={<FactCheckIcon sx={{ fontSize: 85, color: "gray" }} />}
              color="#4caf50"
            />
          </Link>
        </Grid>
        <Grid xs={3} item>
          <Link
            to="/dashboard/disbursed"
            prefetch="render"
            style={{ textDecoration: "none" }}
          >
            <InfoCard
              title="Disbursed  Requests"
              total={disbursed}
              icon={<LocalAtmIcon sx={{ fontSize: 85, color: "gray" }} />}
              color="#ffc400"
            />
          </Link>
        </Grid>
        <Grid xs={3} flex={1} item>
          <Link
            to="/dashboard/rejected"
            prefetch="render"
            style={{ textDecoration: "none" }}
          >
            <InfoCard
              title="Rejected Requests"
              total={rejected}
              icon={
                <CommentsDisabledIcon sx={{ fontSize: 85, color: "gray" }} />
              }
              color="#ff3d00"
            />
          </Link>
        </Grid>
      </Grid>
      <Container
        maxWidth="xl"
        sx={{ mt: 4, pr: 3, alignItems: "center", display: "flex" }}
        disableGutters
      >
        <Outlet />
      </Container>
    </>
  );
};

export default Home;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request, context }) => {
  return await getAllApplications();
};
