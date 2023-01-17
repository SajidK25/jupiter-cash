import React from "react";
import { type RegisteredUsers } from "~/controllers/userController.server";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Link, useFetcher } from "@remix-run/react";
import { format } from "date-fns";
import { type DataTableProps } from "~/src/Types";
import CircularProgress from "@mui/material/CircularProgress";

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
  data: RegisteredUsers | [];
};
const UsersTable = ({ data }: Props) => {
  const parentData = data;

  const fetcher = useFetcher();
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
      field: "first_name",
      headerName: "First Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "personal_phone1",
      headerName: "Contact Number1",
      align: "center",
      headerAlign: "center",
      width: 170,
    },
    {
      field: "personal_phone2",
      headerName: "Contact Number2",
      align: "center",
      headerAlign: "center",
      width: 170,
    },
    {
      field: "createdAt",
      headerName: "Registered Date",
      width: 150,
      type: "string",
      align: "center",
      valueFormatter: (params) => {
        return format(new Date(params.value), "PP");
      },
      headerAlign: "center",
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
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              component={Link}
              to={`/dashboard/users/${params.id as string}`}
              prefetch="render"
              size="small"
              sx={{ textTransform: "capitalize" }}
            >
              Edit Info
            </Button>
            <Button
              variant="contained"
              disabled
              size="small"
              color="error"
              sx={{ textTransform: "capitalize" }}
              onClick={() =>
                fetcher.submit(
                  { id: params.id as string },
                  { method: "delete" }
                )
              }
            >
              {fetcher.state === "submitting" && params.hasFocus ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Delete"
              )}
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

export default UsersTable;
