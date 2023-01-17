import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import MoreVert from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Button from "@mui/material/Button";
import { type RepaymentsDueType } from "~/controllers/application.server";
import { format } from "date-fns";
import { Link } from "@remix-run/react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e0e0e0", //theme.palette.common.black,
    color: theme.palette.common.black,
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type AppProps = {
  data: RepaymentsDueType;
};
export default function DueLoans({ data }: AppProps) {
  // console.log(data);
  return (
    <TableContainer component={Paper} elevation={2} sx={{ p: 2 }}>
      <Stack
        direction="row"
        p={2}
        //justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h6"
          fontFamily="Inter-Thin"
          fontWeight="bold"
          //sx={{ fontWeight: "bold" }}
        >
          Repayments Due This Week
        </Typography>
        <NotificationsActiveIcon
          sx={{ fontSize: 33, ml: 1, alignSelf: "flex-start" }}
        />
        <MoreVert sx={{ color: "gray", ml: "auto" }} />
      </Stack>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Applicant Name</StyledTableCell>
            <StyledTableCell align="center">Repayment Date</StyledTableCell>
            <StyledTableCell align="center">Amount Due</StyledTableCell>
            <StyledTableCell align="center">Contact Number</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.owner.first_name} {item.owner.last_name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {format(new Date(item.repayment_date as Date), "PP")}
              </StyledTableCell>
              <StyledTableCell align="center">
                {Number(item.total_amount)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.owner.personal_phone1}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  size="small"
                  component={Link}
                  variant="contained"
                  prefetch="render"
                  to={`/dashboard/${item.id}/disbursedloan`}
                >
                  View Details
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
