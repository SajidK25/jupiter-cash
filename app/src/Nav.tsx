import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import GroupIcon from "@mui/icons-material/Group";

export interface NavListProps {
  title: string;
  Icon: JSX.Element;
  children?: { title: string }[];
  route?: string;
}
const navlist: NavListProps[] = [
  {
    title: "Dashboard",
    Icon: <DashboardOutlinedIcon />,
    route: "/dashboard/home",
  },
  {
    title: "Manage Users",
    Icon: <GroupIcon />,
    route: "/dashboard/users/home",
  },
  {
    title: "Pending Requests",
    Icon: <PendingActionsIcon />,
    /*children: [
      { title: "Products List" },
      { title: "Product" },
      { title: "Categories List" },
      { title: "Category" },
    ],*/
  },
  {
    title: "Approved Requests",
    Icon: <FactCheckIcon />,
    // children: [{ title: "Customer List" }, { title: "Customer" }],
  },
  {
    title: "Rejected Requests",
    Icon: <CommentsDisabledIcon />,
    // children: [{ title: "Order List" }, { title: "Order Details" }],
  },
  {
    title: "Disbursed Requuests",
    Icon: <LocalAtmIcon />,
  },
  { title: "Defaulted Requests", Icon: <HourglassBottomIcon /> },
];

export default navlist;
