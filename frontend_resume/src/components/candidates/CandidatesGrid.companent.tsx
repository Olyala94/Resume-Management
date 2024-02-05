import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { ICandidate } from "../../types/global.typing";
import { baseUrl } from "../../constants/url.constants";
import { PictureAsPdf } from "@mui/icons-material";
import "./canditates-grid.scss";

const column: GridColDef[] = [
  { field: "id", headerName: "No", width: 100, headerClassName: "header-bold" },
  { field: "firstName", headerName: "First Name", width: 120, headerClassName: "header-bold" },
  { field: "lastName", headerName: "Last Name", width: 120, headerClassName: "header-bold" },
  { field: "email", headerName: "Email", width: 150, headerClassName: "header-bold" },
  { field: "phone", headerName: "Phone", width: 150, headerClassName: "header-bold" },
  { field: "coverLetter", headerName: "C V", width: 500, headerClassName: "header-bold" },
  {
    field: "resumeUrl",
    headerName: "Download",
    width: 150,
    renderCell: (params) => (
      <a
        href={`${baseUrl}/Candidate/download/${params.row.resumeUrl}`}
        download
      >
        <PictureAsPdf></PictureAsPdf>
      </a>
    ),
    headerClassName: "header-bold"
  },
];

interface ICandidatesGridProps {
  data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidatesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="canditates-grid">
      <DataGrid
        rows={data.map((row, index) => ({ ...row, id: index + 1 }))}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidatesGrid;
