import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import type { LoaderFunction } from "@remix-run/node";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "~/styles/global.css";
import { Link, useLoaderData } from "@remix-run/react";
import { getPendingApplications } from "~/controllers/application.server";
import { type DataTableProps } from "~/src/Types";
import DataTable from "~/components/DataTable";

const PendingRoute = () => {
  const data = useLoaderData<DataTableProps>();
  const total =
    data.length &&
    data.map((item) => Number(item.amount)).reduce((a, b) => a + b);
  const totalDue =
    data.length &&
    data.map((item) => Number(item.total_amount)).reduce((a, b) => a + b);
  return (
    <Container fixed sx={{ flex: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Card sx={{ mb: 10, boxShadow: 5 }} variant="outlined">
            <Box display="flex" alignItems="center" p={2}>
              <Typography fontFamily="Inter-Bold" variant="h6">
                Pending Loan Applications
              </Typography>
              <Typography
                sx={{ ml: 14 }}
                fontFamily="Inter-Bold"
                variant="body1"
              >
                Total : Gh₵ {total.toFixed(2)}
              </Typography>
              <Typography
                sx={{ ml: 4 }}
                fontFamily="Inter-Bold"
                variant="body1"
              >
                Total : Gh₵ {totalDue.toFixed(2)}
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
                  color="warning"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "capitalize", mr: 2 }}
                >
                  Back to Dashboard
                </Button>
              </Link>
            </Box>

            <CardContent sx={{ borderTop: "1px solid lightgray" }}>
              {data.length ? (
                <DataTable data={data as DataTableProps[] | []} />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <img
                    src="/404.png"
                    width={400}
                    height={400}
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

export default PendingRoute;
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
  return await getPendingApplications();
};
