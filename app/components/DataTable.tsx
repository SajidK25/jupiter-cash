import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { type DataTableProps } from "~/src/Types";
import { useLocation } from "@remix-run/react";

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 1,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Applicant…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

type Props = {
  data: DataTableProps[];
};
const DataTable = ({ data }: Props) => {
  const parentData = data;
  const location = useLocation();
  const getToLocation = (id: any): string => {
    return location.pathname === "/dashboard/disbursed"
      ? `/dashboard/${id}/disbursedloan`
      : location.pathname === "/dashboard/approved"
      ? `/dashboard/${id}/approvedloan`
      : location.pathname == "/dashboard/rejected"
      ? `/dashboard/${id}/rejectedloan`
      : location.pathname == "/dashboard/blocked"
      ? `/dashboard/${id}/blockedloan`
      : `/dashboard/${id}/pendingloan`;
  };
  // const fetcher = useFetcher();
  const [searchText, setSearchText] = React.useState<string>("");
  const [rows, setRows] = React.useState<DataTableProps[] | []>([]);

  const requestSearch = React.useCallback(
    (searchValue: string) => {
      setSearchText(searchValue);
      const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
      const filteredRows = parentData
        ? parentData.filter((row: any) => {
            return Object.keys(row).some((field: any) => {
              return searchRegex.test(row[field].toString());
            });
          })
        : [];
      setRows(filteredRows as DataTableProps[] | []);
    },
    [parentData]
  );

  React.useEffect(() => {
    setRows(parentData as DataTableProps[] | []);
  }, [parentData]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Applicant Name",
      width: 220,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "Date Requested",
      width: 150,
      type: "string",
      align: "center",
      valueFormatter: (params) => {
        return format(new Date(params.value), "PP");
      },
      headerAlign: "center",
    },
    {
      field: "approved_on",
      headerName: "Date Approved",
      width: 150,
      type: "string",
      align: "left",
      valueFormatter: (params) => {
        return format(new Date(params.value), "PP");
      },
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Amount GH₵",
      width: 150,
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total_amount",
      headerName: "Amount Due GH₵",
      align: "center",
      type: "number",
      headerAlign: "center",
      width: 160,
    },
    {
      field: "repayment_date",
      headerName: "Due Date",
      align: "center",
      type: "string",
      headerAlign: "center",
      valueFormatter: (params) => {
        return format(new Date(params.value), "PP");
      },
      width: 160,
    },

    {
      field: "contact1",
      headerName: "Contact No1",
      align: "center",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "contact2",
      headerName: "Contact No2",
      align: "center",
      headerAlign: "center",
      width: 150,
    },

    {
      field: "actions",
      headerName: "Actions Area",
      minWidth: 75,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box display="flex">
            <Button
              variant="contained"
              component={Link}
              to={getToLocation(params.id)}
              prefetch="render"
              size="small"
              sx={{ textTransform: "capitalize" }}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows}
        disableColumnFilter
        pageSize={10}
        disableColumnMenu
        initialState={{
          columns: {
            columnVisibilityModel: {
              repayment_date:
                location.pathname === "/dashboard/disbursed" ? true : false,
              approved_on:
                location.pathname !== "/dashboard/disbursed" ? false : true,
              created_at:
                location.pathname === "/dashboard/disbursed" ? false : true,
            },
          },
        }}
        rowsPerPageOptions={[10, 20]}
        disableColumnSelector
        disableSelectionOnClick
        loading={rows.length === 0}
        columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
          },
        }}
      />
    </div>
  );
};

export default DataTable;
