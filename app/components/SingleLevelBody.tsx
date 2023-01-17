import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { type NavListProps } from "~/src/Nav";
import { Link } from "@remix-run/react";

interface appProps extends NavListProps {
  toggle: boolean;
}
const SingleLevelBody = ({ toggle, Icon, title }: appProps) => {
  return (
    <ListItemButton
      component={Link}
      to="/dashboard"
      sx={{
        justifyContent: toggle ? "initial" : "center",
        //width: "70%",
        justifySelf: "center",
        //borderRaduis: 4,
      }}
    >
      <ListItemIcon
        sx={{
          mr: toggle ? 2 : "auto",
        }}
      >
        {Icon}
      </ListItemIcon>
      <ListItemText primary={title} sx={{ opacity: toggle ? 1 : 0 }} />
    </ListItemButton>
  );
};

export default SingleLevelBody;
