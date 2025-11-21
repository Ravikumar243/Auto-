import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Typography,
  Container,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import VendorDetailsHooks from "./VendorDetailsHooks";
import { TextareaAutosize } from "@mui/base";
import axios from "axios";
import baseURL from "api/autoApi";
import { CustomerContext } from "../createDetails/CreateCustomerHooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorDeatils = () => {
  const {
    loadingTest,
    handleAccordionChange,
    formSrnStatus,
    expanded,
    fetcdataListItems,
    formIncident,
    handleService,
    handleClose,
    handleVendordetailsSubmit,
    handleStatus,
    historySrn,
    generatedSRN,
    remarkLoading,
    remarkLogsData,
    selectedRsaStatus,
    setFormSrnStatus,
    handleDownloadHistory
  } = useContext(CustomerContext);
  const remarksOngoing = [
    "Vendor Assigned",
    "Customer Not Responding",
    "Vendor Not Responding",
    "ETA Breached",
  ];
  const c1 = ["Customer Not Responding"];
  const c2 = ["Vendor Not Responding"];
  const c3 = ["ETA Breached"];
  const remarks = [
    "Enquiry",
    "Case Cancelled",
    "Case Completed",
    "Service Recalled",
  ];
  const status = ["OnGoing", "Vendor Close Issue"];
  const rsa = [
    "On the way to Incident",
    "Reached at Incident location",
    "On the way to drop",
    "Drop Completed",
    "Case Completed",
  ];
  const rsaEnquiry = [
    "Policy Information",
    "Dealer Query",
    "Other Provider",
    "Out of Scope",
    "Due to High Price",
    "Other Enquiry",
  ];
  const rsaCompleted = ["Case Completed"];
  const rsaCaseDenied = [
    "Vehicle Started",
    "Customer Arranged Alternative Service",
  ];
  const rsaServiceRecalled = [
    "Incorrect Closure",
    "Customer Dissatisfied with Resolution",
    "Location Updated",
    "ETA Delay Exceeded",
    "No Assistance Reached",
  ];
  const recallStatus = [
    "SLA breach",
    "Vehicle Started",
    "Local Help",
    "Within standard eta",
    "Service Not Dispatched",
    "Network Failure",
  ];
  const { handleDownload } = VendorDetailsHooks();
  // const storedServiceType = localStorage.getItem("serviceType");
  const serviceTypefromSrnData =
    fetcdataListItems?.serviceDrop_IncidentType === "RSR"
      ? fetcdataListItems?.serviceDrop_IncidentType
      : fetcdataListItems?.serviceDrop_IncidentDetails;

  console.log(formSrnStatus, "formSrnStatusdjflksdk");

  return (
    <>
      <Accordion
        expanded={expanded === "open6"}
        onChange={handleAccordionChange("open6")}
        sx={{ margin: "0px 0px 18px 0px" }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            bgcolor: expanded === "open6" ? "#7E00D1" : "#f5f5f5",
            width: "100%",
            borderRadius: 1,
            color: expanded === "open6" ? "white" : "#282828",
            height: "40px",
            minHeight:
              expanded === "open1" ? "50px !important" : "50px !important",
          }}
        >
          <Typography component="span" variant="h4">
            Vendor Details
          </Typography>
        </AccordionSummary>
        {/* <AccordionDetails>
          <Container maxWidth="lg">
            <Grid>
              <div className="row my-3 gx-5">
                <div className="col-md-4 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Case Type
                  </Typography>
                  <Select
                    fullWidth
                    value=""
                    displayEmpty
                    renderValue={(select) => {
                      if (!select) {
                        return "Select";
                      }
                      return select;
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    <MenuItem value="Complete-Enquiry" disabled>
                      Complete-Enquiry
                    </MenuItem>
                    <MenuItem value="Case Denied" disabled>
                      Case Denied
                    </MenuItem>
                    <MenuItem value="Case Cancelled" disabled>
                      Case Cancelled
                    </MenuItem>
                  </Select>
                </div>
                <div className="col-md-4 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Sub Category
                  </Typography>
                  <Select
                    fullWidth
                    value=""
                    displayEmpty
                    renderValue={(select) => {
                      if (!select) {
                        return "Select";
                      }
                      return select;
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                  </Select>
                </div>
                <div className="col-md-4 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Request Type
                  </Typography>
                  <Select
                    fullWidth
                    value=""
                    displayEmpty
                    renderValue={(select) => {
                      if (!select) {
                        return "Select";
                      }
                      return select;
                    }}
                  >
                    <MenuItem value="" disabled>
                      Selectst
                    </MenuItem>
                    <MenuItem value="Planned" disabled>
                      Planned
                    </MenuItem>
                    <MenuItem value="Unplanned" disabled>
                      Unplanned
                    </MenuItem>
                  </Select>
                </div>
              </div>
            </Grid>
          </Container>
        </AccordionDetails> */}
        <Typography
          id="simple-select-label"
          variant="h4"
          sx={{
            bgcolor: "#FaF3ff",
            padding: "20px 10px",
            margin: "15px 0 0 0",
          }}
          gutterBottom
        >
          Customer Details
        </Typography>

        <AccordionDetails>
          <Container maxWidth="lg">
            <Grid>
              <div className="row my-3 gx-5">
                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Company Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Company Name"
                    value={fetcdataListItems?.companyName || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="First Name"
                    value={fetcdataListItems?.customerFirstName || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Last Name"
                    value={fetcdataListItems?.customerLastName || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Email"
                    value={fetcdataListItems?.customerEmailid || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Mobile No
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Mobile No"
                    value={fetcdataListItems?.customerMobileNo || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    &nbsp;
                  </Typography>

                  <button
                    type="button"
                    className="btn btn-light btn-md"
                    onClick={() => handleDownload(fetcdataListItems?.srN_No)}
                    style={{
                      backgroundColor: "#7E00D1",
                      color: "white",
                      fontSize: "14px",
                      width: "220px",
                      height: "40px",
                    }}
                  >
                    Download Claim Intimation{" "}
                  </button>
                </div>
              </div>
            </Grid>
          </Container>
        </AccordionDetails>
        <Typography
          variant="h4"
          sx={{ bgcolor: "#FaF3ff", padding: "20px 10px" }}
          gutterBottom
        >
          Certificate Details
        </Typography>

        <AccordionDetails>
          <Container maxWidth="lg">
            <Grid className="container-fluid">
              <div className="row my-3 gx-5">
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Certificate No
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Certificate No"
                    type="text"
                    name=""
                    value={fetcdataListItems?.srN_No || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Certificate Start Date
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Certificate Start Date"
                    value={fetcdataListItems?.policyStartDate || ""}
                    type="text"
                    name=""
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Certificate End Date
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Certificate End Date"
                    type="text"
                    value={fetcdataListItems?.policyEndDate || ""}
                    name=""
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Make
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Make"
                    type="text"
                    name=""
                    value={fetcdataListItems?.make || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Model Variant
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Model Variant"
                    type="text"
                    name=""
                    value={fetcdataListItems?.model_Variant || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Engine No
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Engine No"
                    type="text"
                    name=""
                    value={fetcdataListItems?.engineNo_BatteryNo || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Chassis No
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Chassis No"
                    type="text"
                    name=""
                    value={fetcdataListItems?.chasisNo_FrameNo || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Registration No
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Registration No"
                    type="text"
                    name=""
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Vehicle No
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Vehicle No"
                    type="text"
                    value={fetcdataListItems?.vehicleNo || ""}
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Vehicle Color
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Vehicle Color"
                    type="text"
                    name=""
                    value=""
                    variant="outlined"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
              </div>
            </Grid>
          </Container>
        </AccordionDetails>

        {/* vendor Incident Details */}
        <Typography
          variant="h4"
          sx={{ bgcolor: "#FaF3ff", padding: "20px 10px" }}
          gutterBottom
        >
          Incident Details
        </Typography>

        <AccordionDetails>
          <Container maxWidth="lg">
            <form onSubmit={handleVendordetailsSubmit}>
              <Grid className="container-fluid">
                <div className="row my-3 gx-5">
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Select Location
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Select Location"
                      type="text"
                      value={fetcdataListItems?.incident_Location || ""}
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Landmark
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Landmark"
                      type="text"
                      value={fetcdataListItems?.incident_Landmark || ""}
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Pincode
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Pincode"
                      type="text"
                      value={fetcdataListItems?.incident_Pincode || ""}
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Location Type
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Location Type"
                      type="text"
                      value={fetcdataListItems?.serviceDrop_LocationType || ""}
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Servic Assigned Date Time
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Servic Assigned Date Time"
                      type="text"
                      value={fetcdataListItems?.serviceDrop_UpdateDate || ""}
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Vendor Not Assin Remark
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Vendor Not Assin Remark"
                      type="text"
                      value={
                        fetcdataListItems?.serviceDrop_VendorNotAssignRemark ||
                        ""
                      }
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Vendor Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Select Vendor Name"
                      type="text"
                      value={fetcdataListItems?.vendorName || ""}
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Vendor Branch Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Select Vendor Branch Name"
                      type="text"
                      value={fetcdataListItems?.vendorName || ""}
                      variant="outlined"
                    />
                  </div>

                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Status
                    </Typography>
                    <Select
                      fullWidth
                      displayEmpty
                      name="srN_Status"
                      value={
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.rsaStatus === "Case Completed"
                          ? fetcdataListItems?.srN_Status
                          : formSrnStatus.srN_Status || ""
                      }
                      renderValue={(selected) => selected || "OnGoing"}
                      onChange={handleStatus}
                      required
                      disabled={
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.rsaStatus === "Case Completed"
                      }
                      sx={{
                        backgroundColor:
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.rsaStatus === "Case Completed"
                            ? "#f5f5f5"
                            : "inherit", // optional: gray background when disabled
                      }}
                    >
                      {status.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  {/* <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Remark
                    </Typography>
                    <Select
                      name="srN_Remark"
                      value={formSrnStatus.srN_Remark}
                      fullWidth
                      displayEmpty
                      onChange={handleStatus}
                      renderValue={(v) => v || "Select"}
                      required
                    >
                      {formSrnStatus.srN_Status === "OnGoing" &&
                        remarksOngoing.map((item, idx) => (
                          <MenuItem key={idx} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Status === "Vendor Close Issue" &&
                        remarks.map((item, idx) => (
                          <MenuItem key={idx} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                    </Select>
                  </div> */}

                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Remark
                    </Typography>
                    <Select
                      name="srN_Remark"
                      fullWidth
                      displayEmpty
                      onChange={handleStatus}
                      renderValue={(v) => v || "Select"}
                      required
                      value={
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.rsaStatus === "Case Completed"
                          ? fetcdataListItems?.srN_Remark || ""
                          : formSrnStatus.srN_Remark || ""
                      }
                      disabled={
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.rsaStatus === "Case Completed"
                      } // disable conditionally
                      sx={{
                        backgroundColor:
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.rsaStatus === "Case Completed"
                            ? "#f5f5f5"
                            : "inherit", // optional: gray background when disabled
                      }}
                    >
                      {formSrnStatus.srN_Status === "OnGoing" &&
                        remarksOngoing.map((item, idx) => (
                          <MenuItem key={idx} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Status === "Vendor Close Issue" &&
                        remarks.map((item, idx) => (
                          <MenuItem key={idx} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>

                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      RSA Time Line Status
                    </Typography>

                    <Select
                      name="rsaTimeLineStatus"
                      fullWidth
                      displayEmpty
                      required
                      onChange={handleStatus}
                      renderValue={(selected) => selected || "Select"}
                      value={
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.rsaStatus === "Case Completed"
                          ? fetcdataListItems?.rsaStatus || ""
                          : formSrnStatus.rsaTimeLineStatus || ""
                      }
                      disabled={
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.rsaStatus === "Case Completed"
                      }
                      sx={{
                        backgroundColor:
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.rsaStatus === "Case Completed"
                            ? "#f5f5f5"
                            : "inherit",
                      }}
                    >
                      {/* Vendor Assigned case */}
                      {formSrnStatus.srN_Remark === "Vendor Assigned" &&
                        (() => {
                          const rsaOptions =
                            serviceTypefromSrnData === "RSR"
                              ? rsa.filter(
                                  (item) =>
                                    item !== "On the way to drop" &&
                                    item !== "Drop Completed"
                                )
                              : rsa;

                          const statusMap = {
                            "On the way to Incident": "otwI",
                            "Reached at Incident location": "riL",
                            "On the way to drop": "otwD",
                            "Drop Completed": "dC",
                            "Case Completed": "cC",
                          };

                          // Determine the next selectable status
                          let nextStatusIndex = 0;
                          for (let i = 0; i < rsaOptions.length; i++) {
                            const key = `${statusMap[rsaOptions[i]]}_RSATimeLineStatus`;
                            if (!historySrn?.[key]) {
                              nextStatusIndex = i;
                              break;
                            }
                          }

                          return rsaOptions.map((item, index) => (
                            <MenuItem
                              key={index}
                              value={item}
                              disabled={index > nextStatusIndex}
                            >
                              {item}
                            </MenuItem>
                          ));
                        })()}

                      {/* Other remark-based dropdowns */}
                      {formSrnStatus.srN_Remark === "Customer Not Responding" &&
                        c1.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Remark === "Vendor Not Responding" &&
                        c2.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Remark === "ETA Breached" &&
                        c3.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Remark === "Enquiry" &&
                        rsaEnquiry.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Remark === "Case Completed" &&
                        rsaCompleted.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Remark === "Case Denied" &&
                        rsaCaseDenied.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Remark === "Service Recalled" &&
                        rsaServiceRecalled.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}

                      {formSrnStatus.srN_Remark === "Case Cancelled" &&
                        recallStatus.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>

                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      Follow Up Date and Time*
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="RSA Time Line Status"
                      type="datetime-local"
                      name="followup_DateTime"
                      value={formSrnStatus.followup_DateTime}
                      onChange={handleStatus}
                      variant="outlined"
                      required
                      inputProps={{
                        min: new Date().toISOString().slice(0, 16),
                      }}
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue"
                      }
                    />
                  </div>

                  {selectedRsaStatus === "Reached at Incident location" && (
                    <div className="col-md-3 mb-4">
                      <Typography id="select-label" variant="h6" gutterBottom>
                        Vendor reached Inc Loc
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="RSA Time Line Status"
                        type="text"
                        name="vendor_reached"
                        value={
                          historySrn?.riL_RSATimeLineStatus
                            ? historySrn?.riL_RSATimeLineStatus + "\n"
                            : ""
                        }
                        style={{ backgroundColor: "#f5f5f5" }}
                        variant="outlined"
                      />
                    </div>
                  )}

                  {selectedRsaStatus === "Drop Completed" && (
                    <div className="col-md-3 mb-4">
                      <Typography id="select-label" variant="h6" gutterBottom>
                        Vendor Reached Drop Loc
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Vendor Reached Drop Loc"
                        type="text"
                        name="vendorReachedDropLoc"
                        value={
                          historySrn?.dC_RSATimeLineStatus
                            ? historySrn?.dC_RSATimeLineStatus + "\n"
                            : ""
                        }
                        style={{ backgroundColor: "#f5f5f5" }}
                        variant="outlined"
                      />
                    </div>
                  )}

                  {selectedRsaStatus === "Reached at Incident location" && (
                    <div className="col-md-3 mb-4">
                      <Typography variant="h6" gutterBottom>
                        Vendor Reach Time<span className="text-danger">*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        type="datetime-local"
                        name="vendorReachTime"
                        value={
                          fetcdataListItems?.vendorReachTime !== ""
                            ? fetcdataListItems?.vendorReachTime
                            : formSrnStatus.vendorReachTime || ""
                        }
                        onChange={(e) => {
                          const value = e.target.value;

                          // ✅ Static or API-based info date for validation
                          const infoDateTimeString =
                            fetcdataListItems?.informationDateTime;

                          if (!infoDateTimeString) {
                            toast.warning(
                              "Please select Information Date & Time first."
                            );
                            return;
                          }

                          // Convert both to local Date objects
                          const [infoDatePart, infoTimePart] =
                            infoDateTimeString.split("T");
                          const [infoYear, infoMonth, infoDay] = infoDatePart
                            .split("-")
                            .map(Number);
                          const [infoHour, infoMinute] = infoTimePart
                            .split(":")
                            .map(Number);
                          const infoDateTime = new Date(
                            infoYear,
                            infoMonth - 1,
                            infoDay,
                            infoHour,
                            infoMinute
                          );

                          const vendorReachTime = new Date(value);
                          const now = new Date();

                          // Extract date portions only
                          const infoDate = new Date(
                            infoDateTime.getFullYear(),
                            infoDateTime.getMonth(),
                            infoDateTime.getDate()
                          );
                          const reachDate = new Date(
                            vendorReachTime.getFullYear(),
                            vendorReachTime.getMonth(),
                            vendorReachTime.getDate()
                          );
                          const today = new Date(
                            now.getFullYear(),
                            now.getMonth(),
                            now.getDate()
                          );

                          // ❌ 1️⃣ Future date not allowed
                          if (reachDate > today) {
                            toast.error(
                              "Future dates are not allowed for Vendor Reach Time."
                            );
                            return;
                          }

                          // ❌ 2️⃣ Vendor reach time can't be before information time
                          if (reachDate < infoDate) {
                            toast.error(
                              "Vendor Reach Time can't be before Information Date."
                            );
                            return;
                          }

                          // ❌ 3️⃣ If same date → time must be greater
                          if (reachDate.getTime() === infoDate.getTime()) {
                            const infoMinutes =
                              infoDateTime.getHours() * 60 +
                              infoDateTime.getMinutes();
                            const reachMinutes =
                              vendorReachTime.getHours() * 60 +
                              vendorReachTime.getMinutes();

                            if (reachMinutes <= infoMinutes) {
                              toast.error(
                                "Vendor Reach Time must be greater than Information Date & Time."
                              );
                              return;
                            }
                          }
                          setFormSrnStatus((prev) => ({
                            ...prev,
                            vendorReachTime: e.target.value,
                          }));
                        }}
                        disabled={fetcdataListItems?.vendorReachTime !== ""}
                        required
                      />
                    </div>
                  )}

                  {selectedRsaStatus === "Drop Completed" && (
                    <div className="col-md-3 mb-4">
                      <Typography variant="h6" gutterBottom>
                        Vendor Drop Time<span className="text-danger">*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        type="datetime-local"
                        name="vendorDropTime"
                        value={
                          fetcdataListItems?.vendorDropTime !== ""
                            ? fetcdataListItems?.vendorDropTime
                            : formSrnStatus.vendorDropTime || ""
                        }
                        onChange={(e) => {
                          const value = e.target.value;

                          // ✅ Get reach time from API or form
                          const reachTimeString =
                            fetcdataListItems?.vendorReachTime ||
                            "2025-11-03T17:10"; // static fallback for testing

                          if (!reachTimeString) {
                            toast.warning(
                              "Please select Vendor Reach Time first."
                            );
                            return;
                          }

                          // Convert both to local Date objects
                          const [reachDatePart, reachTimePart] =
                            reachTimeString.split("T");
                          const [reachYear, reachMonth, reachDay] =
                            reachDatePart.split("-").map(Number);
                          const [reachHour, reachMinute] = reachTimePart
                            .split(":")
                            .map(Number);
                          const vendorReachTime = new Date(
                            reachYear,
                            reachMonth - 1,
                            reachDay,
                            reachHour,
                            reachMinute
                          );

                          const vendorDropTime = new Date(value);
                          const now = new Date();

                          // Extract only the date portions
                          const reachDate = new Date(
                            vendorReachTime.getFullYear(),
                            vendorReachTime.getMonth(),
                            vendorReachTime.getDate()
                          );
                          const dropDate = new Date(
                            vendorDropTime.getFullYear(),
                            vendorDropTime.getMonth(),
                            vendorDropTime.getDate()
                          );
                          const today = new Date(
                            now.getFullYear(),
                            now.getMonth(),
                            now.getDate()
                          );

                          // ❌ 1️⃣ Future date not allowed
                          if (dropDate > today) {
                            toast.error(
                              "Future dates are not allowed for Vendor Drop Time."
                            );
                            return;
                          }

                          // ❌ 2️⃣ Drop time can't be before reach time
                          if (dropDate < reachDate) {
                            toast.error(
                              "Vendor Drop Time can't be before Vendor Reach Time."
                            );
                            return;
                          }

                          // ❌ 3️⃣ If same date, time must be greater
                          if (dropDate.getTime() === reachDate.getTime()) {
                            const reachMinutes =
                              vendorReachTime.getHours() * 60 +
                              vendorReachTime.getMinutes();
                            const dropMinutes =
                              vendorDropTime.getHours() * 60 +
                              vendorDropTime.getMinutes();

                            if (dropMinutes <= reachMinutes) {
                              toast.error(
                                "Vendor Drop Time must be greater than Vendor Reach Time."
                              );
                              return;
                            }
                          }
                          setFormSrnStatus((prev) => ({
                            ...prev,
                            vendorDropTime: e.target.value,
                          }));
                        }}
                        disabled={fetcdataListItems?.vendorDropTime !== ""}
                        required
                      />
                    </div>
                  )}

                  <div className="col-md-3 mb-4">
                    <Typography id="v-contact" variant="h6" gutterBottom>
                      Vendor Contact Number
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      value={fetcdataListItems?.vendorContactNumber || ""}
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      ETA (in Min)
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="ETA in min"
                      type="text"
                      name="v_eta_min"
                      value={formSrnStatus.v_eta_min}
                      onChange={handleStatus}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="select-label" variant="h6" gutterBottom>
                      RNM Contact Number
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="RNM Contact Number"
                      type="text"
                      name="rnm_eta_min"
                      value={formSrnStatus.rnm_eta_min}
                      onChange={handleStatus}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Assistance Summary<span className="text-danger">*</span>
                    </Typography>
                    <TextareaAutosize
                      placeholder="Assistance Summary"
                      minRows={3}
                      name="assistance_Summary"
                      value={formSrnStatus.assistance_Summary}
                      onChange={handleStatus}
                      type="text"
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        padding: "0px 5px",
                        resize: "none",
                      }}
                      variant="outlined"
                      aria-label="minimum rows"
                      required
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4" style={{ display: "none" }}>
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Assistance Summary History
                    </Typography>
                    <TextareaAutosize
                      placeholder=""
                      minRows={3}
                      type="text"
                      value={
                        (historySrn?.otwI_RSATimeLineStatus
                          ? historySrn?.otwI_RSATimeLineStatus + "\n"
                          : "") +
                        (historySrn?.otwI_Followup_DateTime
                          ? historySrn?.otwI_Followup_DateTime + "\n"
                          : "") +
                        (historySrn?.otwI_Assistance_Summary
                          ? historySrn?.otwI_Assistance_Summary + "\n"
                          : "") +
                        (historySrn?.otwI_VendorReachedDropLoc
                          ? historySrn?.otwI_VendorReachedDropLoc + "\n"
                          : "") +
                        (historySrn?.otwD_RSATimeLineStatus
                          ? historySrn?.otwD_RSATimeLineStatus + "\n"
                          : "") +
                        (historySrn?.otwD_Followup_DateTime
                          ? historySrn?.otwD_Followup_DateTime + "\n"
                          : "") +
                        (historySrn?.otwD_Assistance_Summary
                          ? historySrn?.otwD_Assistance_Summary + "\n"
                          : "") +
                        (historySrn?.dC_RSATimeLineStatus
                          ? historySrn?.dC_RSATimeLineStatus + "\n"
                          : "") +
                        (historySrn?.dC_Followup_DateTime
                          ? historySrn?.dC_Followup_DateTime + "\n"
                          : "") +
                        (historySrn?.dC_Assistance_Summary
                          ? historySrn?.dC_Assistance_Summary + "\n"
                          : "") +
                        (historySrn?.dC_VendorReachedDropLoc
                          ? historySrn?.dC_VendorReachedDropLoc + "\n"
                          : "") +
                        (historySrn?.cC_RSATimeLineStatus
                          ? historySrn?.cC_RSATimeLineStatus + "\n"
                          : "") +
                        (historySrn?.cC_Followup_DateTime
                          ? historySrn?.cC_Followup_DateTime + "\n"
                          : "") +
                        (historySrn?.cC_Assistance_Summary
                          ? historySrn?.cC_Assistance_Summary + "\n"
                          : "") +
                        (historySrn?.cC_VendorReachedDropLoc
                          ? historySrn?.cC_VendorReachedDropLoc + "\n"
                          : "") +
                        (historySrn?.riL_RSATimeLineStatus
                          ? historySrn?.riL_RSATimeLineStatus + "\n"
                          : "") +
                        (historySrn?.riL_Followup_DateTime
                          ? historySrn?.riL_Followup_DateTime + "\n"
                          : "") +
                        (historySrn?.riL_Assistance_Summary
                          ? historySrn?.riL_Assistance_Summary + "\n"
                          : "") +
                        (historySrn?.riL_VendorReachedDropLoc
                          ? historySrn?.riL_VendorReachedDropLoc + "\n"
                          : "")
                      }
                      variant="outlined"
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        padding: "0px 5px",
                        resize: "none",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      External Assistance Summary
                    </Typography>
                    <TextareaAutosize
                      placeholder="External assistance Summary"
                      minRows={3}
                      type="text"
                      name="externalAssistanceSummary"
                      value={formSrnStatus.externalAssistanceSummary || ""}
                      variant="outlined"
                      onChange={handleStatus}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        padding: "0px 5px",
                        resize: "none",
                      }}
                    />
                  </div>
                  <div className="col-md-3 mb-4" style={{ display: "none" }}>
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      External Assistance Summary Histroy
                    </Typography>
                    <TextareaAutosize
                      placeholder=""
                      minRows={3}
                      type="text"
                      variant="outlined"
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        padding: "0px 5px",
                        resize: "none",
                        backgroundColor: "#f5f5f5",
                        fontSize: "16px",
                      }}
                      disabled
                    />
                  </div>
                </div>

                <div className="container mt-4">
                  {/* Table 1 */}
                  <div className="col-12 mb-4">
                    <h5 className="mb-3 fw-bold">Assistance History</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead
                          style={{
                            backgroundColor: "#7E00D1",
                            color: "#fff",
                          }}
                        >
                          <tr>
                            <th style={{ width: "300px" }}>Remark</th>
                            <th style={{ width: "80px" }}>Date & Time</th>
                            <th style={{ width: "140px" }}>Stage</th>
                            <th style={{ width: "80px" }}>Agent Id</th>
                          </tr>
                        </thead>
                        <tbody>
                          {remarkLoading ? (
                            <tr>
                              <td colSpan={4} className="text-center py-3">
                                Loading...
                              </td>
                            </tr>
                          ) : remarkLogsData.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="text-center py-3">
                                No remark data found
                              </td>
                            </tr>
                          ) : (
                            remarkLogsData?.map((item, index) => (
                              <tr key={index}>
                                <td
                                  style={{
                                    width: "100px",
                                    maxWidth: "100px",
                                    whiteSpace: "nowrap",
                                    overflowX: "scroll",
                                  }}
                                  className="hide-scrollbar"
                                >
                                  {item?.assistanceSummary ?? "N/A"}
                                </td>
                                <td
                                  style={{
                                    width: "100px",
                                    maxWidth: "100px",
                                  }}
                                >
                                  {item?.date ?? ""}
                                </td>
                                <td>{item?.stage ?? ""}</td>
                                <td>{item?.agentId ?? ""}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Table 2 */}
                  <div className="col-12 mb-4">
                    <h5 className="mb-3 fw-bold">
                      External Assistance History
                    </h5>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead
                          style={{
                            backgroundColor: "#7E00D1",
                            color: "#fff",
                          }}
                        >
                          <tr>
                            <th style={{ width: "300px" }}>Remark</th>
                            <th style={{ width: "80px" }}>Date & Time</th>
                            <th style={{ width: "140px" }}>Stage</th>
                            <th style={{ width: "80px" }}>Agent Id</th>
                          </tr>
                        </thead>
                        <tbody>
                          {remarkLoading ? (
                            <tr>
                              <td colSpan={4} className="text-center py-3">
                                Loading...
                              </td>
                            </tr>
                          ) : remarkLogsData.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="text-center py-3">
                                No remark data found
                              </td>
                            </tr>
                          ) : (
                            remarkLogsData?.map((item, index) => (
                              <tr key={index}>
                                <td
                                  style={{
                                    width: "100px",
                                    maxWidth: "100px",
                                    whiteSpace: "nowrap",
                                    overflowX: "scroll",
                                  }}
                                  className="hide-scrollbar"
                                >
                                  {item?.externalAssistanceSummary ?? "N/A"}
                                </td>
                                <td
                                  style={{
                                    width: "100px",
                                    maxWidth: "100px",
                                  }}
                                >
                                  {item?.date ?? ""}
                                </td>
                                <td>{item?.stage ?? ""}</td>
                                <td>{item?.agentId ?? ""}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 d-flex align-items-end mb-4  ms-auto">
                  <button
                    type="button"
                    className="btn text-white w-100"
                    style={{
                      backgroundColor: "#7E00D1",
                    }}
                    onClick={handleDownloadHistory}
                  >
                    Download Case History
                  </button>
                </div>

                <div className="d-flex justify-content-center gap-5">
                  {loadingTest === true ? (
                    <button
                      type="submit"
                      className="btn btn-light btn-md"
                      disabled
                      onClick={handleClose}
                      style={{
                        backgroundColor: "#7E00D1",
                        color: "white",
                        fontSize: "14px",
                        width: "144px",
                        height: "40px",
                        padding: "0px",
                      }}
                    >
                      Submiting...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-light btn-md"
                      onClick={handleClose}
                      style={{
                        backgroundColor: "#7E00D1",
                        color: "white",
                        fontSize: "14px",
                        width: "144px",
                        height: "40px",
                        padding: "0px",
                      }}
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Grid>
            </form>
          </Container>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default VendorDeatils;
