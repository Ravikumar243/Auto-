import React, { useMemo, memo } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from 'file-saver';
import ReportMisHooks from "./ReportMisHooks";
import MainCard from "components/MainCard";
import { Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import { ToastContainer } from "react-toastify";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { Circles } from "react-loader-spinner";
import moment from "moment";

const ReportMis = () => {
  const {
    handleDowloadExcel,
    setSearch,
    filtercase,
    setFrom,
    to,
    setTo,
    loading,
    setOpen,
    open,
    email,
    setEmail,
    otp,
    setOtp,
    step,
    setStep,
    handleSendOtp,
    handleVerifyOtp,
    from,
  } = ReportMisHooks();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userRole = userInfo?.role;

  const column = useMemo(() => [
    {
      name: "S.No",
      selector: (row, index) => <>{index + 1}</>,
      width: "70px",
    },

    {
      name: "SRN No",
      selector: (row) => <>{row.reference_No}</>,
      width: "200px",
    },
    {
      name: "Customer Name",
      selector: (row) => <>{row.firstName + " " + row.lastName}</>,
      width: "160px",
    },
    {
      name: "Mobile Number",
      selector: (row) => <>{row.contactNo}</>,
      width: "140px",
    },
    {
      name: "Location",
      selector: (row) => <>{row.incidentLocation}</>,
      width: "300px",
    },
    {
      name: "Model Name",
      selector: (row) => <>{row.carModel}</>,
      width: "220px",
    },
    {
      name: "Registration Number",
      selector: (row) => <>{row.vehicleRegistration}</>,
      width: "180px",
    },
    {
      name: "Chasis No",
      selector: (row) => <>{row.chassisNo}</>,
      width: "180px",
    },
    {
      name: "Date",
      selector: (row) => <>{row.reportedDate}</>,
    },
    {
      name: "Assist Summary History",
      selector: (row) => (
        <>
          <div>
            {row?.otwI_RSATimeLineStatus
              ? row?.otwI_RSATimeLineStatus + "\n"
              : ""}
            {row?.otwI_Followup_DateTime
              ? row?.otwI_Followup_DateTime + "\n"
              : ""}
            {row?.otwI_Assistance_Summary
              ? row?.otwI_Assistance_Summary + "\n"
              : ""}
          </div>
          <div>
            {row?.otwI_VendorReachedDropLoc
              ? row?.otwI_VendorReachedDropLoc + "\n"
              : ""}
            {row?.otwD_RSATimeLineStatus
              ? row?.otwD_RSATimeLineStatus + "\n"
              : ""}
            {row?.otwD_Followup_DateTime
              ? row?.otwD_Followup_DateTime + "\n"
              : ""}
            {row?.otwD_Assistance_Summary
              ? row?.otwD_Assistance_Summary + "\n"
              : ""}
          </div>
          <div>
            {row?.dC_RSATimeLineStatus ? row?.dC_RSATimeLineStatus + "\n" : ""}
            {row?.dC_Followup_DateTime ? row?.dC_Followup_DateTime + "\n" : ""}
            {row?.dC_Assistance_Summary
              ? row?.dC_Assistance_Summary + "\n"
              : ""}
          </div>
          <div>
            {row?.dC_VendorReachedDropLoc
              ? row?.dC_VendorReachedDropLoc + "\n"
              : ""}
            {row?.cC_RSATimeLineStatus ? row?.cC_RSATimeLineStatus + "\n" : ""}
            {row?.cC_Followup_DateTime ? row?.cC_Followup_DateTime + "\n" : ""}
            {row?.cC_Assistance_Summary
              ? row?.cC_Assistance_Summary + "\n"
              : ""}
          </div>
          {row?.cC_VendorReachedDropLoc
            ? row?.cC_VendorReachedDropLoc + "\n"
            : ""}
          {row?.riL_RSATimeLineStatus ? row?.riL_RSATimeLineStatus + "\n" : ""}
          {row?.riL_Followup_DateTime ? row?.riL_Followup_DateTime + "\n" : ""}
          {row?.riL_Assistance_Summary
            ? row?.riL_Assistance_Summary + "\n"
            : ""}
          {row?.riL_VendorReachedDropLoc
            ? row?.riL_VendorReachedDropLoc + "\n"
            : ""}
        </>
      ),
      width: "350px",
    },
    {
      name: "Status",
      selector: (row) => <>{row.status}</>,
      width: "250px",
    },
  ]);
  const tableCustomStyles = {
    headCells: {
      style: {
        backgroundColor: "#f0f0f0",
      },
    },
  };

  const formatDisplayDate = (value) => {
    if (!value) return "";
    return moment(value).format("DD/MM/YYYY");
  };

  const parseInputDate = (value) => {
    // If user typed DD/MM/YYYY → convert to ISO
    if (value.includes("/")) {
      const [d, m, y] = value.split("/");
      return moment(`${y}-${m}-${d}`).isValid() ? `${y}-${m}-${d}` : "";
    }
    return value;
  };

  return (
    <div>
      <div className="">
        <MainCard title=" ">
          <h4>MIS Report</h4>
          <div className="row">
            <div className="col-md-3">
              <div className="d-flex items-center form-control">
                <SearchOutlinedIcon
                  style={{
                    cursor: "pointer",
                    fonsize: "6px",
                    position: "relative",
                    zIndex: "999",
                  }}
                />
                <input
                  type="text"
                  className=""
                  placeholder="Search by SRN & Phone"
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    fontSize: "14px",
                    paddingLeft: "3px",
                    background: "transparent",
                    border: "none",
                    width: "100%",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* <div className="col-md-2">
              <input
                type="date"
                className="form-control py-2"
                style={{ fontSize: "14px" }}
                onChange={(e) => setFrom(e.target.value)}
                max={
                  userRole === "Agent"
                    ? moment().format("YYYY-MM-DD")
                    : undefined
                }
                min={
                  userRole === "Agent"
                    ? moment().subtract(2, "days").format("YYYY-MM-DD")
                    : undefined
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control py-2"
                style={{ fontSize: "14px" }}
                onChange={(e) => setTo(e.target.value)}
                max={
                  userRole === "Agent"
                    ? moment().format("YYYY-MM-DD")
                    : undefined
                }
                min={
                  userRole === "Agent"
                    ? from || moment().subtract(2, "days").format("YYYY-MM-DD")
                    : undefined
                }
              />
            </div> */}
            <div className="col-md-2">
              <input
                type={from ? "date" : "text"} // date when user focuses or already selected
                className="form-control py-2"
                style={{ fontSize: "14px" }}
                placeholder="dd/mm/yyyy"
                value={
                  moment(from, "YYYY-MM-DD", true).isValid()
                    ? document.activeElement?.type === "date"
                      ? from
                      : formatDisplayDate(from)
                    : ""
                }
                onFocus={(e) => {
                  e.target.type = "date";
                  e.target.value = from; // IMPORTANT: set ISO value
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                  e.target.value = formatDisplayDate(from);
                }}
                onChange={(e) => {
                  setFrom(e.target.value); // always store ISO (YYYY-MM-DD)
                }}
                max={
                  userRole === "Agent"
                    ? moment().format("YYYY-MM-DD")
                    : undefined
                }
                min={
                  userRole === "Agent"
                    ? moment().subtract(2, "days").format("YYYY-MM-DD")
                    : undefined
                }
              />
            </div>
            <div className="col-md-2">
              <input
                type={to ? "date" : "text"} // SAME AS FROM INPUT
                className="form-control py-2"
                style={{ fontSize: "14px" }}
                placeholder="dd/mm/yyyy"
                value={
                  moment(to, "YYYY-MM-DD", true).isValid()
                    ? document.activeElement?.type === "date"
                      ? to
                      : formatDisplayDate(to)
                    : ""
                }
                onFocus={(e) => {
                  e.target.type = "date";
                  e.target.value = to; // must be ISO yyyy-mm-dd
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                  e.target.value = formatDisplayDate(to);
                }}
                onChange={(e) => setTo(e.target.value)} // always store ISO
                max={
                  userRole === "Agent"
                    ? moment().format("YYYY-MM-DD")
                    : undefined
                }
                min={
                  userRole === "Agent"
                    ? from || moment().subtract(2, "days").format("YYYY-MM-DD")
                    : undefined
                }
              />
            </div>

            <div className="col-md-3">
              <button
                style={{
                  color: "white",
                  borderRadius: "4px",
                  background: "#7e00d1",
                  border: "none",
                  padding: "7px 10px",
                  fontSize: "14px",
                }}
                onClick={() => setOpen(true)}
              >
                <SaveAltIcon className="me-1" /> Generate Excel
              </button>
            </div>
          </div>

          <Modal open={open} onClose={() => setOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                width: 400,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                {step === 1 ? "Enter Email to Receive OTP" : "Verify OTP"}
              </Typography>

              {step === 1 ? (
                <>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSendOtp}
                    disabled={loading}
                    sx={{
                      bgcolor: "#7E00D1",
                      "&:hover": { bgcolor: "#5f00a8" },
                    }}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <>
                  {/* <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                  /> */}
                  <TextField
                    fullWidth
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    sx={{
                      bgcolor: "#7E00D1",
                      "&:hover": { bgcolor: "#5f00a8" },
                    }}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                </>
              )}
            </Box>
          </Modal>

          <Grid item xs={12} md={12} lg={12}>
            <Grid>
              <ToastContainer />
            </Grid>

            {loading ? (
              // <div className="text-center mt-4">Loading invoices...</div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <Circles
                  height="60"
                  width="60"
                  color="#FE850E"
                  ariaLabel="circles-loading"
                  visible={true}
                />
              </div>
            ) : (
              <DataTable
                className="mt-5 data-table"
                columns={column}
                data={filtercase}
                pagination
                customStyles={tableCustomStyles}
                fileration
                fixedHeader
              ></DataTable>
            )}
          </Grid>
        </MainCard>
      </div>
    </div>
  );
};

export default memo(ReportMis);
