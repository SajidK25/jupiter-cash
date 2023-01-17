import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import React from "react";
import Typography from "@mui/material/Typography";
import MoreVert from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";

const ActiveUsersCard = () => {
  return (
    <Paper
      square
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        flex: 1,
        pb: 2,
      }}
    >
      <Stack direction="row" p={2} justifyContent="space-between">
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Active users
        </Typography>
        <MoreVert sx={{ color: "gray" }} />
      </Stack>
      <Stack sx={{ backgroundColor: "#b3e5fc", mx: 3.2, py: 2, mb: 2 }}>
        <Typography align="center" variant="h4" fontWeight="bold">
          148
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" mx={3.2} pb={1}>
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "gray" }}>
          Active pages
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "gray" }}>
          Users
        </Typography>
      </Stack>
      <Divider />
      {Array.from({ length: 7 }, (_item, index) => (
        <Stack
          direction="row"
          justifyContent="space-between"
          key={index}
          sx={{ borderBottom: "1px solid lightgray", px: 3, py: 1 }}
        >
          <Typography flexWrap="wrap" variant="body2">
            /products/brand/mens-23
          </Typography>
          <Typography variant="body2">15</Typography>
        </Stack>
      ))}
    </Paper>
  );
};

export default ActiveUsersCard;
