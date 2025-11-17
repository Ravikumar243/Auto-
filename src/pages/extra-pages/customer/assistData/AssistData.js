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
import { OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateCustomerHooks, {
  CustomerContext,
} from "../createDetails/CreateCustomerHooks";
import axios from "axios";
import baseURL from "api/autoApi";
import { modalStyle } from "../Style";
import CircularProgress from "@mui/material/CircularProgress";

const productlist = [
  "Two Wheeler",
  "Three Wheeler",
  "Four Wheeler",
  "Commercial Vehicle",
];
const productMake = [
  "ASHOK LEYLAND",
  "ASTON MARTIN",
  "AUDI",
  "BAJAJ",
  "BENTLEY",
  "BMW",
  "CHEVROLET",
  "DAEWOO",
  "DATSUN",
  "DEFAULT",
  "EICHER POLARIS",
  "FERRARI",
  "FIAT",
  "FORCE MOTORS",
  "FORD",
  "GENERAL MOTORS",
  "HINDUSTAN MOTORS",
  "HONDA",
  "HUMMER",
  "HYUNDAI",
  "ISUZU",
  "JAGUAR",
  "JEEP",
  "KIA",
  "LAMBORGHINI",
  "LAND ROVER",
  "LEXUS",
  "MAHINDRA",
  "MAHINDRA RENAULT",
  "MARUTI",
  "MASERATI",
  "MERCEDES",
  "MITSUBISHI",
  "MORRIS GARAGE",
  "NISSAN",
  "OPEL",
  "PAL",
  "PIAGGIO",
  "PORSCHE",
  "PREMIER",
  "RENAULT",
  "ROLLS-ROYCE",
  "SKODA",
  "TATA",
  "TATA MOTORS",
  "TOYOTA",
  "VOLKSWAGEN",
  "VOLVO",
];
const productVarient = [
  "1012- Ecomet",
  "121-TATAMOTORS",
  "242 EICHER",
  "VLI - FORD",
  "N -MAHINDRA",
];

const AssistData = () => {
  const {
    citiesList,
    stateList,
    disabledFromStates,
    editable,
    searchCompamyData,
    loadingTest,
    stateCode,
    cities,
    states,
    formData,
    expanded,
    handleChange,
    handleChangedrop,
    handleAccordionChange,
    open,
    handleFileChange,
    generatedSRN,
    setExpanded,
    handleClose,
    getallClaimData,
    handleChangeclaimdata,
    searchdata,
    handleClaimData,
    formAssistance,
    fetcdataListItems,
    makeComaniesList,
  } = useContext(CustomerContext);

  const modelList = JSON.parse(localStorage.getItem("modelVariantList"));
  console.log(
    formData?.AlternateNumber,
    "getallclaimdatakkkdfkjd",
    fetcdataListItems?.AlternateNumber,
    "fetcdataListItemsksdjkfd"
  );

  return (
    <>
      <Accordion
        expanded={expanded === "open1"}
        sx={{ margin: "0px 0px 18px 0px" }}
        onChange={handleAccordionChange("open1")}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            bgcolor: expanded === "open1" ? "#7E00D1" : "#f5f5f5",
            width: "100%",
            borderRadius: 1,
            color: expanded === "open1" ? "white" : "#282828",
            height: "40px",
            minHeight:
              expanded === "open1" ? "50px !important" : "50px !important",
          }}
        >
          <Typography component="span" variant="h4">
            Assistance Data Entry — Total Service Availed:{" "}
            <strong>{fetcdataListItems?.totalCasesByMobile || 0}</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="lg">
            <Grid container>
              <div className="row my-3 gx-5">
                {/* <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Product<span className="text-danger">*</span>
                  </Typography>
                  
                  <Select
                    name="Product"
                    value={
                      formData.Product || searchCompamyData?.vehicleType || ""
                    }
                    fullWidth
                    required
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(select) => {
                      if (!select) {
                        return "Select Product";
                      }

                      return select;
                    }}
                    variant="outlined"
                     disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                           fetcdataListItems?.srN_Status === "Vendor Close Issue"
                        }
                  >
                    <MenuItem disabled value="">
                      Product Name
                    </MenuItem>
                    {productlist.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                
                </div>
                

                <div className="col-md-3 mb-4">
                  <Typography id="simple-Make-label" variant="h6" gutterBottom>
                    Car Segment<span className="text-danger">*</span>
                  </Typography>

                  <Select
                    name="Make"
                    fullWidth
                    required={!disabledFromStates.Make}
                    disabled={disabledFromStates.Make || fetcdataListItems?.rsaStatus === "Case Completed" ||
                           fetcdataListItems?.srN_Status === "Vendor Close Issue"}
                    value={formData.Make || ""}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return "Select Make";
                      }
                      return selected;
                    }}
                    onChange={handleChange}
                  
                  >
                    <MenuItem value="" disabled>
                      Select Make
                    </MenuItem>
                    {makeComaniesList?.map((item, index) => (
                      <MenuItem key={index} value={item?.make}>
                        {item.make}
                      </MenuItem>
                    ))}
                  </Select>
                </div> */}

                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Product<span className="text-danger">*</span>
                  </Typography>

                  <Select
                    name="Product"
                    value={
                      formData.Product || searchCompamyData?.vehicleType || ""
                    }
                    fullWidth
                    required
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(select) =>
                      !select ? "Select Product" : select
                    }
                    variant="outlined"
                    disabled={
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                      fetcdataListItems?.caseType === "Complete-Enquiry" ||
                      fetcdataListItems?.caseType === "Case Denied" ||
                      fetcdataListItems?.caseType === "Case Cancelled"
                    }
                  >
                    <MenuItem disabled value="">
                      Product Name
                    </MenuItem>
                    {productlist.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                {/* Make Dropdown */}
                <div className="col-md-3 mb-4">
                  <Typography id="simple-Make-label" variant="h6" gutterBottom>
                    Car Segment<span className="text-danger">*</span>
                  </Typography>

                  <Select
                    name="Make"
                    fullWidth
                    required={!disabledFromStates.Make}
                    disabled={
                      // disabledFromStates.Make ||
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                      fetcdataListItems?.caseType === "Complete-Enquiry" ||
                      fetcdataListItems?.caseType === "Case Denied" ||
                      fetcdataListItems?.caseType === "Case Cancelled"
                    }
                    value={formData.Make || ""}
                    displayEmpty
                    renderValue={(selected) =>
                      !selected ? "Select Make" : selected
                    }
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Select Make
                    </MenuItem>

                    {makeComaniesList.length === 0 ? (
                      <MenuItem disabled>
                        <CircularProgress
                          size={20}
                          style={{ marginRight: 8 }}
                        />
                        Loading...
                      </MenuItem>
                    ) : (
                      makeComaniesList.map((item, index) => (
                        <MenuItem key={index} value={item.make}>
                          {item.make}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </div>

                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-modal-varient-label"
                    variant="h6"
                    gutterBottom
                  >
                    Model Variant<span className="text-danger">*</span>
                  </Typography>

                  <Select
                    name="Model_Variant"
                    fullWidth
                    required
                    value={formData.Model_Variant || ""}
                    displayEmpty
                    renderValue={(selected) =>
                      selected ? selected : "Select Product"
                    }
                    onChange={handleChange}
                    disabled={
                      // disabledFromStates.Model_Variant === true ||
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                      fetcdataListItems?.caseType === "Complete-Enquiry" ||
                      fetcdataListItems?.caseType === "Case Denied" ||
                      fetcdataListItems?.caseType === "Case Cancelled"
                    }
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    {modelList?.map((item, index) => (
                      <MenuItem key={index} value={item?.model || ""}>
                        {item?.model || ""}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Customer First Name<span className="text-danger">*</span>
                  </Typography>
                  {disabledFromStates.CustomerFirstName === true ? (
                    <TextField
                      fullWidth
                      placeholder="Customer name"
                      name="CustomerFirstName"
                      required
                      type="text"
                      value={
                        formData.CustomerFirstName ||
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
                      placeholder="Customer name"
                      name="CustomerFirstName"
                      required
                      type="text"
                      value={formData.CustomerFirstName || ""}
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
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Customer Middle Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Customer Middle Name"
                    name="CustomerMiddleName"
                    value={formData.CustomerMiddleName || ""}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
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
                    Customer Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Customer Last Name"
                    name="CustomerLastName"
                    value={formData.CustomerLastName || ""}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
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
                    Customer Mobile No/
                    <span className="text-danger">*</span>
                  </Typography>
                  {disabledFromStates.CustomerMobileNo === true ? (
                    <TextField
                      fullWidth
                      placeholder="Customer Mobile No"
                      name="CustomerMobileNo"
                      type="text"
                      required
                      inputProps={{ maxLength: 10 }}
                      value={
                        formData.CustomerMobileNo ||
                        getallClaimData.contactNo ||
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
                  ) : (
                    <TextField
                      fullWidth
                      placeholder="Customer Mobile No"
                      name="CustomerMobileNo"
                      type="text"
                      required
                      inputProps={{ maxLength: 10 }}
                      value={formData.CustomerMobileNo || ""}
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
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Alternate Mobile No
                  </Typography>
                  {disabledFromStates.AlternateNumber === true ? (
                    <TextField
                      fullWidth
                      placeholder="Alternate Mobile No"
                      name="AlternateNumber"
                      type="text"
                      inputProps={{ maxLength: 10 }}
                      value={
                        formData.AlternateNumber ||
                        getallClaimData.AlternateNumber ||
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
                  ) : (
                    <TextField
                      fullWidth
                      placeholder="Alternate Mobile No"
                      name="AlternateNumber"
                      type="text"
                      inputProps={{ maxLength: 10 }}
                      value={formData.AlternateNumber}
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
                    id="City-simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Select State<span className="text-danger">*</span>
                  </Typography>
                  {/* {disabledFromStates.State === true ? (
                    <Select
                      name="State"
                      displayEmpty
                      fullWidth
                      renderValue={(selected) => {
                        if (!selected) {
                          return "Select State";
                        }
                        return selected;
                      }}
                      required
                      value={formData.State || ""}
                      // onChange={handleChangedrop}
                      onChange={handleChangedrop}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      disabled
                    >
                      {stateList.map((state, index) => (
                        <MenuItem key={index} id={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : ( */}
                  <Select
                    name="State"
                    displayEmpty
                    fullWidth
                    renderValue={(selected) => {
                      if (!selected) {
                        return "Select State";
                      }
                      return selected;
                    }}
                    required
                    value={formData.State || ""}
                    onChange={handleChangedrop}
                    // onChange={handleChange}
                    variant="outlined"
                    disabled={
                      disabledFromStates.State === true ||
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                      fetcdataListItems?.caseType === "Complete-Enquiry" ||
                      fetcdataListItems?.caseType === "Case Denied" ||
                      fetcdataListItems?.caseType === "Case Cancelled"
                    }
                  >
                    <MenuItem value="">Select a State</MenuItem>
                    {stateList.map((state, index) => (
                      <MenuItem key={index} id={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* )} */}
                </div>
                <div className="col-md-3 mb-4">
                  <Typography
                    id="City-simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Select City<span className="text-danger">*</span>
                  </Typography>
                  {/* {disabledFromStates.City === true ? (
                    <Select
                      fullWidth
                      placeholder="City"
                      type="text"
                      name="City"
                      value={formData.City || ""}
                      displayEmpty
                      onChange={handleChange}
                      renderValue={(selected) => {
                        if (!selected) {
                          return "Select City";
                        }
                        return selected;
                      }}
                      variant="outlined"
                      required
                     
                    >
                     {citiesList.map((city, index) => (
                        <MenuItem key={index} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                     
                    </Select>
                  ) : ( */}
                  <Select
                    fullWidth
                    placeholder="City"
                    type="text"
                    name="City"
                    value={formData.City || ""}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return "Select City";
                      }
                      return selected;
                    }}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    disabled={
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                      fetcdataListItems?.caseType === "Complete-Enquiry" ||
                      fetcdataListItems?.caseType === "Case Denied" ||
                      fetcdataListItems?.caseType === "Case Cancelled"
                    }
                  >
                    {console.log(citiesList, "cityList11111")}
                    {citiesList.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                    {/* {cities.map(city => (
                        <MenuItem key={city.name} value={city.name}>{city.name}</MenuItem>
                      ))} */}
                  </Select>
                  {/* )} */}
                </div>
                <div className="col-md-3 mb-4">
                  <Typography
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Vehicle No <span className="text-danger">*</span>
                  </Typography>
                  {disabledFromStates.VehicleNo === true ? (
                    <TextField
                      fullWidth
                      placeholder="Vehicle No"
                      type="text"
                      name="VehicleNo"
                      value={
                        formData.VehicleNo || getallClaimData?.vehicleNo || ""
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
                      type="text"
                      name="VehicleNo"
                      value={
                        formData.VehicleNo || getallClaimData?.vehicleNo || ""
                      }
                      onChange={handleChange}
                      variant="outlined"
                      required
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
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Engine No / Battery No
                  </Typography>
                  {disabledFromStates.EngineNo_BatteryNo === true ? (
                    <TextField
                      fullWidth
                      placeholder="Engine No"
                      name="EngineNo_BatteryNo"
                      value={
                        formData.EngineNo_BatteryNo ||
                        getallClaimData.engineNo_BatteryNo ||
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
                      placeholder="Engine No"
                      name="EngineNo_BatteryNo"
                      value={formData.EngineNo_BatteryNo || ""}
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
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Chassis No / Frame No
                  </Typography>
                  {disabledFromStates.ChasisNo_FrameNo === true ? (
                    <TextField
                      fullWidth
                      placeholder="Chassis No"
                      name="ChasisNo_FrameNo"
                      value={
                        formData.ChasisNo_FrameNo ||
                        getallClaimData.chassisNo_FrameNo ||
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
                      placeholder="Chassis No"
                      name="ChasisNo_FrameNo"
                      value={formData.ChasisNo_FrameNo || ""}
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
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Customer Email ID
                  </Typography>
                  {disabledFromStates.CustomerEmailid === true ? (
                    <TextField
                      fullWidth
                      placeholder="Customer email id"
                      name="CustomerEmailid"
                      value={
                        formData.CustomerEmailid ||
                        getallClaimData.email ||
                        searchCompamyData?.customerEmailid ||
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
                      placeholder="Customer email id"
                      name="CustomerEmailid"
                      value={formData.CustomerEmailid || ""}
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
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Policy No
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Policy No"
                    name="PolicyNumber"
                    type="text"
                    value={formData.PolicyNumber || ""}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
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
                    Policy Start Date
                  </Typography>
                  {disabledFromStates.PolicyStartDate === true ? (
                    <TextField
                      fullWidth
                      name="PolicyStartDate"
                      type="Text"
                      value={formData.PolicyStartDate || ""}
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
                      name="PolicyStartDate"
                      type="date"
                      value={formData.PolicyStartDate || ""}
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
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Policy End Date
                  </Typography>
                  {disabledFromStates.PolicyEndDate === true ? (
                    <TextField
                      fullWidth
                      name="PolicyEndDate"
                      type="Text"
                      value={formData.PolicyEndDate}
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
                      name="PolicyEndDate"
                      type="date"
                      value={formData.PolicyEndDate || ""}
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
                    id="simple-select-label"
                    variant="h6"
                    gutterBottom
                  >
                    Upload File
                  </Typography>
                  <TextField
                    name="Upload"
                    onChange={handleFileChange}
                    type="file"
                    fullWidth
                    accept="image/*, .pdf"
                    disabled={
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                      fetcdataListItems?.caseType === "Complete-Enquiry" ||
                      fetcdataListItems?.caseType === "Case Denied" ||
                      fetcdataListItems?.caseType === "Case Cancelled"
                    }
                  />
                </div>

                {/* <div className="col-md-3 d-flex align-items-end mb-4">
                  <button
                    className="btn text-white w-100"
                    style={{
                      backgroundColor:"#7E00D1",
                    
                    }}
                    // onClick={handleDownloadHistory}
                  >
                    Download Case History
                  </button>
                </div> */}
                <div className="d-flex justify-content-center gap-5">
                  {loadingTest === true ? (
                    <button
                      type="submit"
                      disabled
                      className="btn btn-light btn-md"
                      style={{
                        backgroundColor: "#7E00D1",
                        color: "white",
                        fontSize: "14px",
                        width: "144px",
                        height: "35px",
                      }}
                    >
                      Submiting ...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-light btn-md"
                      style={{
                        backgroundColor: "#7E00D1",
                        color: "white",
                        fontSize: "14px",
                        width: "144px",
                        height: "35px",
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
              </div>
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography
                  id="modal-modal-title"
                  fullWidth
                  variant="h4"
                  component="h2"
                  sx={{
                    bgcolor: "green",
                    padding: "10px",
                    color: "white",
                    borderRadius: "5px 5px 0px 0px",
                  }}
                >
                  Success
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, padding: "10px" }}
                >
                  Assistance details saved successfully.Assist Reference Number:
                  <strong>{generatedSRN}</strong>
                </Typography>
                <hr />
                <div className="d-flex justify-content-end m-3">
                  <button
                    type="button"
                    className="btn btn-light btn-md"
                    onClick={handleClose}
                    style={{
                      border: "1px solid #7E00D1",
                      color: "#7E00D1",
                      fontSize: "14px",
                      width: "50px",
                      height: "40px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                {/* </div> */}
              </Box>
            </Modal>
          </Container>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AssistData;
