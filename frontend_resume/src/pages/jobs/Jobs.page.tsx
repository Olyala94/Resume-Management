import { useEffect, useState } from "react";
import "./jobs.scss";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { IJob } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";
import JobsGrid from "../../components/jobs/JobsGrid.companent";

const Jobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  //console.log(jobs);

  return (
    <div className="content jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Button variant="outlined" onClick={() => redirect("/jobs/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : jobs.length === 0 ? (
        <h1>No Job</h1>
      ) : (
        <JobsGrid data={jobs}></JobsGrid>
      )}
    </div>
  );
};

export default Jobs;
