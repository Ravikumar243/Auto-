import React, { useMemo } from "react";
import MainCard from "components/MainCard";
import { Grid, Box, Typography, Button, Select, Modal } from "@mui/material";

import { ToastContainer } from "react-toastify";
import {
  MenuItem,
  TextField,
} from "../../../../node_modules/@mui/material/index";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";
// import UploadMakeshooks from './UploadMakeshooks'

import DataTable from "react-data-table-component";
import UploadMakesHooks from "./UploadMakesHooks";

const UploadMakes = () => {
  const {
    handleUploadMakemodels,
    loading,
    setUploadFile,
    downloadExcelFile,
    uploadFile,
    setSearch,
    search,
    dataitems,
    filterData,
    vehicleType,
    setVehicleType,
  } = UploadMakesHooks();

  const column = useMemo(() => [
    {
      name: "Make",
      selector: (row) => row.make,
    },
    {
      name: "Models",
      selector: (row) => row.model,
    },
  ]);

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "rgba(241,244,249,255)",
      },
      head: {
        style: {
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        },
      },
      cells: {
        style: {
          fontSize: "0.875rem",
          fontFamily: "'Public Sans',sans-serif",
        },
      },
    },
  };
  return (
    <div className="mt-0">
      <MainCard>
        <Box>
          <ToastContainer />
        </Box>
        <Grid items xs={12} md={12} lg={12}>
          <Typography variant="h3">Upload Make And Models Details</Typography>

          <div className="d-flex flex-row justify-content-start align-align-items-start my-3 ">
            <div className="my-2">
              <input
                type="file"
                name="uploadFile"
                onChange={(e) => setUploadFile(e.target.files[0])}
              />
            </div>
            <div className="">
              <Button
                type="Submit"
                onClick={handleUploadMakemodels}
                startIcon={<AddIcon />}
                style={{
                  backgroundColor: "rgb(126, 0, 209)",
                  color: "#f5f5f5",
                  border: "0px solid rgb(126, 0, 209)",
                  width: "150px",
                  borderRadius: "5px",
                  padding: "5px",
                  height: "40px",
                  marginLeft: "0.9rem",
                }}
              >
                {loading === true ? "Upload..." : "Upload Files"}
              </Button>
            </div>
            <div className="mx-3">
              <Button
                type="button"
                onClick={downloadExcelFile}
                variant="outlined"
                startIcon={<SaveAltIcon />}
                style={{
                  color: "#7e00d1",
                  border: "1px solid #7e00d1",
                  borderRadius: "8px",
                  padding: "8px 20px",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: "#faf5ff",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#7e00d1";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#faf5ff";
                  e.currentTarget.style.color = "#7e00d1";
                }}
              >
                Download Template
              </Button>
            </div>
          </div>
        </Grid>

        <DataTable
          columns={column}
          data={search === "" ? dataitems : filterData}
          fixedHeader
          customStyles={tableHeaderStyle}
          className="data-table"
          pagination
          subHeader
          subHeaderAlign="left"
          subHeaderComponent={
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                gap: "2rem",
                width: "100%",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                textAlign: "left", 
                direction: "ltr", 
              }}
            >
           
              <div style={{ width: "25%", textAlign: "left" }}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    textAlign: "left",
                    display: "block",
                  }}
                >
                  Select Vehicle Type:
                </Typography>
                <Select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  fullWidth
                  sx={{
                    height: "40px",
                    textAlign: "left", 
                  }}
                >
                  <MenuItem value="Two wheeler">Two Wheeler</MenuItem>
                  <MenuItem value="Three wheeler">Three Wheeler</MenuItem>
                  <MenuItem value="Four wheeler">Four Wheeler</MenuItem>
                  {/* <MenuItem value="Commercial">Commercial</MenuItem> */}
                </Select>
              </div>

          
              {dataitems.length > 0 && (
                <div style={{ width: "25%", textAlign: "left" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      textAlign: "left",
                      display: "block",
                    }}
                  >
                    Search:
                  </Typography>
                  <input
                    type="text"
                    className="form-control searchInput"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "5px",
                      paddingLeft: "10px",
                      border: "1px solid #ccc",
                      textAlign: "left", 
                    }}
                  />
                </div>
              )}
            </div>
          }
        />
      </MainCard>
    </div>
  );
};
export default UploadMakes;
