import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Container,
} from "@mui/material";
import { CustomerContext } from "../createDetails/CreateCustomerHooks";
import Accordion from "@mui/material/Accordion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextareaAutosize } from "@mui/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import ReplayIcon from "@mui/icons-material/Replay";
import dayjs from "dayjs";
import baseURL from "api/autoApi";
import { modalStyle } from "../Style";

const CompleteDeatils = () => {
  const {
    inputValue,
    handleSync,
    loadingTest,
    handleDetailsModal,
    expanded,
    handleAccordionChange,
    fetcdataListItems,
    handleAssist,
    formAssistance,
    generatedSRN,
    completeDeatils,
    handleIncidentDetails,
    loading,
    handleInputChange,
    suggestions,
    handleSelect,
    remarkLoading,
    remarkLogsData,
    handleDownloadHistory
  } = useContext(CustomerContext);

  const status = ["Accepeted", "Rejected", "Re-Assign"];
  const remarks = ["Remark", "Un-remark"];
  const { user_Latitude, uSer_Longitude } = fetcdataListItems;
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [remove, setRemove] = useState(true);

  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm:ss"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!remove) {
      return;
    }
    // const getLocation = async () => {
    //   if (user_Latitude && uSer_Longitude) {
    //     try {
    //       const response = await fetch(
    //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${user_Latitude},${uSer_Longitude}&key=AIzaSyAMiYAw5JRMFjD3H6erGvs-fXPo_WlZR4w`
    //       );
    //       const data = await response.json();

    //       if (data.status === "OK" && data.results.length > 0) {
    //         const addressComponents = data.results[0].address_components;

    //         const allComponents = data.results.flatMap(
    //           (r) => r.address_components
    //         );

    //         const getComponent = (types) => {
    //           const comp = addressComponents.find((c) =>
    //             types.every((t) => c.types.includes(t))
    //           );
    //           return comp ? comp.long_name : "";
    //         };

    //         const address = data.results[0].formatted_address;
    //         const abc = extractCity(address);
    //         function extractCity(address) {
    //           const parts = address.split(",");
    //           return parts.length >= 3 ? parts[parts.length - 3].trim() : "";
    //         }
    //         const fetchedLocation = {
    //           address: data.results[0].formatted_address,
    //           city:
    //             abc ||
    //             getComponent(["locality"]) ||
    //             getComponent(["administrative_area_level_2"]),
    //           state: getComponent(["administrative_area_level_1"]),
    //           country: getComponent(["country"]),
    //           pincode: getComponent(
    //             ["postal_code"],
    //             data.results.flatMap((r) => r.address_components)
    //           ),
    //         };
    //         console.log(getComponent(["postal_code"]), "pincode");

    //         setLocation(fetchedLocation);
    //         console.log(fetchedLocation.pincode, "pin");
    //         handleAssist({
    //           target: { name: "location", value: fetchedLocation.address },
    //         });
    //         handleAssist({
    //           target: { name: "city", value: fetchedLocation.city },
    //         });
    //         handleAssist({
    //           target: { name: "state", value: fetchedLocation.state },
    //         });
    //         handleAssist({
    //           target: { name: "pincode", value: fetchedLocation.pincode },
    //         });
    //       } else {
    //         setError("Failed to fetch location: " + data.status);
    //       }
    //     } catch (err) {
    //       setError("Failed to fetch location");
    //       console.error("Error fetching location:", err);
    //     }
    //   }
    // };

    const getLocation = async () => {
      if (user_Latitude && uSer_Longitude) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${user_Latitude},${uSer_Longitude}&key=AIzaSyAMiYAw5JRMFjD3H6erGvs-fXPo_WlZR4w`
          );
          const data = await response.json();

          if (data.status === "OK" && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;

            const getComponent = (types) => {
              const comp = addressComponents.find((c) =>
                types.every((t) => c.types.includes(t))
              );
              return comp ? comp.long_name : "";
            };

            const city =
              getComponent(["locality"]) ||
              getComponent(["administrative_area_level_2"]);
            const state = getComponent(["administrative_area_level_1"]);
            const country = getComponent(["country"]);
            const pincode = getComponent(["postal_code"]);
            const address = data.results[0].formatted_address;

            const fetchedLocation = { address, city, state, country, pincode };

            console.log(fetchedLocation, "fetchedLocationjjhdfd");

            // Populate your input fields
            setLocation(fetchedLocation);
            // handleAssist({ target: { name: "location", value: address } });
            // handleAssist({ target: { name: "city", value: city } });
            // handleAssist({ target: { name: "state", value: state } });
            // handleAssist({ target: { name: "pincode", value: pincode } });
            handleAssist({ target: { name: "state", value: state } }, false);
            handleAssist({ target: { name: "city", value: city } }, false);
            handleAssist(
              { target: { name: "pincode", value: pincode } },
              false
            );
            handleAssist(
              { target: { name: "location", value: address } },
              false
            );
          } else {
            setError("Failed to fetch location: " + data.status);
          }
        } catch (err) {
          setError("Failed to fetch location");
          console.error("Error fetching location:", err);
        }
      }
    };

    getLocation();
  }, [user_Latitude, uSer_Longitude, handleAssist, remove]);

  setTimeout(() => {
    setRemove(false);
  }, 1000);

  return (
    <>
      <Accordion
        expanded={expanded === "open3"}
        sx={{ margin: "0px 0px 18px 0px" }}
        onChange={handleAccordionChange("open3")}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
          sx={{
            bgcolor: expanded === "open3" ? "#7E00D1" : "#f5f5f5",
            width: "100%",
            borderRadius: 1,
            color: expanded === "open3" ? "white" : "#282828",
            height: "40px",
            minHeight:
              expanded === "open1" ? "50px !important" : "50px !important",
          }}
        >
          <Typography component="span" variant="h4">
            Complete Details
          </Typography>
        </AccordionSummary>
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
                    name="companyName"
                    value={fetcdataListItems?.companyName || ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ color: "black", backgroundColor: "#f5f5f5" }}
                    sx={{ color: "#282828" }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </Grid>
          </Container>
        </AccordionDetails>
        <Typography
          id="simple-select-label"
          variant="h4"
          sx={{ bgcolor: "#FaF3ff", padding: "20px 10px" }}
          gutterBottom
        >
          Customer Details
        </Typography>

        <AccordionDetails>
          <Container maxWidth="lg">
            <Grid className="container-fluid">
              <div className="row my-3 gx-5">
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
                    type="text"
                    name="customerFirstName"
                    value={fetcdataListItems?.customerFirstName || ""}
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
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    name="customerLastName"
                    value={fetcdataListItems?.customerLastName || ""}
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
                    Email ID
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    name="customerEmailid"
                    value={fetcdataListItems?.customerEmailid || ""}
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
                    Mobile No
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    name="customerMobileNo"
                    value={fetcdataListItems?.customerMobileNo || ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ backgroundColor: "#f5f5f5" }}
                    disabled={
                      fetcdataListItems?.rsaStatus === "Case Completed" ||
                      fetcdataListItems?.srN_Status === "Vendor Close Issue"
                    }
                  />
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
                    name="customerMobileNo"
                    value={fetcdataListItems?.srN_No || ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Certificate Start Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    name="policyStartDate"
                    value={fetcdataListItems?.policyStartDate || ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Certificate End Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    name="policyEndDate"
                    value={fetcdataListItems?.policyEndDate || ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Make
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    name="make"
                    value={fetcdataListItems?.make || ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Model Variant
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    name="model_Variant"
                    value={fetcdataListItems?.model_Variant || ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Engine No
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    name="engineNo_BatteryNo"
                    value={fetcdataListItems?.engineNo_BatteryNo || ""}
                    InputProps={{
                      readOnly: true,
                    }}
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
                    name="customerMobileNo"
                    value={fetcdataListItems?.chasisNo_FrameNo || ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="col-md-3 mb-4">
                  <Typography id="select-label" variant="h6" gutterBottom>
                    Registration No
                  </Typography>
                  {/* fetcdataListItems?.customerMobileNo || */}
                  <TextField
                    fullWidth
                    placeholder="Registration No"
                    name="chasisNo_FrameNo "
                    value={""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
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
                    InputProps={{
                      readOnly: true,
                    }}
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
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
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
          Incident details
        </Typography>

        <AccordionDetails>
          <Container maxWidth="lg">
            <Grid className="container-fluid">
              <form onSubmit={handleIncidentDetails}>
                <div className="row my-3 gx-5">
                  <div className="col-md-3 mb-4 d-none"></div>
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
                      name="MobileNumber"
                      value={formAssistance.MobileNumber || ""}
                      inputProps={{ maxLength: 10 }}
                      variant="outlined"
                      onChange={handleAssist}
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue"
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      {/* setRemove(true) */}
                      Select Location*
                      <button
                        className="mr-0"
                        type="button"
                        onClick={() => {
                          handleSync();
                          setRemove(true);
                        }}
                        style={{
                          border: "none",
                          float: "right",
                          color: "Blue",
                        }}
                      >
                        {" "}
                        <ReplayIcon className="ml-2" />
                        Refresh
                      </button>
                    </Typography>

                    <div
                      className="autocomplete-wrapper"
                      style={{ position: "relative" }}
                    >
                      {fetcdataListItems?.incident_Location ||
                      (user_Latitude && uSer_Longitude) ? (
                        <TextField
                          fullWidth
                          placeholder="Enter a location"
                          type="text"
                          name="location"
                          variant="outlined"
                          value={formAssistance.location || ""}
                          onChange={handleInputChange}
                          disabled
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          placeholder="Enter a location"
                          type="text"
                          name="location"
                          variant="outlined"
                          value={
                            formAssistance.location !== ""
                              ? formAssistance.location || ""
                              : inputValue || ""
                          }
                          onChange={handleInputChange}
                          required
                        />
                      )}
                      {loading && (
                        <div
                          className="loading-spinner"
                          style={{ position: "absolute", top: 12, right: 12 }}
                        >
                          <span
                            className="spinner-border spinner-border-sm text-primary"
                            role="status"
                          />
                        </div>
                      )}
                      {suggestions.length > 0 && (
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
                          {suggestions.map((place, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelect(place)}
                              style={{
                                padding: "10px 15px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.background = "#f1f1f1")
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
                              <span>{place.description}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Landmark
                    </Typography>
                    {fetcdataListItems.incident_Landmark ? (
                      <TextField
                        fullWidth
                        placeholder="Landmark"
                        type="text"
                        name="landmark"
                        value={fetcdataListItems.incident_Landmark || ""}
                        variant="outlined"
                        onChange={handleAssist}
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Landmark"
                        type="text"
                        name="landmark"
                        value={formAssistance.landmark || ""}
                        variant="outlined"
                        onChange={handleAssist}
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      State
                    </Typography>
                    {fetcdataListItems.incident_State ? (
                      <TextField
                        fullWidth
                        placeholder="State"
                        type="text"
                        value={fetcdataListItems.incident_State}
                        variant="outlined"
                        disabled
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="State"
                        type="text"
                        name="state"
                        value={formAssistance.state || ""}
                        variant="outlined"
                        onChange={handleAssist}
                        disabled={user_Latitude && uSer_Longitude}
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      City
                    </Typography>
                    {fetcdataListItems.incident_City?.trim() ? (
                      <TextField
                        fullWidth
                        placeholder="City"
                        type="text"
                        value={fetcdataListItems.incident_City || ""}
                        variant="outlined"
                        disabled
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="City"
                        name="city"
                        type="text"
                        value={formAssistance.city || ""}
                        variant="outlined"
                        onChange={handleAssist}
                        disabled={user_Latitude && uSer_Longitude}
                      />
                    )}
                  </div>

                  {/* <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      State
                    </Typography>
                    {fetcdataListItems.incident_State ? (
                      <TextField
                        fullWidth
                        placeholder="State"
                        type="text"
                        value={fetcdataListItems.incident_State}
                        variant="outlined"
                        disabled
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="State"
                        type="text"
                        name="state"
                        value={formAssistance.state || ""}
                        variant="outlined"
                        onChange={(e) => {
                          handleAssist(e);
                          // if user types "Delhi" (case-insensitive), auto-fill city
                          const newValue = e.target.value?.trim().toLowerCase();
                          if (newValue === "delhi") {
                            setFormAssistance((prev) => ({
                              ...prev,
                              city: "Delhi",
                            }));
                          } else {
                            setFormAssistance((prev) => ({
                              ...prev,
                              city: "",
                            }));
                          }
                        }}
                        disabled={user_Latitude && uSer_Longitude}
                      />
                    )}
                  </div>

                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      City
                    </Typography>
                    {fetcdataListItems.incident_City ? (
                      <TextField
                        fullWidth
                        placeholder="City"
                        type="text"
                        value={fetcdataListItems.incident_City || ""}
                        variant="outlined"
                        disabled
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="City"
                        type="text"
                        name="city"
                        value={formAssistance.city || ""}
                        variant="outlined"
                        onChange={handleAssist}
                        disabled={
                          (user_Latitude && uSer_Longitude) ||
                          formAssistance.state?.trim().toLowerCase() === "delhi"
                        }
                      />
                    )}
                  </div> */}

                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Pincode*
                    </Typography>
                    {fetcdataListItems.incident_Pincode ? (
                      <TextField
                        fullWidth
                        placeholder="Pincode"
                        type="text"
                        name="pincode"
                        value={fetcdataListItems.incident_Pincode || ""}
                        variant="outlined"
                        onChange={handleAssist}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Pincode"
                        type="text"
                        name="pincode"
                        value={formAssistance.pincode || ""}
                        variant="outlined"
                        onChange={handleAssist}
                        required
                        inputProps={{ minLength: 6, maxLength: 6 }}
                      />
                    )}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Vendor Allocation
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Vendor Allocation"
                      type="text"
                      name="vendorAllocation"
                      value={formAssistance.vendorAllocation || ""}
                      variant="outlined"
                      onChange={handleAssist}
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue"
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
                        Status
                      </Typography>
                      <Select
                        name="status"
                        value={formAssistance.status}
                        onChange={handleAssist}
                        displayEmpty
                        renderValue={(select) => {
                          if (!select) {
                            return "Select";
                          }
                          return select;
                        }}
                        style={{ backgroundColor: "#f5f5f5" }}
                        input={<OutlinedInput readOnly />}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        {status.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-3 mb-4">
                    <FormControl fullWidth variant="outlined">
                      <Typography
                        id="Company-simple-select"
                        variant="h6"
                        gutterBottom
                      >
                        Remark
                      </Typography>
                      <Select
                        name="remark"
                        value={formAssistance.remark}
                        onChange={handleAssist}
                        displayEmpty
                        renderValue={(select) => {
                          if (!select) {
                            return "Select";
                          }
                          return select;
                        }}
                        style={{ backgroundColor: "#f5f5f5" }}
                        input={<OutlinedInput readOnly />}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        {remarks.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  {/* <div className="col-md-3 mb-4">
                    <Typography
                      id="Company-simple-select"
                      variant="h6"
                      gutterBottom
                    >
                      Call Time<span className="text-danger">*</span>
                    </Typography>

                    {fetcdataListItems.incident_CallTime ? (
                      <TextField
                        fullWidth
                        type="Time"
                        name="callTime"
                        value={fetcdataListItems.incident_CallTime || ""}
                        variant="outlined"
                        onChange={handleAssist}
                        inputProps={{ max: currentTime }}
                        
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    ) : (
                      <TextField
                        fullWidth
                        type="Time"
                        name="callTime"
                        value={formAssistance.callTime || ""}
                        variant="outlined"
                        onChange={handleAssist}
                        inputProps={{ max: currentTime }}
                        
                      />
                    )}
                  </div> */}
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
                      type="text"
                      name="assistanceSummary"
                      value={formAssistance.assistanceSummary || ""}
                      variant="outlined"
                      onChange={handleAssist}
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
                  </div>
                  {fetcdataListItems?.externalAssistanceSummary !== "" ? (
                    <div className="col-md-3 mb-4">
                      <Typography
                        id="simple-select-label"
                        variant="h6"
                        gutterBottom
                      >
                        External Assistance Summary{" "}
                      </Typography>
                      <TextareaAutosize
                        placeholder=""
                        minRows={3}
                        type="text"
                        value={fetcdataListItems?.externalAssistanceSummary}
                        variant="outlined"
                        onChange={handleAssist}
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          padding: "0px 5px",
                          resize: "none",
                          backgroundColor: "#f5f5f5",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                  ) : (
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
                        value={formAssistance.externalAssistanceSummary}
                        variant="outlined"
                        onChange={handleAssist}
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          padding: "0px 5px",
                          resize: "none",
                        }}
                      />
                    </div>
                  )}

                  <div className="container mt-4">
                    {/* Table 1 */}
                    <div className="col-12  mb-4">
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
                                      // textOverflow: "ellipsis",
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

                  <div className="d-flex justify-content-center mt-5 gap-5">
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
              </form>
            </Grid>
          </Container>
        </AccordionDetails>
        <Modal
          open={completeDeatils}
          onClose={handleDetailsModal}
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
                bgcolor: "forestgreen",
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
                onClick={handleDetailsModal}
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
          </Box>
        </Modal>
      </Accordion>
    </>
  );
};
export default CompleteDeatils;
