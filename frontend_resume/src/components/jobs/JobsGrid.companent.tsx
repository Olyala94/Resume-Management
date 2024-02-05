import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { IJob } from "../../types/global.typing";
import "./jobs-grid.scss";

const column: GridColDef[] = [
  { field: "id", headerName: "No", width: 100,headerClassName: "bold-header" },
  { field: "title", headerName: "Title", width: 200,headerClassName: "bold-header" },
  { field: "level", headerName: "Level", width: 150,headerClassName: "bold-header" },
  { field: "companyName", headerName: "Company Name", width: 150,headerClassName: "bold-header" },
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 150,
    headerClassName: "bold-header",
    renderCell: (params) => moment(params.row.createdAt).fromNow(),
  },
];

interface IJobsGridProps {
  data: IJob[];
}

const JobsGrid = ({ data }: IJobsGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
      <DataGrid
        rows={data.map((row, index) => ({ ...row, id: index + 1 }))}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default JobsGrid;
