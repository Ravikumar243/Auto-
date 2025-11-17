import React, { useContext, useEffect, useState } from "react";
import {
  // Grid, Dialog, DialogTitle, DialogContent, DialogActions,  Button,InputLabel, Checkbox, FormControlLabel,Tabs, Tab,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Typography,
  Container,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
//import tableCustomStyles from '../../../components/TableStyle';
import Accordion from "@mui/material/Accordion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { OutlinedInput } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import customerdetail from "menu-items/customerdetail";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import baseURL from "api/autoApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";

import { toast, ToastContainer } from "react-toastify";
import { CustomerContext } from "./CreateCustomerHooks";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const CreateCustomerTicket = () => {
  const {
    disabledFromStates,
    editable,
    companyAndSearchTearm,
    handleChangeCmpanyAndSearchTearm,
    handleCmpanyAndSearchTearm,
    fetcdataListItems,
    handleAccordionChange,
    boolean,
    formData,
    expanded,
    handleChange,
    setExpanded,
    open,
    handleClose,
    setStepscount,
    companylist,
    getallClaimData,
    handleChangeclaimdata,
    searchdata,
    handleClaimData,
    handleSearchData,
    searchCompamyData,
    setGetallClaimData,
    handleRecordSelect,
    multipleRecords,
    showPopup,
    setShowPopup,
  } = useContext(CustomerContext);
  console.log(multipleRecords, "multipleRecordsksjkdf");

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (showPopup && multipleRecords.length > 0) {
      MySwal.fire({
        title: "Multiple Records Found",
        html: '<div id="datatable-container"></div>',
        showConfirmButton: false,
        width: "80%",
        didOpen: () => {
          const container = document.getElementById("datatable-container");

          if (container) {
            const columns = [
              {
                name: "Customer Name",
                selector: (row) => row.customer_name,
                sortable: true,
              },
              {
                name: "Mobile",
                selector: (row) => row.customer_mobile,
                sortable: true,
              },
              {
                name: "Vehicle No",
                selector: (row) => row.registration_no,
                sortable: true,
              },
              { name: "City", selector: (row) => row.city, sortable: true },
              {
                name: "Select",
                cell: (row) => (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      handleRecordSelect(row);
                      Swal.close();
                    }}
                  >
                    Select
                  </button>
                ),
              },
            ];

            const tableElement = (
              <DataTable
                columns={columns}
                data={multipleRecords}
                pagination
                highlightOnHover
                dense
              />
            );

            ReactDOM.render(tableElement, container);
          }
        },
        willClose: () => {
          setShowPopup(false);
        },
      });
    }
  }, [showPopup, multipleRecords]);

  return (
    <>
      {/* open={open}  */}
      <Accordion
        expanded={expanded === "open"}
        onClose={handleClose}
        onChange={handleAccordionChange("open")}
        className="newClaimDiv"
        sx={{ margin: "0px 0px 18px 0px" }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: expanded === "open" ? "#7E00D1" : "#f5f5f5",
            width: "100%",
            borderRadius: 1,
            color: expanded === "open" ? "white" : "#282828",
            height: "40px",
            minHeight:
              expanded === "open1" ? "50px !important" : "50px !important",
          }}
        >
          <Typography component="span" variant="h4">
            Search Company Data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="lg">
            <div
              className="d-flex justify-content-start align-items-center"
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
            >
              <div style={{ width: "17rem", marginRight: "2.8rem" }}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    name="companyName"
                    value={companyAndSearchTearm.companyName || ""}
                    onChange={handleChangeCmpanyAndSearchTearm}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return "Select Company Name";
                      }
                      return selected;
                    }}
                    disabled={
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                      fetcdataListItems?.caseType === "Complete-Enquiry" ||
                      fetcdataListItems?.caseType === "Case Denied" ||
                      fetcdataListItems?.caseType === "Case Cancelled"
                    }
                  >
                    <MenuItem value="" disabled>
                      Select Company Name
                    </MenuItem>

                    {!!boolean && (
                      <MenuItem disabled>
                        <CircularProgress className="me-2" size={20} /> Loading
                        company Name
                      </MenuItem>
                    )}

                    {companylist.map((item, index) => (
                      <MenuItem key={index} value={item.companyName}>
                        {item.companyName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ width: "17rem", marginRight: "2.8rem" }}>
                <TextField
                  fullWidth
                  placeholder="Vehicle | Chassis | Engine | Mobile No"
                  type="text"
                  name="vehicleNo"
                  value={companyAndSearchTearm.vehicleNo || ""}
                  onChange={handleChangeCmpanyAndSearchTearm}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FaSearch
                          style={{ cursor: "pointer", color: "#666" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-light btn-md"
                  onClick={handleCmpanyAndSearchTearm}
                  style={{
                    backgroundColor: "#7E00D1",
                    color: "white",
                    fontSize: "14px",
                    padding: "0.6rem 1rem",
                  }}
                >
                  Search
                </button>
              </div>
            </div>

            {searchdata === true ? (
              <>
                <div className="row my-3 gx-5">
                  <div className="col-md-3 mb-4">
                    <FormControl fullWidth variant="outlined">
                      <Typography
                        id="Company-simple-select"
                        variant="h6"
                        gutterBottom
                      >
                        Company Name *
                      </Typography>
                      {disabledFromStates.companyName === true ? (
                        <TextField
                          fullWidth
                          placeholder="Company Name"
                          name="companyName"
                          label=" "
                          value={
                            searchCompamyData?.companyName ||
                            getallClaimData.companyName ||
                            formData?.CompanyName ||
                            ""
                          }
                          onChange={handleChangeclaimdata}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                          disabled
                          style={{ backgroundColor: "#f1f1f1" }}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          placeholder="Company Name"
                          name="companyName"
                          label=" "
                          value={
                            searchCompamyData?.companyName ||
                            getallClaimData.companyName ||
                            formData?.CompanyName ||
                            ""
                          }
                          onChange={handleChangeclaimdata}
                          variant="outlined"
                        />
                      )}
                    </FormControl>
                  </div>

                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label2"
                      variant="h6"
                      gutterBottom
                    >
                      Certificate No
                    </Typography>
                    {disabledFromStates.srN_No === true ? (
                      <TextField
                        fullWidth
                        placeholder="Certificate No"
                        name="certificateNo"
                        value={
                          fetcdataListItems?.srN_No ||
                          searchCompamyData?.srN_No ||
                          ""
                        }
                        onChange={handleChangeclaimdata}
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Certificate No"
                        name="certificateNo"
                        value={
                          fetcdataListItems?.srN_No ||
                          searchCompamyData?.srN_No ||
                          ""
                        }
                        onChange={handleChangeclaimdata}
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      First Name{" "}
                    </Typography>
                    {disabledFromStates.CustomerFirstName === true ? (
                      <TextField
                        fullWidth
                        placeholder="First Name"
                        type="text"
                        name="CustomerFirstName"
                        value={
                          fetcdataListItems?.customerFirstName ||
                          formData?.CustomerFirstName ||
                          getallClaimData.CustomerName ||
                          ""
                        }
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="First Name"
                        type="text"
                        name="CustomerFirstName"
                        value={
                          fetcdataListItems?.customerFirstName ||
                          formData?.CustomerFirstName ||
                          getallClaimData.CustomerName ||
                          ""
                        }
                        onChange={handleChange}
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="Last-Name-label" variant="h6" gutterBottom>
                      Last Name
                    </Typography>
                    {disabledFromStates.CustomerLastName === true ? (
                      <TextField
                        fullWidth
                        placeholder="Last Name"
                        name="CustomerLastName"
                        value={
                          fetcdataListItems?.customerLastName ||
                          formData.CustomerLastName ||
                          searchCompamyData?.customerLastName ||
                          ""
                        }
                        onChange={handleChange}
                        type="text"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Last Name"
                        name="CustomerLastName"
                        value={
                          fetcdataListItems?.customerLastName ||
                          formData.CustomerLastName ||
                          searchCompamyData?.customerLastName ||
                          ""
                        }
                        onChange={handleChange}
                        type="text"
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="Vehicle-no-label" variant="h6" gutterBottom>
                      Vehicle No{" "}
                    </Typography>
                    {disabledFromStates.VehicleNo === true ? (
                      <TextField
                        fullWidth
                        placeholder="Vehicle No"
                        type="Text"
                        name="vehicleNo"
                        inputProps={{ maxLength: 12 }}
                        value={
                          fetcdataListItems?.vehicleNo ||
                          formData.VehicleNo ||
                          ""
                        }
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Vehicle No"
                        type="Text"
                        name="vehicleNo"
                        inputProps={{ maxLength: 12 }}
                        value={
                          fetcdataListItems?.vehicleNo ||
                          formData.VehicleNo ||
                          ""
                        }
                        onChange={handleChange}
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Engine No/ Battery No
                    </Typography>
                    {disabledFromStates.EngineNo_BatteryNo === true ? (
                      <TextField
                        fullWidth
                        placeholder="Engine No/ Battery No"
                        name="engineNo_BatteryNo"
                        value={
                          searchCompamyData?.engineNo ||
                          formData.EngineNo_BatteryNo ||
                          getallClaimData.engineNo_BatteryNo ||
                          searchCompamyData?.battery_No ||
                          ""
                        }
                        onChange={handleChangeclaimdata}
                        type="text"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Engine No/ Battery No"
                        name="engineNo_BatteryNo"
                        value={
                          searchCompamyData?.engineNo ||
                          formData.EngineNo_BatteryNo ||
                          getallClaimData.engineNo_BatteryNo ||
                          searchCompamyData?.battery_No ||
                          ""
                        }
                        onChange={handleChangeclaimdata}
                        type="text"
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Chassis No/ Frame No
                    </Typography>
                    {disabledFromStates.ChasisNo_FrameNo === true ? (
                      <TextField
                        fullWidth
                        placeholder="Chassis No/ Frame No"
                        name="chassisNo_FrameNo"
                        value={
                          searchCompamyData?.chassisNo ||
                          formData.ChasisNo_FrameNo ||
                          getallClaimData.chassisNo_FrameNo ||
                          ""
                        }
                        onChange={handleChangeclaimdata}
                        type="text"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Chassis No/ Frame No"
                        name="chassisNo_FrameNo"
                        value={
                          searchCompamyData?.chassisNo ||
                          formData.ChasisNo_FrameNo ||
                          getallClaimData.chassisNo_FrameNo ||
                          ""
                        }
                        onChange={handleChangeclaimdata}
                        type="text"
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Email ID
                    </Typography>
                    {disabledFromStates.CustomerEmailid === true ? (
                      <TextField
                        fullWidth
                        placeholder="Email ID"
                        name="CustomerEmailid"
                        value={
                          fetcdataListItems?.customerEmailid ||
                          getallClaimData.email ||
                          formData.CustomerEmailid ||
                          searchCompamyData?.customerEmailid ||
                          ""
                        }
                        onChange={handleChangeclaimdata}
                        type="email"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Email ID"
                        name="CustomerEmailid"
                        value={
                          fetcdataListItems?.customerEmailid ||
                          getallClaimData.email ||
                          formData.CustomerEmailid ||
                          searchCompamyData?.customerEmailid ||
                          ""
                        }
                        onChange={handleChangeclaimdata}
                        type="email"
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Contact No
                    </Typography>
                    {disabledFromStates.CustomerMobileNo === true ? (
                      <TextField
                        fullWidth
                        placeholder="Contact No"
                        name="contactNo"
                        value={
                          fetcdataListItems?.customerMobileNo ||
                          formData.CustomerMobileNo ||
                          getallClaimData.contactNo ||
                          searchCompamyData?.customerMobileNo ||
                          ""
                        }
                        inputProps={{ maxLength: 10 }}
                        onChange={handleChangeclaimdata}
                        type="telephone"
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Contact No"
                        name="contactNo"
                        value={
                          fetcdataListItems?.customerMobileNo ||
                          formData.CustomerMobileNo ||
                          getallClaimData.contactNo ||
                          searchCompamyData?.customerMobileNo ||
                          ""
                        }
                        inputProps={{ maxLength: 10 }}
                        onChange={handleChangeclaimdata}
                        type="telephone"
                        variant="outlined"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Charger No
                    </Typography>

                    <TextField
                      fullWidth
                      placeholder="Charger No"
                      type="Text"
                      name="ChargerNo"
                      value={formData.chargerno || ""}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Invoice No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Invoice No"
                      type="Text"
                      name="Invoiceno"
                      value={formData.Invoiceno || ""}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Motor Serial No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Motor Serial No"
                      type="Text"
                      name="motorserialno"
                      value={
                        formData.motor_serial_no || customerdetail?.motor_Number
                      }
                      onChange={handleChange}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Call Time <span className="text-danger">*</span>
                    </Typography>
                    <TextField
                      type="datetime-local"
                      name="callTime"
                      value={
                        formData?.callTime || fetcdataListItems?.callTime || ""
                      }
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <FormControl fullWidth variant="outlined">
                      <Typography
                        id="Company-simple-select"
                        variant="h6"
                        gutterBottom
                      >
                        Policy Verification
                      </Typography>
                      {disabledFromStates.policyVerification === "Verified" ? (
                        <Select
                          name="PolicyVerification"
                          value={
                            formData.PolicyVerification ||
                            searchCompamyData?.policyVerification ||
                            ""
                          }
                          onChange={handleChange}
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) {
                              return "Select Policy";
                            }
                            return selected;
                          }}
                          disabled
                          input={<OutlinedInput readOnly />}
                        >
                          <MenuItem value="" disabled>
                            {" "}
                            Select Policy{" "}
                          </MenuItem>
                          {/* <MenuItem value="Manual Verified">Manual Verified</MenuItem>
                        <MenuItem value="Unverified">Unverified</MenuItem> */}
                        </Select>
                      ) : (
                        <Select
                          name="PolicyVerification"
                          value={
                            formData.PolicyVerification ||
                            searchCompamyData?.policyVerification ||
                            ""
                          }
                          onChange={handleChange}
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) {
                              return "Select Policy";
                            }
                            return selected;
                          }}
                        >
                          {/* <MenuItem value="" disabled>
                          Select Policy
                        </MenuItem>
                        <MenuItem value="Manual Verified">Manual Verified</MenuItem>
                        <MenuItem value="Unverified">Unverified</MenuItem> */}
                        </Select>
                      )}
                    </FormControl>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-5">
                  {getallClaimData.companyName !== "" &&
                  (getallClaimData.certificateNo !== "" ||
                    getallClaimData.vehicleNo !== "" ||
                    getallClaimData.engineNo_BatteryNo !== "" ||
                    getallClaimData.chassisNo_FrameNo !== "" ||
                    getallClaimData.contactNo !== "") ? (
                    <>
                      <button
                        type="submit"
                        className="btn btn-light btn-md"
                        onClick={() => {
                          if (
                            !formData?.callTime &&
                            !fetcdataListItems?.callTime
                          ) {
                            toast.error(
                              "Please fill Call Time before continuing."
                            );
                            return; 
                          }
                          setExpanded(expanded === "open1" ? false : "open1");
                          setStepscount(1);
                        }}
                        // onClick={handleClaimData}
                        style={{
                          backgroundColor: "#7E00D1",
                          color: "white",
                          fontSize: "14px",
                          width: "144px",
                          height: "35px",
                        }}
                      >
                        Continue{" "}
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-light btn-md"
                        onClick={handleSearchData}
                        style={{
                          backgroundColor: "#7E00D1",
                          color: "white",
                          fontSize: "14px",
                          width: "144px",
                          height: "35px",
                          display: "none"
                        }}
                      >
                        Search
                      </button> */}
                    </>
                  ) : (
                    <>
                      {/* <button
                        type="button"
                        className="btn btn-light btn-md"
                        // onClick={handleSearchData}
                        style={{
                          backgroundColor: "#7E00D1",
                          color: "white",
                          fontSize: "14px",
                          width: "144px",
                          height: "35px",
                        }}
                      >
                        Search
                      </button> */}
                      <button
                        type="Submit"
                        className="btn btn-light btn-md"
                        onClick={() => {
                           if (
                            !formData?.callTime &&
                            !fetcdataListItems?.callTime
                          ) {
                            toast.error(
                              "Please fill Call Time before continuing."
                            );
                            return; 
                          }
                          setExpanded(expanded === "open1" ? false : "open1");
                          setStepscount(1);
                        }}
                        // onClick={() => alert("Please select Company Name OR Certificate /Vehicle /Engine-Battery /Chassis-Frame / Contact No")}
                        style={{
                          backgroundColor: "#7E00D1",
                          color: "white",
                          fontSize: "14px",
                          width: "144px",
                          height: "35px",
                        }}
                      >
                        Continue
                      </button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="row my-3 gx-5">
                  <div className="col-md-3 mb-4">
                    <FormControl fullWidth variant="outlined">
                      <Typography
                        id="Company-simple-select"
                        variant="h6"
                        gutterBottom
                      >
                        Company Name *
                      </Typography>

                      <TextField
                        fullWidth
                        placeholder="Company Name"
                        name="companyName"
                        label=" "
                        value={
                          searchCompamyData?.companyName ||
                          getallClaimData.companyName ||
                          formData?.CompanyName ||
                          ""
                        }
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                      {/* <MenuItem value="Shree Ram Finance">Shree Ram Finance</MenuItem>
                    <MenuItem value="Bajaj Igi">Bajaj Igi</MenuItem>
                    <MenuItem value="Hdfc">Hdfc </MenuItem> */}
                    </FormControl>
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Certificate No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Certificate No"
                      name="certificateNo"
                      value={formData.certificateNo || ""}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      First Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="First Name"
                      type="text"
                      name="CustomerFirstName"
                      value={formData?.CustomerFirstName || ""}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                      //   error
                      // label="Error"
                      // defaultValue="Name 123"
                      // helperText="Incorrect entry."
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="Last-Name-label" variant="h6" gutterBottom>
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Last Name"
                      name="CustomerLastName"
                      value={formData.CustomerLastName || ""}
                      onChange={handleChange}
                      type="text"
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography id="Vehicle-no-label" variant="h6" gutterBottom>
                      Vehicle No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Vehicle No"
                      type="Text"
                      name="VehicleNo"
                      value={formData.VehicleNo || ""}
                      inputProps={{ maxLength: 12 }}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Engine No/ Battery No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Engine No/ Battery No"
                      name="EngineNo_BatteryNo"
                      value={formData.EngineNo_BatteryNo || ""}
                      // onkeyDown={handletest}
                      onChange={handleChange}
                      type="text"
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Chassis No/ Frame No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Chassis No/ Frame No"
                      name="ChasisNo_FrameNo"
                      value={formData.ChasisNo_FrameNo || ""}
                      onChange={handleChange}
                      type="text"
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Email ID
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Email ID"
                      name="CustomerEmailid"
                      value={formData.CustomerEmailid || ""}
                      onChange={handleChange}
                      type="email"
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Contact No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Contact No"
                      name="CustomerMobileNo"
                      value={formData.CustomerMobileNo || ""}
                      inputProps={{ maxLength: 10 }}
                      onChange={handleChange}
                      type="telephone"
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Charger No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Charger No"
                      type="Text"
                      name="ChargerNo"
                      value={formData.charger_no || ""}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Invoice No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Invoice No"
                      type="Text"
                      name="Invoiceno"
                      value={formData.Invoiceno || ""}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="demo-simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Motor Serial No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Motor Serial No"
                      type="Text"
                      name="motorserialno"
                      value={formData.motorserialno || ""}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  {/* <div className='col-md-3 mb-4'>
                <Typography id="demo-simple-select-label" variant="h6" gutterBottom>Agent Id</Typography>
                <TextField fullWidth placeholder="Motor Serial No" type="Text"
                  value={formData.AgentId}
                  onChange={handleChange}
                  variant="outlined" required />
              </div> */}
               <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Call Time <span className="text-danger">*</span>
                    </Typography>
                    <TextField
                      type="datetime-local"
                      name="callTime"
                      value={
                        formData?.callTime || fetcdataListItems?.callTime || ""
                      }
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>

                  <div className="col-md-3 mb-4">
                    <FormControl fullWidth variant="outlined">
                      <Typography
                        id="Company-simple-select"
                        variant="h6"
                        gutterBottom
                      >
                        Policy Verification*
                      </Typography>

                      <Select
                        name="PolicyVerification"
                        required
                        value={formData.PolicyVerification || ""}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => {
                          if (!selected) {
                            return "Select Policy";
                          }
                          return selected;
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
                        <MenuItem value="" disabled>
                          Select Policy
                        </MenuItem>
                        <MenuItem value="Manual Verified">
                          Manual Verified
                        </MenuItem>
                        <MenuItem value="Unverified">Unverified</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-5">
                  {formData.CompanyName !== "" &&
                  formData.PolicyVerification !== "" &&
                  (formData.EngineNo_BatteryNo !== "" ||
                    formData.ChasisNo_FrameNo !== "" ||
                    formData.VehicleNo !== "") ? (
                    <>
                      <button
                        type="submit"
                        className="btn btn-light btn-md"
                        onClick={(e) => {
                          
                          e.preventDefault();
                            if (
                            !formData?.callTime &&
                            !fetcdataListItems?.callTime
                          ) {
                            toast.error(
                              "Please fill Call Time before continuing."
                            );
                            return; 
                          }

                          const missingFields = [];
                          // if (!!formData?.VehicleNo || !!formData?.EngineNo_BatteryNo || !!formData?.ChasisNo_FrameNo ) missingFields.push("Vehicle No / EngineNo_BatteryNo or ChasisNo_FrameNo");
                          // if (!formData?.EngineNo_BatteryNo) missingFields.push("Engine No");
                          // if (!formData?.ChasisNo_FrameNo) missingFields.push("Chassis No");
                          if (!formData?.PolicyVerification)
                            missingFields.push("Policy Verification");

                          if (missingFields.length > 0) {
                            alert(`Please select ${missingFields.join(", ")}`);
                          } else {
                            console.log(
                              "All required fields available:",
                              formData
                            );
                            setExpanded(expanded === "open1" ? false : "open1");
                            setStepscount(1);
                          }
                        }}
                        style={{
                          backgroundColor: "#7E00D1",
                          color: "white",
                          fontSize: "14px",
                          width: "144px",
                          height: "35px",
                        }}
                      >
                        Continue
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="btn btn-light btn-md"
                        onClick={(e) => {
                          e.preventDefault();
                            if (
                            !formData?.callTime &&
                            !fetcdataListItems?.callTime
                          ) {
                            toast.error(
                              "Please fill Call Time before continuing."
                            );
                            return; 
                          }

                          const missingFields = [];
                          // if (!formData?.VehicleNo  || !formData?.EngineNo_BatteryNo  || !formData?.ChasisNo_FrameNo ) alert("Vehicle No / EngineNo_BatteryNo or ChasisNo_FrameNo");
                          // if (!formData?.EngineNo_BatteryNo) missingFields.push("Engine No");
                          // if (!formData?.ChasisNo_FrameNo) missingFields.push("Chassis No");
                          if (!formData?.PolicyVerification)
                            missingFields.push("Policy Verification");

                          if (missingFields.length > 0) {
                            alert(`Please select ${missingFields.join(", ")}`);
                          } else {
                            setExpanded(expanded === "open1" ? false : "open1");
                            setStepscount(1);
                          }
                          console.log(
                            "All required fields available:",
                            formData
                          );
                        }}
                        style={{
                          backgroundColor: "#7E00D1",
                          color: "white",
                          fontSize: "14px",
                          width: "144px",
                          height: "35px",
                        }}
                      >
                        Continue
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </Container>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CreateCustomerTicket;
