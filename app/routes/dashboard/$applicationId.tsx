import Container from "@mui/material/Container";
import React from "react";
import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { getAllDetails } from "~/controllers/application.server";
import { type LoaderFunction } from "@remix-run/node";
import { CssBaseline } from "@mui/material";
import styles from "~/styles/global.css";

const ApplicationDetails = () => {
  const data = useLoaderData();
  const { applicationId } = useParams();
  const admin = useOutletContext();
  return (
    <Container fixed sx={{ flex: 1 }}>
      <CssBaseline />
      <Outlet
        context={{ data: data, applicationId: applicationId, admin: admin }}
      />
    </Container>
  );
};
export default ApplicationDetails;
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export const loader: LoaderFunction = async ({ params }) => {
  const id = params.applicationId;
  //console.log(id);
  return await getAllDetails(id as string);
};
