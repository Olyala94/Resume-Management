import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { ICompany } from "../../types/global.typing";
import  "./companies-grid.scss";

const column: GridColDef[] = [
  { field: "id", headerName: "S.No", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "size", headerName: "Size", width: 150 },
  {
    field: "createdAt",
    headerName: "Date of Creation",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  },
];

interface ICompaniesGridProps {
  data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
      <DataGrid
        rows={data.map((row, index) => ({ ...row, id: index + 1 }))}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CompaniesGrid;