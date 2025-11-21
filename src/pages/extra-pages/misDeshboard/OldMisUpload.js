import { useMemo, useRef, useState } from "react";
import { Typography, Paper, Stack, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataTable from "react-data-table-component";
import MainCard from "components/MainCard";
import baseURL from "api/autoApi";
import OldMisHook from "./OldMisHook";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import DownloadIcon from "@mui/icons-material/Download";


export const OldMisUpload = () => {
  const fileInputRef = useRef(null);
  const {
    rows,
    file,
    loading,
    searchText,
    setSearchText,
    handleFileChange,
    handleUpload,
    handleSearch,
  } = OldMisHook();

  console.log(rows, "dkajdlkfskdjf");
  const onUpload = async () => {
    const success = await handleUpload();

    if (success) {
      fileInputRef.current.value = "";
    }
  };

  const navigate = useNavigate();

  const handleView = (rowData) => {
    navigate("/view-page", { state: { CustomerData: rowData } });
  };

  const columns = useMemo(
    () => [
      {
        name: "S.No",
        selector: (row, index) => index + 1,
        width: "70px",
      },
      {
        name: "View Data",
        width: "100px",
        cell: (row) => (
          <VisibilityIcon
            onClick={() => handleView(row)}
            style={{
              fontSize: "22px",
              color: "#7e00d1",
              cursor: "pointer",
            }}
          />
        ),
      },
      {
        name: "Reference No",
        selector: (row) => row.referenceNo,
        width: "160px",
      },
      {
        name: "Remark",
        selector: (row) => row.remark || "-",
        wrap: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        width: "180px",
      },
      {
        name: "Customer Name",
        selector: (row) => `${row.firstName || ""} ${row.lastName || ""}`,
        wrap: true,
        width: "180px",
      },
      {
        name: "Mobile No",
        selector: (row) => row.contactNo,
        width: "140px",
      },
      {
        name: "Service Type",
        selector: (row) => row.caseSummary,
        wrap: true,
        width: "180px",
      },
      {
        name: "Incident Location",
        selector: (row) => row.incidentLocation,
        width: "250px",
      },
      {
        name: "Location Type",
        selector: (row) => row.locationType,
        width: "180px",
      },
      {
        name: "Model Name",
        selector: (row) => row.carModel,
        width: "180px",
      },
      {
        name: "Vehicle No",
        selector: (row) => row.vehicleRegistration,
        width: "150px",
      },
      {
        name: "Chassis No",
        selector: (row) => row.chassisNo,
        width: "180px",
      },
      {
        name: "Created Date",
        selector: (row) => row.reportedDate,
        width: "180px",
      },
      {
        name: "Created Time",
        selector: (row) => row.reportedTime,
        width: "180px",
      },
    ],
    []
  );

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#f0eff1ff",
      },
    },
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <MainCard
        elevation={4}
        sx={{
          p: 3,
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <div className="d-flex align-items-end justify-content-end mb-5">
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/completedata.csv";
              link.download = "MIS_Template.csv";
              link.click();
            }}
            style={{
              backgroundColor: "#7e00d1",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
              height: "38px",
            }}
          >
            <DownloadIcon style={{ fontSize: "18px" }} />
            Download Template
          </button>
        </div>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Upload MIS Excel File
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, width: "100%" }}
        >
          {/* LEFT SIDE — Upload Section */}
          <Stack direction="row" spacing={2} alignItems="center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{
                flex: 1,
                padding: "6px",
                border: "1px solid #7e00d1",
                borderRadius: "5px",
                backgroundColor: "#faf5ff",
                cursor: "pointer",
                maxWidth: "400px",
              }}
            />

            <button
              onClick={onUpload}
              disabled={loading || !file}
              style={{
                backgroundColor: loading ? "#9c4dcc" : "#7e00d1",
                color: "#fff",
                borderRadius: "5px",
                padding: "6px 12px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Uploading..." : "Upload File"}
            </button>
          </Stack>

          {/* RIGHT SIDE — Search Section */}
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Search By SRN"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{
                width: "280px",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#7e00d1",
                  },
              }}
            />

            <button
              onClick={handleSearch}
              style={{
                backgroundColor: "#7e00d1",
                color: "#fff",
                borderRadius: "5px",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                height: "38px",
              }}
            >
              Search
            </button>
          </Stack>
        </Stack>

        {loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h3 style={{ color: "#7e00d1" }}>Loading...</h3>
          </div>
        )}
        {/* DATATABLE SECTION */}
        {!loading && rows.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <DataTable
              title="MIS Data"
              columns={columns}
              data={rows}
              pagination
              highlightOnHover
              striped
              dense
              responsive
              customStyles={customStyle}
            />
          </div>
        )}
      </MainCard>
    </>
  );
};
