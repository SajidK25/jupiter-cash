import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
//import theme from "~/src/theme";

const CustomNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    minHeight: 48,
    px: 2.5,
    "&:hover, &:focus": {
      backgroundColor: "#424242",
      fontWeight: "bold", //"#556cd6",
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    justifyContent: "center",

    color: "white",
    // marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
  "& .MuiListItemText-primary": {
    color: "white",
    fontSize: 15,
    fontWeight: "lighter",
  },
});

export default CustomNav;
