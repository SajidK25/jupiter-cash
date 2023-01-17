import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MoreVert from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  //Title,
  Tooltip,
  //Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ///Title,
  Tooltip
  // Legend
);

export const options = {
  responsive: true,
  padding: 0,
  //type: "line",
  plugins: {
    // legend: { maxHeight: 700 },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      // label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#ffeb3b",
    },
  ],
};

const IncomeStats = () => {
  return (
    <Paper
      square
      sx={{
        p: 2,
        flex: 1,
        maxHeight: 500,
      }}
    >
      <Stack direction="row" p={2} justifyContent="space-between">
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Income Statistics
        </Typography>
        <MoreVert sx={{ color: "gray" }} />
      </Stack>
      <Bar options={options} data={data} />
    </Paper>
  );
};

export default IncomeStats;
