import { useState } from "react";
import { ICreateCompany } from "../../types/global.typing";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { error } from "console";

const AddCompany = () => {
  const [company, setCompany] = useState<ICreateCompany>({
    name: "",
    size: "",
  });
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (company.name === "" || company.size === "") {
      alert("Fill all fields");
      return;
    }

    httpModule.post("/Company/Create", company)
    .then((responst) => redirect("/companies"))
    .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/companies");
  };

  return (
    <div className="content" style={{ marginTop: 10 }}>
      <div className="add-company">
        <h2>Add New Company</h2>
        <TextField
        style={{ marginTop: 10 }}
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Company Size</InputLabel>
          <Select
          style={{ marginTop: 10 }}
            value={company.size}
            label="Company Size"
            onChange={(e) => setCompany({ ...company, size: e.target.value })}
          >
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
          </Select>
        </FormControl>
        <div className="btns" style={{ marginTop: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickSaveBtn}
            // style={{ marginRight: 10 }}
            style={{
              backgroundColor: "green", // MUI secondary renk
              color: "#fff", // Beyaz renk
              transition: "background-color 0.3s", // Yanıp sönen efekt için geçiş efekti
            }}
            className="custom-button"
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickBackBtn}
            style={{
              backgroundColor: "#f44336", // MUI secondary renk
              color: "#fff", // Beyaz renk
              transition: "background-color 0.3s", // Yanıp sönen efekt için geçiş efekti
            }}
            className="custom-button"
            
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
