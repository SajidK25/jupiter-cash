import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import useNavStore from "~/lib/stores/navStore";

interface appProps {
  title: string;
  total: number;
  icon: JSX.Element;
  color: string;
}

const InfoCard = ({ title, total, icon, color }: appProps) => {
  const open = useNavStore((state) => state.open);
  return (
    <ButtonBase>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: color,
          justifyContent: "space-between",
          gap: open ? 2 : 7,
          alignItems: "center",
          p: 1,

          height: 130,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={1}
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
            {total}
          </Typography>
          <Typography align="center" fontSize={15} sx={{ color: "white" }}>
            {title}
          </Typography>
        </Box>

        <Box alignItems="center">{icon}</Box>
      </Paper>
    </ButtonBase>
  );
};

export default InfoCard;
