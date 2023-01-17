import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "~/styles/global.css";
import { Link, useLoaderData } from "@remix-run/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  deleteUser,
  getUsers,
  type RegisteredUsers,
} from "~/controllers/userController.server";
import UsersTable from "~/components/UsersTable";

const Users = () => {
  const data = useLoaderData<RegisteredUsers | []>();
  return (
    <Container fixed sx={{ flex: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Card sx={{ mb: 10, boxShadow: 5 }} variant="outlined">
            <Box display="flex" alignItems="center" p={2}>
              <Typography fontFamily="Inter-Bold" variant="h6">
                Registered Users
              </Typography>
              <Box flexGrow={1} />
              <Link
                to="/dashboard/home/"
                //prefetch="intent"
                style={{
                  alignSelf: "flex-end",
                  //marginBottom: 5,
                  textDecoration: "none",
                }}
              >
                <Button
                  //href="/dashboard/create"
                  variant="contained"
                  color="warning"
                  size="small"
                  sx={{ textTransform: "capitalize", mr: 2 }}
                >
                  Back to Dashboard
                </Button>
              </Link>
            </Box>

            <CardContent sx={{ borderTop: "1px solid lightgray" }}>
              {data.length ? (
                <UsersTable data={data as RegisteredUsers | []} />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <img
                    src="/404.png"
                    width={500}
                    height={500}
                    style={{ objectFit: "cover" }}
                    alt="GHC"
                    loading="lazy"
                  />
                </Box>
              )}
            </CardContent>
            <CardActions disableSpacing>
              <Box sx={{ flexGrow: 1 }} />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Users;
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
  return await getUsers();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  await deleteUser(id);
  return true;
};
