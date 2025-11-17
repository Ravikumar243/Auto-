
import React, { useMemo } from "react";
import MainCard from "components/MainCard";
import { Grid, Box, Typography, Button, Select, Modal } from "@mui/material";

import DataTable from "react-data-table-component";
import { ToastContainer } from "react-toastify";
import {
  MenuItem,
  TextField,
} from "../../../../node_modules/@mui/material/index";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import UploadDetailsHooks from "./UploadDetailsHooks";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const UploadDetails = () => {
  const {
    downloadExcelFile,
    handleSubmitPDF,
    handleFileChanges,
    handleChanges,
    handleAddList,
    handleCreateCompanyN,
    handleSearchCases,
    dataitems,
    handleuploadSearch,
    search,
    setSearch,
    getCompanyData,
    formPdf,
    companylist,
    handleClose,
    form,
    open,
    uploadDeatilsLoader,
    loading,
    handleOpen,
    handleDeleteCompany,
  } = UploadDetailsHooks();

  const column = useMemo(() => [
    {
      name: "Search By",
      cell: (row, index) => (
        <div className="custom-cell">
          <SearchOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={(e) => handleSearchCases(row)}
          />
        </div>
      ),
      width: "130px",
    },

    {
      name: "Company Name",
      selector: (row) => row.company,
      width:"180px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
      
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width:"180px"
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      width:"140px"
    },
    {
      name: "Engine No",
      selector: (row) => row.engineNo,
      width:"140px"
    },

    {
      name: "Chassis No",
      selector: (row) => row.chassisNo,
      width:"140px"
    },

    {
      name: "Battery No",
      selector: (row) => row.batteryNo,
      width:"140px"
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
        <div className="row">
          <div className="col-12 d-flex justify-content-end align-items-center gap-3 mb-4">
            {/* Download Button */}
            <Button
              type="button"
              onClick={downloadExcelFile}
              variant="outlined"
              startIcon={<SaveAltIcon />}
              style={{
                color: "#7e00d1",
                border: "1px solid #7e00d1",
                backgroundColor: "#faf5ff",
                fontSize:"12px"
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

            {/* Create Button */}
            <Button
              type="button"
              onClick={handleOpen}
              variant="outlined"
              startIcon={<AddToPhotosIcon />}
              style={{
                color: "#f5f5f5",
                border: "1px solid #7e00d1",
                backgroundColor: "#7e00d1",
                fontSize:"12px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#7e00d9";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#7e00d1";
                e.currentTarget.style.color = "#f5f5f5";
              }}
           
            >
              Create CompanyName
            </Button>

            {/* Delete Button */}
            <Button
              type="button"
              onClick={handleDeleteCompany}
              variant="outlined"
              startIcon={<DeleteIcon />}
              style={{
                color: "#f5f5f5",
                border: "1px solid #7e00d1",
                backgroundColor: "#7e00d1",
                fontSize:"12px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#7e00d9";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#7e00d1";
                e.currentTarget.style.color = "#f5f5f5";
              }}
            >
              Delete CompanyName
            </Button>
          </div>
        </div>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h5" className="mb-2">
            Upload Customer Details
          </Typography>

          <form onSubmit={handleSubmitPDF}>
            <div className="d-flex flex-row align-items-center gap-3 mb-3">
              {/* Select Company */}
              <div style={{ flex: 1 }}>
                <Select
                  name="CompanyName"
                  value={formPdf.CompanyName}
                  fullWidth
                  onChange={handleChanges}
                  variant="outlined"
                  displayEmpty
                  renderValue={(selected) => selected || "Select Company"}
                  style={{height:"35px"}}
                >
                  {companylist.map((value, index) => (
                    <MenuItem value={value.companyName} key={index}>
                      {value.companyName}
                    </MenuItem>
                  ))}
                  
                </Select>
              </div>
            <div>
                <button
                className="border-0"
                  type="button"
                  onClick={handleuploadSearch}
                  style={{
                    backgroundColor: "#7e00d1",
                    color: "#f5f5f5",
                    borderRadius: "5px",
                    padding:"4px 6px"
                  }}
                >
                  Search Data
                </button>
              </div>
              

              {/* File Input */}
              <div style={{ flex: 1 }}>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChanges}
                  multiple
                  style={{
                    width: "100%",
                    padding: "4px",
                    border: "1px solid #7e00d1",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#faf5ff",
                  }}
                />
              </div>

              <div>
              <button
                type="submit"
                className="border-0"
                style={{
                  backgroundColor: "#7e00d1",
                  color: "#f5f5f5",
                  borderRadius: "5px",
                   padding:"4px 6px"
                }}
              >
               {loading ? "Upload..." : "Upload File"}
              </button>
            </div>

              {/* Search Data Button */}
              
            </div>

            {/* Upload Button */}
            
          </form>

          {/* Modal remains same */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleAddList}>
                <div className="row mt-3 mb-3">
                  <div className="col-md-12">
                    <Typography variant="h5" className="mb-2 ">
                      Create Company
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      type="text"
                      placeholder="Enter Company name"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleCreateCompanyN}
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-12 text-center mt-3">
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "#7e00d1",
                        color: "#f5f5f5",
                        borderRadius: "5px",
                        height: "40px",
                        padding: "0 20px",
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </Box>
          </Modal>
        </Grid>

        <DataTable
          columns={column}
          data={search === "" ? dataitems : getCompanyData}
          fixedHeader
          customStyles={tableHeaderStyle}
          className="data-table"
          pagination
          subHeader
          subHeaderComponent={
            <>
              {(dataitems.length > 0 || getCompanyData.length > 0) && (
                <div className="row">
                  <div className="mt-1" style={{ width: "35%" }}>
                    <input
                      type="text"
                      className="form-control searchInput"
                      placeholder="Search by name or email"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </>
          }
        />
      </MainCard>
    </div>
  );
};
export default UploadDetails;
