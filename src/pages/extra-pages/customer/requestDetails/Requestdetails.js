import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Typography,
  Container,
} from "@mui/material";

import CreateCustomerHooks, { CustomerContext } from "../createDetails/CreateCustomerHooks";
import Accordion from "@mui/material/Accordion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { OutlinedInput } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import baseURL from "api/autoApi";
import axios from "axios";
import { toast } from "react-toastify";

const incidetails = [
  "Car to Car",
  "2W-Flat Bed",
  "3W-Flat Bed",
  "Hydra",
  "0 Degree",
  "4W-Flat Bed",
  "Under Lift",
];
const vendorRemarks = [
  "Customer details pending",
  "Drop location pending from client",
  "Delay from Network team",
  "RSA confirmation awaited",
];
const incidentDetails = [
  "Empty Tank - Need Refill(FUEL-PETROL)",
  "Empty Tank - Need Refill(FUEL-DIESEL)",
  "Broken Key/Lost Key",
  "Locked Keys in Car",
  "Need Puncture Repair",
  "Change Spare Wheel",
  "Battery Jump Start",
  "Tyre Puncture",
  "Fuel Delivery",
  "Key Lock Inside",
  "Fuel Provide",
  "Flat Tyre",
];

const rsric = [
  "Empty Tank-Need refill (Fuel -Petrol)",
  "Empty Tank-Need refill (Fuel-Diesel)",
  "Fuel Delivery",
  "Battery Jump-start",
  "Flat-Tyre",
  "Key Locked-Out",
  "Broken/ Lost Key",
];
const towingic = [
  "4W-Flatbed",
  "2W-Flatbed",
  "3W-Flat Bed",
  "Underlift",
  "Zero-Degree",
  "Mini Truck",
  "Car to Car",
  "Hydra",
];
const insuranceic = [
  "Complimentary PA",
  "Complimentary Medical Accident Cover",
  "Complimentary Hospicash",
  "Complimentary Loan Protect",
];
const taxiassitanceic = ["Taxi Assistance"];
const hotelassitanceic = ["Hotel Assistance"];

const rsrev = ["Battery Jump-start", "Key Locked-Out", "Tyre deflated"];
const towingev = [
  "4W-Flatbed",
  "2W-Flatbed",
  "Underlift",
  "Zero-Degree",
  "Mini Truck",
  "Car to Car",
  "Hydra",
];
const insuranceev = [
  "Complimentary PA",
  "Complimentary Medical Accident Cover",
  "Complimentary Hospicash",
  "Complimentary Loan Protect",
];
  const subCategoryOptions = {
    "Complete-Enquiry": [
      "Complete-Enquiry",
      
    ],
    "Case Denied": ["Vehicle Started", "Customer Arrage Alternative Service"],
    "Case Cancelled": [
      "RSA Not Covered",
      "RSA With Other Company",
      "Issue Fixed",
      "Customer Will Call Back Later",
      "Police Involvement",
      "Out Of Scope",
      "Customer Not Responding",
      "Not Ready to Wait as Per Standard ETA",
      "Duplicate Case Id",
      "Cancel By Client",
      "Other Reason",
      "Refused for Extra KM and Toll Charges",
      "Network Failure",
      "Location Change",
      "Service Center unavailability",
      "Vehicle is in Drivable Condition",
      "Vehicle is at Service Center",
      "Have Not placed any RSA request",
      "Not Entry Zone",
    ],
  };
const taxiassitanceev = ["Taxi Assistance"];
const hotelassitanceev = ["Hotel Assistance"];
// const incireason = [];
const Requestdetails = () => {
  const {
    inputdropValue,
  loadingTest,
  expanded,
  handleAccordionChange,
  handleService,
  formIncident,
  fetcdataListItems,
  handleIncidenceClose,
  handleIncidenceOpen,
  handleCoordinates,
  handleServiceDetails,
  area,
  incidentStatus,
  handleInput_Change,
  loading,
  suggestions_drop,
  handleSelectDrop,
  generatedSRN,
  remarkLoading,
  remarkLogsData,
} = useContext(CustomerContext)

  useEffect(() => {
    localStorage.setItem("incident_lats", fetcdataListItems?.user_Latitude);
    localStorage.setItem("incident_lons", fetcdataListItems?.uSer_Longitude);
  }, [fetcdataListItems]);

  // const handleIncidentDetails = (vall) => {
  // 	alert(vall);
  // 	if (value === 'TOWING') {
  // 		incireason = ["Accident", "Break Failure", "Breakdown", "Clutch Issue", "Flat Tyre", "Fuel Delivery", "Other"]
  // 	} else {
  // 		incireason = [
  // 			"Empty Tank - Need Refill(FUEL-PETROL)", "Empty Tank - Need Refill(FUEL-DIESEL)", "Broken Key/Lost Key", "Locked Keys in Car",
  // 			"Need Puncture Repair", "Change Spare Wheel", "Battery Jump Start", "Tyre Puncture", "Fuel Delivery", "Key Lock Inside", "Fuel Provide", "Flat Tyre"];
  // 	}
  // }
  const incireason = [
    "Accident",
    "Break Failure",
    "Breakdown",
    "Clutch Issue",
    "Engine Issue",
    "Engine Oil Leakage",
    "Flat Tyre",
    "Fuel Delivery",
    "Gear Issue",
    "Miscellaneous",
    "Others",
    "Overheating",
    "Radiator Leakage",
    "Starting Issue",
    "Vehicle Suspension Down",
  ];
  // "Tyre burst", "Starting Issue","Vehicle not moving","Vehicle breakdown","Accident","Keys lost",
  const incireasonEv = [
    "Immobilizer not working",
    "Fire",
    "Break Failure",
    "Clutch Issue",
    "Gear Issue",
    "Over Heating",
    "Radiator Leakage",
    "Vehicle Suspension Down",
    "Others",
  ];
  // const handleMapLocation = (lx, ly, ulx, uly) => {
  // 	//alert(`${lx}, ${ly}, ${ulx}, ${uly}`);
  // 	const googleMapsLink = (() => {
  // 		if (lx && ly && ulx && uly) {
  // 			return `https://www.google.com/maps/dir/?api=1&origin=${lx},${ly}&destination=${ulx},${uly}&travelmode=driving`;
  // 		}
  // 		return '';
  // 	})();
  // 	console.log("Google Maps Link:", googleMapsLink);
  // 	// Optional: open in new tab
  // 	if (googleMapsLink) {
  // 		window.open(googleMapsLink, '_blank');
  // 	}
  // }
  return (
    <>
      <Accordion
        expanded={expanded === "open4"}
        onChange={handleAccordionChange("open4")}
        sx={{ margin: "0px 0px 18px 0px" }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            bgcolor: expanded === "open4" ? "#7E00D1" : "#f5f5f5",
            width: "100%",
            borderRadius: 1,
            color: expanded === "open4" ? "white" : "#282828",
            height: "40px",
            minHeight:
              expanded === "open1" ? "50px !important" : "50px !important",
          }}
        >
          <Typography component="span" variant="h4">
            Service Request Details
          </Typography>
        </AccordionSummary>
        <form onSubmit={handleServiceDetails}>
          <AccordionDetails>
            <Container maxWidth="lg">
              <Grid>
                <div className="row my-3 gx-5">
                  <div className="col-md-3 ">
                    <Typography
                      id="simple-Make-label"
                      variant="h6"
                      gutterBottom
                    >
                      Vehicle Type<span className="text-danger">*</span>
                    </Typography>

                    <Select
                      name="vehicleType"
                      fullWidth
                      required
                      value={formIncident?.vehicleType ||  ""}
                      displayEmpty
                      renderValue={(select) => {
                        if (!select) {
                          return "Select Make";
                        }
                        return select;
                      }}
                      onChange={handleService}
                       disabled={
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
                      <MenuItem value="IC Vehicle">IC Vehicle</MenuItem>
                      <MenuItem value="Ev Vehicle">Ev Vehicle</MenuItem>
                    </Select>
                    {/* </div> */}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Select Incident<span className="text-danger">*</span>
                    </Typography>
                    {fetcdataListItems?.serviceDrop_IncidentType ? (
                      <Select
                        name="incident"
                        value={formIncident.incident || ""}
                        fullWidth
                        onChange={handleService}
                        displayEmpty
                        renderValue={(select) => {
                          if (!select) {
                            return "Select";
                          }
                          return select;
                        }}
                        required
                        input={<OutlinedInput readOnly />}
                      >
                        <MenuItem value="" disabled>
                          Select{" "}
                        </MenuItem>

                        <MenuItem
                          value="RSR"
                          onClick={handleIncidenceClose}
                          sx={{ fontSize: "16px" }}
                        >
                          RSR
                        </MenuItem>
                        <MenuItem
                          value="TOWING"
                          onClick={handleIncidenceOpen}
                          sx={{ fontSize: "16px" }}
                        >
                          Towing
                        </MenuItem>
                      </Select>
                    ) : (
                      <Select
                        name="incident"
                        value={formIncident.incident || ""}
                        fullWidth
                        onChange={handleService}
                        displayEmpty
                        renderValue={(select) => (select ? select : "Select")}
                        required
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value="RSR" sx={{ fontSize: "16px" }}>
                          RSR
                        </MenuItem>
                        <MenuItem value="TOWING" sx={{ fontSize: "16px" }}>
                          Towing
                        </MenuItem>
                        <MenuItem value="Insurance" sx={{ fontSize: "16px" }}>
                          Insurance
                        </MenuItem>
                        <MenuItem
                          value="Taxi Assistance"
                          sx={{ fontSize: "16px" }}
                        >
                          Taxi Assistance
                        </MenuItem>
                        <MenuItem
                          value="Hotel Assistance"
                          sx={{ fontSize: "16px" }}
                        >
                          Hotel Assistance
                        </MenuItem>
                      </Select>
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Incident Details<span className="text-danger">*</span>
                    </Typography>
                    {fetcdataListItems?.serviceDrop_IncidentDetails ? (
                      <Select
                        fullWidth
                        name="incidentDetails"
                        value={formIncident.incidentDetails || ""}
                        displayEmpty
                        renderValue={(select) => {
                          if (!select) {
                            return "Select";
                          }
                          return select;
                        }}
                        onChange={handleService}
                        required
                        input={<OutlinedInput readOnly />}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        {formIncident.incident === "TOWING" &&
                          incidetails.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        {formIncident.incident === "RSR" &&
                          incidentDetails.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                      </Select>
                    ) : (
                      <>
                        {(fetcdataListItems.vehicleType === "IC Vehicle" ||
                          " ") && (
                          <>
                            <Select
                              fullWidth
                              name="incidentDetails"
                              value={formIncident.incidentDetails || ""}
                              displayEmpty
                              renderValue={(select) => {
                                if (!select) {
                                  return "Select";
                                }
                                return select;
                              }}
                              onChange={handleService}
                              required
                            >
                              <MenuItem value="" disabled>
                                Select
                              </MenuItem>
                              {formIncident.incident === "TOWING" &&
                                towingic.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              {formIncident.incident === "RSR" &&
                                rsric.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              {formIncident.incident === "Insurance" &&
                                insuranceic.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              {formIncident.incident === "Taxi Assistance" &&
                                taxiassitanceic.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              {formIncident.incident === "Hotel Assistance" &&
                                hotelassitanceic.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                            </Select>
                          </>
                        )}
                        {fetcdataListItems.vehicleType === "Ev Vehicle" && (
                          <>
                            <Select
                              fullWidth
                              name="incidentDetails"
                              value={formIncident.incidentDetails || ""}
                              displayEmpty
                              renderValue={(select) => {
                                if (!select) {
                                  return "Select";
                                }
                                return select;
                              }}
                              onChange={handleService}
                              required
                            >
                              <MenuItem value="" disabled>
                                Select
                              </MenuItem>
                              {formIncident.incident === "TOWING" &&
                                towingev.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              {formIncident.incident === "RSR" &&
                                rsrev.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              {formIncident.incident === "Insurance" &&
                                insuranceev.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              {formIncident.incident === "Taxi Assistance" &&
                                taxiassitanceev.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              {formIncident.incident === "Hotel Assistance" &&
                                hotelassitanceev.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                            </Select>
                          </>
                        )}
                      </>
                    )}
                    {/* <TextField fullWidth placeholder="Incident Deatils" type="text" name="incidentDetails"
											value={formIncident.incidentDetails} onChange={handleService} variant="outlined" /> */}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Incident Reasons<span className="text-danger">*</span>
                    </Typography>
                    {fetcdataListItems?.serviceDrop_IncidentReason ? (
                      <Select
                        fullWidth
                        name="incidentReason"
                        value={formIncident.incidentReason || ""}
                        displayEmpty
                        renderValue={(select) => {
                          if (!select) {
                            return "Select";
                          }
                          return select;
                        }}
                        onChange={handleService}
                        required
                        input={<OutlinedInput readOnly />}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        {incireason.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <>
                        {(fetcdataListItems.vehicleType === "IC Vehicle" ||
                          " ") && (
                          <>
                            <Select
                              fullWidth
                              name="incidentReason"
                              value={formIncident.incidentReason || ""}
                              displayEmpty
                              renderValue={(select) => {
                                if (!select) {
                                  return "Select";
                                }
                                return select;
                              }}
                              onChange={handleService}
                              required
                            >
                              <MenuItem value="" disabled>
                                Select
                              </MenuItem>
                              {[
                                "Empty Tank-Need refill (Fuel -Petrol)",
                                "Empty Tank-Need refill (Fuel-Diesel)",
                                "Fuel Delivery",
                              ].includes(formIncident.incidentDetails) && (
                                <MenuItem value="Fuel Delivery">
                                  Fuel Delivery
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Battery Jump-start" && (
                                <MenuItem value="Starting Issue/Dead Battery">
                                  Starting Issue/Dead Battery
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails === "Flat-Tyre" && (
                                <MenuItem value="Flat-Tyre">Flat-Tyre</MenuItem>
                              )}

                              {formIncident.incidentDetails ===
                                "Key Locked-Out" && (
                                <MenuItem value="Key Locked-Out">
                                  Key Locked-Out
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Broken/ Lost Key" && (
                                <MenuItem value="Broken/ Lost Key">
                                  Broken/ Lost Key
                                </MenuItem>
                              )}

                              {[
                                "4W-Flatbed",
                                "2W-Flatbed",
                                "3W-Flat Bed",
                                "Underlift",
                                "Zero-Degree",
                                "Mini Truck",
                                "Car to Car",
                                "Hydra",
                              ].includes(formIncident.incidentDetails) &&
                                incireason.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}

                              {formIncident.incidentDetails ===
                                "Complimentary PA" && (
                                <MenuItem value="Complimentary PA">
                                  Complimentary PA
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Complimentary Medical Accident Cover" && (
                                <MenuItem value="Complimentary Medical Accident Cover">
                                  Complimentary Medical Accident Cover
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Complimentary Hospicash" && (
                                <MenuItem value="Complimentary Hospicash">
                                  Complimentary Hospicash
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Complimentary Loan Protect" && (
                                <MenuItem value="Complimentary Loan Protect">
                                  Complimentary Loan Protect
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Taxi Assistance" && (
                                <MenuItem value="Taxi Assistance">
                                  Taxi Assistance
                                </MenuItem>
                              )}

                              {formIncident.incidentDetails ===
                                "Hotel Assistance" && (
                                <MenuItem value="Hotel Assistance">
                                  Hotel Assistance
                                </MenuItem>
                              )}
                            </Select>
                          </>
                        )}
                        {fetcdataListItems.vehicleType === "Ev Vehicle" && (
                          <>
                            <Select
                              fullWidth
                              name="incidentReason"
                              value={formIncident.incidentReason || ""}
                              displayEmpty
                              renderValue={(select) => {
                                if (!select) {
                                  return "Select";
                                }
                                return select;
                              }}
                              onChange={handleService}
                              required
                            >
                              <MenuItem value="" disabled>
                                Select
                              </MenuItem>

                              {formIncident.incidentDetails ===
                                "Battery Jump-start" && (
                                <MenuItem value="Auxiliary- Battery discharge">
                                  Auxiliary- Battery discharge
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Key Locked-Out" && (
                                <MenuItem value="Key Locked-Out">
                                  Key Locked-Out
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Tyre deflated" && (
                                <MenuItem value="Tyre deflated">
                                  Tyre deflated
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Broken/ Lost Key" && (
                                <MenuItem value="Broken/ Lost Key">
                                  Broken/ Lost Key
                                </MenuItem>
                              )}

                              {formIncident.incidentDetails ===
                                "4W-Flatbed" && (
                                <MenuItem value="Tyre burst">
                                  Tyre burst
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "2W-Flatbed" && (
                                <MenuItem value="Starting Issue">
                                  Starting Issue
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails === "Underlift" && (
                                <MenuItem value="Vehicle not moving">
                                  Vehicle not moving
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Zero-Degree" && (
                                <MenuItem value="Vehicle breakdown">
                                  Vehicle breakdown
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Mini Truck" && (
                                <MenuItem value="">Accident</MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Car to Car" && (
                                <MenuItem value="Keys lost">Keys lost</MenuItem>
                              )}
                              {/* "4W-Flatbed", "2W-Flatbed", "Underlift", "Zero-Degree", "Mini Truck", "Car to Car", */}
                              {["Hydra"].includes(
                                formIncident.incidentDetails
                              ) &&
                                incireasonEv.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}

                              {formIncident.incidentDetails ===
                                "Complimentary PA" && (
                                <MenuItem value="Complimentary PA">
                                  Complimentary PA
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Complimentary Medical Accident Cover" && (
                                <MenuItem value="Complimentary Medical Accident Cover">
                                  Complimentary Medical Accident Cover
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Complimentary Hospicash" && (
                                <MenuItem value="Complimentary Hospicash">
                                  Complimentary Hospicash
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Complimentary Loan Protect" && (
                                <MenuItem value="Complimentary Loan Protect">
                                  Complimentary Loan Protect
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Taxi Assistance" && (
                                <MenuItem value="Taxi Assistance">
                                  Taxi Assistance
                                </MenuItem>
                              )}
                              {formIncident.incidentDetails ===
                                "Hotel Assistance" && (
                                <MenuItem value="Hotel Assistance">
                                  Hotel Assistance
                                </MenuItem>
                              )}
                            </Select>
                          </>
                        )}
                      </>
                    )}
                    {/* <TextField fullWidth placeholder="Incident Reasons" type="text" name="incidentReason"
											value={formIncident.incidentReason} onChange={handleService} variant="outlined" /> */}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      State
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      // value={fetcdataListItems?.state || ''}
                      value={fetcdataListItems?.incident_State || ""}
                      onChange={handleService}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      City
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      value={fetcdataListItems?.incident_City || ""}
                      onChange={handleService}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Mobile No<span className="text-danger">*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      value={fetcdataListItems?.customerMobileNo || ""}
                      onChange={handleService}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>

                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Select Location<span className="text-danger">*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Select Location"
                      type="text"
                      name=""
                      value={fetcdataListItems?.incident_Location || ""}
                      variant="outlined"
                    />
                    {/* <TextField fullWidth placeholder="Select Location updates" type="text" variant="outlined"
											value={area}
											// value={fetcdataListItems?.incident_Location || ''}
											onChange={handleCoordinates} required /> */}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Landmark
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="landmark"
                      value={fetcdataListItems?.incident_Landmark}
                      // value={fetcdataListItems?.incident_AssistanceSummary || ''}
                      onChange={handleService}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Pincode
                    </Typography>
                    <TextField
                      fullWidth
                      name="pincode"
                      value={fetcdataListItems.incident_Pincode || ""}
                      type="text"
                      onChange={handleService}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Location Type<span className="text-danger">*</span>
                    </Typography>
                    <Select
                      name="locationType"
                      value={formIncident.locationType}
                      fullWidth
                      onChange={handleService}
                       disabled={
                            fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Within City">Within City</MenuItem>
                      <MenuItem value="Outside City">Outside City</MenuItem>
                      <MenuItem value="Home">Home</MenuItem>
                    </Select>
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Assistance Summary<span className="text-danger">*</span>
                    </Typography>
                    {fetcdataListItems?.externalAssistanceSummary !== "" ? (
                      <TextareaAutosize
                        placeholder="Assistance Summary"
                        minRows="3"
                        type="text"
                        value={fetcdataListItems?.externalAssistanceSummary}
                        onChange={(e) => e.target.value}
                        variant="outlined"
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          padding: "0px 5px",
                          resize: "none",
                          backgroundColor: "#f5f5f5",
                        }}
                         disabled={
                            fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                    ) : (
                      <TextareaAutosize
                        placeholder="Assistance Summary"
                        minRows="3"
                        type="text"
                        name="assistanceSummary"
                        value={formIncident.assistanceSummary || ""}
                        onChange={handleService}
                        variant="outlined"
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          padding: "0px 5px",
                          resize: "none",
                        }}
                        required
                         disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status === "Vendor Close Issue"
                        }
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4" style={{ display: "none" }}>
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Assistance Summary History{" "}
                    </Typography>
                    <TextareaAutosize
                      placeholder="Assistance Summary"
                      minRows="3"
                      type="text"
                      value={
                        fetcdataListItems?.incident_AssistanceSummary || ""
                      }
                      onChange={(e) => e.target.value}
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
                    {fetcdataListItems?.externalAssistanceSummary_Drop !==
                    "" ? (
                      <TextareaAutosize
                        placeholder="External assistance Summary"
                        minRows={3}
                        type="text"
                        name="externalAssistanceSummary"
                        value={
                          fetcdataListItems?.externalAssistanceSummary_Drop
                        }
                        variant="outlined"
                        onChange={handleService}
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          padding: "0px 5px",
                          resize: "none",
                          backgroundColor: "#f5f5f5",
                        }}
                        disabled
                      />
                    ) : (
                      <TextareaAutosize
                        placeholder=""
                        minRows={3}
                        type="text"
                        name="externalAssistanceSummaryHistroy"
                        value={fetcdataListItems?.externalAssistanceSummary}
                        variant="outlined"
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          padding: "0px 5px",
                          resize: "none",
                          backgroundColor: "#f5f5f5",
                          fontSize: "16px",
                        }}
                      />
                    )}
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
                      name="externalAssistanceSummaryHistroy"
                      value={fetcdataListItems?.externalAssistanceSummary}
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

                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Vendor Not Assign Remark
                    </Typography>
                    <Select
                      name="vendorNotAssignRemark"
                      value={formIncident.vendorNotAssignRemark}
                      fullWidth
                      displayEmpty
                      renderValue={(select) => {
                        if (!select) {
                          return "Select";
                        }
                        return select;
                      }}
                      onChange={handleService}
                       disabled={
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
                      {vendorRemarks.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
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
                </div>
              </Grid>
            </Container>
          </AccordionDetails>
           <AccordionDetails>
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
                      name="caseType"
                      value={formIncident.caseType || ""}
                      onChange={handleService}
                      displayEmpty
                      renderValue={(selected) =>
                        selected ? selected : "Select"
                      }
                       disabled={
                          fetcdataListItems?.rsaStatus === "Case leleted" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Complete-Enquiry">
                        Complete-Enquiry
                      </MenuItem>
                      <MenuItem value="Case Denied">Case Denied</MenuItem>
                      <MenuItem value="Case Cancelled">Case Cancelled</MenuItem>
                    </Select>
                  </div>

                  {/* Sub Category Dropdown */}
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
                      name="subCategory"
                      value={formIncident.subCategory || ""}
                      onClick={() => {
                        if (!formIncident.caseType) {
                          toast.error("Please select Case Type first!");
                          // alert("Please select Case Type first!")
                        }
                      }}
                      onChange={handleService}
                      displayEmpty
                      renderValue={(selected) =>
                        selected ? selected : "Select"
                      }
                       disabled={
                        !formIncident.caseType||
                          fetcdataListItems?.rsaStatus === "Case leleted" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                    >
                      <MenuItem value="">Select</MenuItem>

                      
                     {Array.isArray(
                        subCategoryOptions[formIncident.caseType]
                      ) &&
                        subCategoryOptions[formIncident.caseType].map(
                          (item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          )
                        )}
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
                      name="requestType"
                      value={formIncident?.requestType}
                      displayEmpty
                      onChange={handleService}
                      renderValue={(select) => {
                        if (!select) {
                          return "Select";
                        }
                        return select;
                      }}
                      disabled={
                          fetcdataListItems?.rsaStatus === "Case leleted" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Planned">Planned</MenuItem>
                      <MenuItem value="Unplanned">Unplanned</MenuItem>
                    </Select>
                  </div>
                </div>
              </Grid>
            </Container>
          </AccordionDetails>
          {console.log(incidentStatus, "incident status")}
          {incidentStatus && !formIncident.caseType ? (
            <div>
              <Typography
                id="simple-select-label"
                variant="h4"
                sx={{ bgcolor: "#FaF3ff", padding: "20px 10px" }}
                gutterBottom
              >
                Distance From Incident Location to Drop Location
              </Typography>
              <AccordionDetails>
                <Container maxWidth="lg">
                  <Grid>
                    <div className="row my-3 gx-5">
                      <div className="col-md-5 mb-4">
                        <Typography variant="h6" gutterBottom>
                          Drop Location
                        </Typography>
                        <div
                          className="autocomplete-wrapper"
                          style={{ position: "relative" }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Enter a location"
                            type="text"
                            name="dropLocation"
                            variant="outlined"
                            value={
                              formIncident.dropLocation !== ""
                                ? formIncident.dropLocation
                                : inputdropValue
                            }
                            onChange={handleInput_Change}
                            required
                          />

                          {loading && (
                            <div
                              className="loading-spinner"
                              style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                              }}
                            >
                              <span
                                className="spinner-border spinner-border-sm text-primary"
                                role="status"
                              />
                            </div>
                          )}

                          {suggestions_drop.length > 1 && (
                            <ul
                              className="autocomplete-suggestions"
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                backgroundColor: "#fff",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                borderRadius: "4px",
                                zIndex: 1000,
                                marginTop: "4px",
                                padding: 0,
                                listStyle: "none",
                                maxHeight: "200px",
                                overflowY: "auto",
                              }}
                            >
                              {suggestions_drop.map((place) => (
                                <li
                                  key={place.place_id}
                                  onClick={() =>
                                    handleSelectDrop(
                                      place,
                                      fetcdataListItems?.incident_Location
                                    )
                                  }
                                  style={{
                                    padding: "10px 15px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #eee",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.background =
                                      "#f1f1f1")
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.background =
                                      "transparent")
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{ color: "#007bff" }}
                                  />
                                  <span>{place.display_name}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                      <div className="col-md-5 mb-4">
                        <Typography
                          id="simple-select-label"
                          variant="h6"
                          gutterBottom
                        >
                          Kilometer (KM)
                        </Typography>
                        {/* fetcdataListItems?.serviceDrop_KiloMeter || formIncident.kiloMeter */}
                        <TextField
                          fullWidth
                          placeholder="Kilometer"
                          type="text"
                          name="kiloMeter"
                          value={
                            formIncident.kiloMeter ? formIncident.kiloMeter : ""
                          }
                          onChange={handleService}
                          variant="outlined"
                        />
                      </div>
                      {/* <div className='col-md-2 '>
												<Typography id="simple-select-label" variant="h6" gutterBottom>&nbsp;</Typography>
												<button onClick={() => handleMapLocation(28.5719972, 77.36936779999999, 10.1631526, 76.64127119999999)}
													type='button'
													style={{ background: "gray", color: "white", padding: '5px 10px', border: 'none', borderRadius: '3px' }}
												>View Map</button>
											</div> */}
                    </div>
                  </Grid>
                </Container>
              </AccordionDetails>
            </div>
          ) : (
            ""
          )}

         <AccordionDetails>
            <Container maxWidth="lg">
              <Grid>
                {loadingTest === true ? (
                  <div className="d-flex justify-content-center gap-5">
                    <button
                      type="submit"
                      className="btn btn-light btn-md gx-3"
                      style={{
                        border: "1px solid #7E00D1",
                        color: "#7E00D1",
                        fontSize: "14px",
                        width: "220px",
                        height: "35px",
                      }}
                    >
                      Loading...
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center gap-5">
                    {[
                      "Complete-Enquiry",
                      "Case Denied",
                      "Case Cancelled",
                    ].includes(formIncident?.caseType) ? (
                      <button
                        type="submit"
                        className="btn btn-light btn-md gx-3"
                        style={{
                          border: "1px solid #7E00D1",
                          color: "#7E00D1",
                          fontSize: "14px",
                          width: "220px",
                          height: "35px",
                        }}
                        disabled={fetcdataListItems?.caseType=== "Complete-Enquiry" ||fetcdataListItems?.caseType==="Case Denied" || fetcdataListItems?.caseType ==="Case Cancelled"}
                      >
                        Submit
                      </button>
                    ) : (
                      // ✅ Otherwise show "Continue to Vendor Assign"
                      <button
                        type="submit"
                        className="btn btn-light btn-md gx-3"
                        style={{
                          border: "1px solid #7E00D1",
                          color: "#7E00D1",
                          fontSize: "14px",
                          width: "220px",
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
                        Continue to Vendor Assign
                      </button>
                    )}
                  </div>
                )}
              </Grid>
            </Container>
          </AccordionDetails>
        </form>
      </Accordion>
    </>
  );
};

export default Requestdetails;
