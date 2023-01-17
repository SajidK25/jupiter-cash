/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import { type NavListProps } from "~/src/Nav";
interface appProps extends NavListProps {
  parentOpen: boolean;
}
const ListItemBody = ({ title, Icon, children, parentOpen }: appProps) => {
  const [open, setOpen] = React.useState(false);
  //const [openDropdown, setOpenDropdown] = React.useState(false);
  React.useEffect(() => {
    parentOpen === false && setOpen(false);
  }, [parentOpen]);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <ListItemButton
        onClick={(e) => (parentOpen ? handleOpen() : e.preventDefault())}
        sx={{
          justifyContent: parentOpen ? "initial" : "center",
          justifySelf: "center",
        }}
      >
        <ListItemIcon
          sx={
            {
              // mr: 2,
            }
          }
        >
          {Icon}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: parentOpen ? 1 : 0 }} />
        {open ? (
          <ExpandLess
            sx={{ opacity: parentOpen ? 1 : 0, color: "whitesmoke" }}
          />
        ) : (
          <ExpandMore sx={{ opacity: parentOpen ? 1 : 0, color: "white" }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="nav"
          disablePadding
          dense={true}
          sx={{
            "& .MuiListItemButton-root": {
              minHeight: 5,
              "&:focus, &:hover": {
                backgroundColor: "#616161",
              },
            },
          }}
        >
          {children?.map((el, index) => (
            <ListItemButton sx={{ pl: 6, my: 1, mx: 1 }} key={index}>
              <ListItemText primary={el.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default ListItemBody;
