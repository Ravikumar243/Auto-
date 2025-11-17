import React, { useState, useEffect, CSSProperties, useContext } from "react";
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import {
  Grid,
  TextField,
  Typography,
  Container,
  Checkbox,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DataTable from "react-data-table-component";
import CreateCustomerHooks, { CustomerContext } from "../createDetails/CreateCustomerHooks";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";

import dayjs from "dayjs";
import baseURL from "../../../../api/autoApi";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import { modalStyle } from "../Style";
// import CreateCustomerHooks from "pages/extra-pages/searchDetails/CreateCustomerHooks";

const VendorSearch = () => {
  const {
  handleSubmitAgentfeedback,
  loadingTest,
  expanded,
  handleAccordionChange,
  spinnerloading,
  handleVendorDetailsFetch,
  selected,
  setSelected,
  generatedSRN,
  formAssignVendorsDetails,
  fetcdataListItems,
  handleAssignvendorDetails,
  handleVendorAssign,
  incidentStatus,
  vendorFetchList,
  userLatitude,
  userLongitude,
  pickupCoordinates,
  loading,
  suggestions_Vedor,
  handleVednoLoc_Change,
  handleSelectVendor,
  dLon,
  dLat,
  iLon,
  iLat,
  vLon,
  vLat,
  handleNovendorAssign,
  handleAssignSubmitClose,
  venderAssign,
  inputVendor,
  localVendorStateCity,
  handleLocalVendorChange,
  selectedVendorId,
  setSelectedVendorId,
  handleAssignClose,
  venderModal,
  service
} = useContext(CustomerContext);


 console.log(service, "service kdsflkd")
  // const [currentTimeDate, setCurrentTimeDate] = useState(
  //   dayjs().format("YYYY-MM-DDTHH:mm")
  // );
  // const today = dayjs().format("YYYY-MM-DD");
  // const minDateTime = `${today}T00:00`;
  // const maxDateTime = `${today}T23:59`;

  const [checked, setChecked] = useState(false);
  console.log(checked, "checkstatus for vendor");
  const [rsrchecked, setRsrchecked] = useState(false);

  let [color, setColor] = useState("#282860");
  const [statusid, setStatusid] = useState([]);
  const [statusrej, setStatusrej] = useState("");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTimeDate(dayjs().format("YYYY-MM-DDTHH:mm"));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  const storedServiceType = localStorage.getItem("serviceType");

  const VendorSearchcolumns = [
    {
      name: "Select",
      selector: (row, index) => (
        <div>
          <Checkbox
            type="checkbox"
            className="box"
            checked={statusid.includes(row.vendorID) || selected === index}
            disabled={statusid.includes(row.vendorID)}
            name="vendorCheckbox"
            onChange={(e) => {
              if (!statusid.includes(row.vendorID)) {
                if (e.target.checked) {
                  const storedServiceType = localStorage.getItem("serviceType");
                  let BaseRatePrice = "";

                  if (storedServiceType === "RSR") {
                    BaseRatePrice = row.rsR_Day_upto20kms;
                  } else if (storedServiceType === "4W-Flatbed") {
                    BaseRatePrice = row.fourW_FBT_upto40kms;
                  } else if (storedServiceType === "2W-Flatbed") {
                    BaseRatePrice = row.twoW_FBT_upto40kms;
                  } else if (storedServiceType === "Underlift") {
                    BaseRatePrice = row.underlift_upto40kms;
                  } else if (storedServiceType === "Mini Truck") {
                    BaseRatePrice = row.miniTruck_upto40kms;
                  } else if (storedServiceType === "Zero-Degree") {
                    BaseRatePrice = row.fourW_ZERODEGREE_upto40kms;
                  } else {
                    BaseRatePrice = 0;
                  }

                  handleVendorDetailsFetch(
                    row.vendorName,
                    row.contacT_NUMBER,
                    row.city,
                    row.latitudes,
                    row.longitudes,
                    row.durationText,
                    row.distanceValue,
                    BaseRatePrice,
                    index
                  );
                  setSelectedVendorId(row.vendorID);
                  setStatusrej(row.vendorID);
                  localStorage.setItem("statusrej_vendorID", row.vendorID);
                  console.log(row, "rowdata");
                } else {
                  setSelected(null);
                  handleNovendorAssign();
                  setStatusrej(null);
                  localStorage.removeItem("statusrej_vendorID");
                }
              }
            }}
          />
        </div>
      ),
      width: "80px",
    },

    {
      name: <div style={{ whiteSpace: "normal" }}> Distance </div>,
      selector: (row) => <div>{row.distanceText}</div>,
      cell: (row) => <div>{row.distanceText}</div>,
      sortFunction: (a, b) => {
        const numA = parseFloat(a.distanceText);
        const numB = parseFloat(b.distanceText);
        return numA - numB;
      },
      width: "120px",
      id: "distance",
    },
    {
      name: "Duration",
      selector: (row) => row.durationText,
      width: "120px",
    },

    {
      name: <div style={{ whiteSpace: "normal" }}>Vendor Name</div>,
      selector: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.vendorName}</div>
      ),
      width: "150px",
      wrap: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.contacT_NUMBER,
      width: "120px",
    },

    {
      name: "Geo Location",
      selector: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.geolocation}</div>
      ),
      width: "",
      wrap: true,
    },
    {
      name: "Service Type",
      selector: (row) =>  service,
        // row.rsr ==="RSR" ? row.rsr : row.fourW_FBT==="4W-flatbed" ? row.fourW_FBT : row.twoW_FBT,
      width: "120px",
    },
    {
      name: "Change Status",
      selector: (row, index) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            key={row.vendorID}
            disabled={statusrej === row.vendorID}
            onClick={() => {
              setStatusid((prev) => [...prev, row.vendorID]);
              setSelected(null);
              setStatusrej(null);
            }}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #1976d2",
              backgroundColor: statusrej === row.vendorID ? "#ccc" : "#1976d2",
              color: "#f5f5f5",
              fontSize: "14px",
              fontWeight: 500,
              cursor: statusrej === row.vendorID ? "not-allowed" : "pointer",
              outline: "none",
              transition: "0.3s",
              width: "Auto",
            }}
          >
            Reject
          </button>
          <button
            type="button"
            key={`reactive-${row.vendorID}`}
            disabled={!statusid.includes(row.vendorID)}
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Re-Activate this vendor?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  // ✅ If user clicks OK
                  setStatusid((prev) =>
                    prev.filter((id) => id !== row.vendorID)
                  );
                  setStatusrej(null);

                  Swal.fire({
                    title: "Re-Activated!",
                    text: "Vendor has been re-activated successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
                } else {
                  // ❌ If user clicks Cancel
                  Swal.fire({
                    title: "Cancelled",
                    text: "Vendor remains deactivated.",
                    icon: "info",
                    confirmButtonText: "OK",
                  });
                }
              });
            }}
            style={{
              padding: "8px",
              borderRadius: "4px",
              // border: "1px solid #388e3c",
              backgroundColor: statusid.includes(row.vendorID)
                ? "#7e00d1"
                : "#b077d7ff",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              cursor: statusid.includes(row.vendorID)
                ? "pointer"
                : "not-allowed",
              outline: "none",
              transition: "0.3s",
              width: "auto",
            }}
          >
            Re-Active
          </button>
        </div>
      ),
      width: "200px",
    },

    {
      name: "Reject Reason",
      selector: (row) => (
        <select
          onChange={(e) => {
            const selectedValue = e.target.value;

            if (selectedValue) {
              Swal.fire({
                title: "Reject Reason Selected",
                text: `You selected: ${selectedValue}`,
                icon: "info",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  // ✅ Call API only after clicking OK
                  handleSubmitAgentfeedback(
                    selectedValue,
                    fetcdataListItems.srN_No,
                    fetcdataListItems.serviceDrop_IncidentType,
                    row.contacT_NUMBER,
                    row.vendorID
                  );
                }
              });
            }
          }}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #1976d2",
            backgroundColor: "#f9f9f9",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            outline: "none",
            transition: "0.3s",
            width: "170px",
          }}
          disabled={!statusid.includes(row.vendorID)}
        >
          <option value="">Select</option>
          <option value="Vendor Not Responding">Vendor Not Responding</option>
          <option value="High TAT">High TAT</option>
          <option value="Vendor Payment Issue">Vendor Payment Issue</option>
          <option value="Fleet not available">Fleet not available</option>
          <option value="Others">Others</option>
        </select>
      ),
      width: "210px",
    },
    {
      name: "Reason Selected",
      selector: (row) => row.reason,
      width: "240px",
      cell: (row) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {row.reason}
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            type="button"
            onClick={() =>
              handleMapLocation(
               row.latitudes,
                row.longitudes,
                pickupCoordinates.lat,
                pickupCoordinates.lon
              )
            }
            style={{
              background: "gray",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "3px",
            }}
          >
            <FiMapPin style={{ marginRight: "0.4rem" }} />
            View Map
          </button>
        </>
      ),
      width: "130px",
    },
    {
      name: "Vendor ID",
      selector: (row) => row.vendorID,
      width: "120px",
    },
  ];

  const tableCustomStyles = {
    headCells: {
      style: {
        backgroundColor: "#f0f0f0",
      },
    },
  };

  const handleMapLocation = (lx, ly, ulx, uly) => {
    const googleMapsLink = (() => {
      if (lx && ly && ulx && uly) {
        return `https://www.google.com/maps/dir/?api=1&origin=${lx},${ly}&destination=${ulx},${uly}&travelmode=driving`;
      }
      return "";
    })();
    console.log("Google Maps Link:", googleMapsLink);
    if (googleMapsLink) {
      window.open(googleMapsLink, "_blank");
    }
  };

  const handlelocalsearchcheck = (e) => {
    handleNovendorAssign();
    const value = fetcdataListItems?.serviceDrop_IncidentType;
    const isChecked = e.target.checked;
    if (isChecked) {
      setChecked(true);
      if (value === "RSR") {
        setRsrchecked(true);
      }
    } else {
      setChecked(false);
      if (value === "RSR") {
        setRsrchecked(false);
      }
    }
  };
  const handleCopyRowContent = async (RowDataItems) => {
    let copycontent = {
      id: RowDataItems.vendorID,
      Name: RowDataItems.vendorName,
      "Mobile no": RowDataItems.vendorMobileNo,
      "Company name": RowDataItems.companyName,
      Branch: RowDataItems.branchName,
      "Geo Location": RowDataItems.geoLocation,
      "Service Type": RowDataItems.serviceType,
      Latitude: RowDataItems.vendorLatitude,
      Longititude: RowDataItems.vendorLongitude,
      "Distance Km": RowDataItems.distanceText,
      "Distance Meter": RowDataItems.distanceValue,
      "Duration (min)": RowDataItems.durationText,
    };
    try {
      const message = await navigator.clipboard.writeText(
        JSON.stringify(copycontent)
      );
      console.log("message", message);
    } catch (error) {
      console.log("error message !", error);
    }
  };
  const [customerChecked, setCustomerChecked] = useState(false);
  const [driverChecked, setDriverChecked] = useState(false);

  const handleCheckboxChangesms = async (
    isChecked,
    mobileNo,
    srn,
    type_,
    setChecked
  ) => {
    setChecked(isChecked);
    if (mobileNo.length < 1) {
      alert("Please Enter mobile No");
      setChecked(false);
      return;
    } else if (mobileNo.length < 10) {
      alert("Please select a valid mobile No");
      setChecked(false);
      return;
    }
    if (isChecked) {
      try {
        const formData = new FormData();
        formData.append("Srn_No", srn);
        formData.append("phoneNumber", mobileNo);
        formData.append("Type", type_);

        const response = await fetch(`${baseURL}/SendSmsWithTrackingLink`, {
          method: "POST",
          body: formData,
        });
        console.log("hii", response);
        alert("SMS sent successfully.");
      } catch (error) {
        console.error("Error in SMS API:", error);
        alert("Failed to send SMS. Please try again.");
      }
    }
  };

  const handleCheckboxChange = async (isChecked, mobileNo, setChecked) => {
    setChecked(isChecked);
    if (isChecked) {
      const payload = {
        certificateNumber: "",
        masterPolicyNumber: "",
        customerName: "",
        mobileNumber: "",
        email: "",
        state: "",
        city: "",
        address: "",
        postalCode: "",
        product: "",
        brand: "",
        model: "",
        sumAssured: 7000,
        warrantyPeriod: "",
        productSerialNo: "",
        serialOrIMEINumber: "",
        coverStartDate: "2025-05-09T08:05:37.937Z",
        coverEndDate: "2025-05-09T08:05:37.937Z",
        dealer: "",
        insurance: "",
        concernedPersonName: "",
        concernedPersonMobileNo: mobileNo || "",
        completeAddress: "",
        pincode: "",
        dateOfRequest: "2025-05-09T08:05:37.937Z",
        dateOfLoss: "2025-05-09T08:05:37.937Z",
        servicePreferredDate: "2025-05-09T08:05:37.937Z",
        defect: "",
        incidentDescription: "",
        caseStatus: "",
        isHandsetWorking: true,
        claimFormType: "send claim form",
        berCalculation: "",
      };

      try {
        const response = await fetch(
          "https://mintflix.live:5119/api/FinanceVendor/registerCase",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("SMS API Success:", result);
        } else {
          console.error("SMS API Failed:", await response.text());
        }
      } catch (error) {
        console.error("Error in SMS API:", error);
      }
    }
  };

  return (
    <>
     <Accordion
        expanded={expanded === "open5"}
        onChange={handleAccordionChange("open5")}
        sx={{ margin: "0px 0px 18px 0px" }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            bgcolor: expanded === "open5" ? "#7E00D1" : "#f5f5f5",
            width: "100%",
            borderRadius: 1,
            color: expanded === "open5" ? "white" : "#282828",
            height: "40px",
            minHeight:
              expanded === "open1" ? "50px !important" : "50px !important",
          }}
        >
          <Typography component="span" variant="h4">
            Vendor Search
          </Typography>
        </AccordionSummary>

        <form onSubmit={(e) => handleAssignvendorDetails(e, checked)}>
          <AccordionDetails>
            <div className="d-flex justify-content-center items-center w-full h-64 mt-4">
              <ClipLoader
                color="#7e00d1"
                loading={spinnerloading}
                size={40}
                width={2}
                height={10}
              />
            </div>

            {!(
              fetcdataListItems?.rsaStatus === "Case Completed" ||
              fetcdataListItems?.srN_Status === "Vendor Close Issue" ||
              fetcdataListItems?.srN_Remark === "Case Cancelled" ||
              fetcdataListItems?.caseType === "Complete-Enquiry" ||
              fetcdataListItems?.caseType === "Case Denied" ||
              fetcdataListItems?.caseType === "Case Cancelled"
            ) && (
              <DataTable
                columns={VendorSearchcolumns}
                data={vendorFetchList}
                customStyles={tableCustomStyles}
                defaultSortFieldId="distance"
                defaultSortAsc={true}
              />
            )}
          </AccordionDetails>

          <Typography
            id="simple-select-label"
            variant="h4"
            sx={{ bgcolor: "#FaF3ff", padding: "20px 10px" }}
            gutterBottom
          >
            Vendor Details
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
                      <Checkbox
                        onChange={handlelocalsearchcheck}
                        checked={checked}
                        type="checkbox"
                        disabled={
                          fetcdataListItems?.rsaStatus === "Case Completed" ||
                          fetcdataListItems?.srN_Status ===
                            "Vendor Close Issue" ||
                          fetcdataListItems?.caseType === "Complete-Enquiry" ||
                          fetcdataListItems?.caseType === "Case Denied" ||
                          fetcdataListItems?.caseType === "Case Cancelled"
                        }
                      />
                      Local Vendor Search{" "}
                    </Typography>
                  </div>
                  {checked === true ? (
                    <div className="col-md-3 mb-4" id="DropLocation">
                      <Typography variant="h6" gutterBottom>
                        Local Vendor Location
                      </Typography>
                      <div
                        className="autocomplete-wrapper"
                        style={{ position: "relative" }}
                      >
                        <TextField
                          fullWidth
                          placeholder="Enter a location"
                          type="text"
                          name="vendorLocation"
                          variant="outlined"
                          value={inputVendor}
                          onChange={handleVednoLoc_Change}
                        />
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

                        {suggestions_Vedor.length > 0 && (
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
                            {suggestions_Vedor.map((placee) => (
                              <li
                                key={placee.place_id}
                                onClick={() => handleSelectVendor(placee)}
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
                                <span>{placee.display_name}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row my-3 gx-5">
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Vendor Mobile No
                      {!checked && <span className="text-danger">*</span>}
                    </Typography>

                    <TextField
                      fullWidth
                      placeholder="Vendor Mobile No"
                      type="text"
                      name="vendorContactNumber"
                      value={formAssignVendorsDetails.vendorContactNumber || ""}
                      onChange={handleVendorAssign}
                      inputProps={{ maxLength: 10 }}
                      variant="outlined"
                      required={!checked}
                      InputProps={{ readOnly: !checked }}
                    />
                  </div>
                  {checked === true ? "" : ""}
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Driver Mobile No<span className="text-danger">*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Driver Mobile No"
                      type="text"
                      name="driverMobileNo"
                      value={formAssignVendorsDetails.driverMobileNo || ""}
                      onChange={handleVendorAssign}
                      inputProps={{ maxLength: 10 }}
                      variant="outlined"
                      required
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.srN_Remark === "Case Cancelled" ||
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
                      Vendor Name
                    </Typography>
                    {checked === true ? (
                      <TextField
                        fullWidth
                        placeholder="Vendor Name"
                        type="text"
                        name="vendorName"
                        value={formAssignVendorsDetails.vendorName || ""}
                        onChange={handleVendorAssign}
                        variant="outlined"
                        required
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Vendor Name"
                        type="text"
                        name="vendorName"
                        value={formAssignVendorsDetails.vendorName || ""}
                        //  value={vendor_Name}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  </div>
                  <div className="col-md-3  d-flex align-items-center">
                    <div className="form-check big-checkbox">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="driverCheckbox"
                        checked={driverChecked}
                        disabled={
                          !(
                            fetcdataListItems?.customerMobileNo ||
                            formAssignVendorsDetails?.driverMobileNo
                          )
                        }
                        onChange={(e) =>
                          handleCheckboxChangesms(
                            e.target.checked,
                            formAssignVendorsDetails?.driverMobileNo,
                            fetcdataListItems?.srN_No,
                            "driver",
                            setDriverChecked
                          )
                        }
                      />
                      <label
                        className="form-check-label ms-2 fw-bold fs-7"
                        htmlFor="customerCheckbox"
                      >
                        Send SMS (Van Driver)
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      ETA (in MIN)
                    </Typography>
                    {checked === true ? (
                      <TextField
                        fullWidth
                        placeholder="In min"
                        type="text"
                        name="vendorETA"
                        variant="outlined"
                        value={formAssignVendorsDetails.vendorETA || ""}
                        onChange={handleVendorAssign}
                        required
                      />
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="In min"
                        type="text"
                        name="vendorETA"
                        variant="outlined"
                        value={formAssignVendorsDetails.vendorETA || "	"}
                        required
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  </div>
                  {checked === true && (
                    <>
                      <div className="col-md-3 mb-4">
                        <Typography variant="h6" gutterBottom>
                          Local Vendor State
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Enter State"
                          type="text"
                          name="localVendorState"
                          variant="outlined"
                          value={localVendorStateCity.localVendorState}
                          onChange={(e) => {
                            if (checked) handleLocalVendorChange(e);
                          }}
                          InputProps={{
                            readOnly: !checked,
                          }}
                        />
                      </div>

                      <div className="col-md-3 mb-4">
                        <Typography variant="h6" gutterBottom>
                          Local Vendor City
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Enter City"
                          type="text"
                          name="localVendorCity"
                          variant="outlined"
                          value={localVendorStateCity.localVendorCity}
                          onChange={(e) => {
                            if (checked) handleLocalVendorChange(e);
                          }}
                          InputProps={{
                            readOnly: !checked,
                          }}
                        />
                      </div>
                    </>
                  )}
                  {/* <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Base Rate
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Base Rate"
                      type="text"
                      name="bRate"
                      value={formAssignVendorsDetails.baseRate || ""}
                      onChange={handleVendorAssign}
                      variant="outlined"
                      InputProps={{ readOnly: !checked }}
                    />
                  </div> */}
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Base Rate
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Base Rate"
                      type="text"
                      name="baseRate"
                      value={formAssignVendorsDetails.baseRate || ""}
                      onChange={handleVendorAssign}
                      variant="outlined"
                      InputProps={{ readOnly: !checked }}
                      inputProps={{
                        min: 0,
                        step: "0.01",
                      }}
                    />
                  </div>

                  {checked === true && (
                    <>
                      <div className="col-md-3 mb-4">
                        <Typography
                          id="simple-select-label"
                          variant="h6"
                          gutterBottom
                        >
                          Rate Per KM
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Rate Per KM"
                          type="text"
                          name="ratePerKm"
                          value={localVendorStateCity.ratePerKm || ""}
                          onChange={(e) => {
                            if (checked) handleLocalVendorChange(e);
                          }}
                          variant="outlined"
                          InputProps={{ readOnly: !checked }}
                          inputProps={{
                            min: 0,
                            step: "0.01",
                          }}
                        />
                      </div>
                    </>
                  )}

                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      V to I KM{" "}
                      <button
                        type="button"
                        onClick={() =>
                          handleMapLocation(vLat, vLon, iLat, iLon)
                        }
                        style={{
                          float: "right",
                          border: "1px solid #f5f5f5",
                          borderRadius: "4px",
                        }}
                      >
                        <FiMapPin style={{ marginRight: "0.4rem" }} />
                        View Map
                      </button>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="V to I KM"
                      type="text"
                      name="vtoL_KM"
                      value={formAssignVendorsDetails.vtoL_KM || ""}
                      onChange={handleVendorAssign}
                      variant="outlined"
                      InputProps={{
                        readOnly: checked !== true,
                      }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      I to D KM{" "}
                      {checked === true ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleMapLocation(iLat, iLon, dLat, dLon)
                          }
                          style={{
                            float: "right",
                            border: "1px solid #f5f5f5",
                            borderRadius: "4px",
                          }}
                        >
                          <FiMapPin style={{ marginRight: "0.4rem" }} />
                          View Map
                        </button>
                      )}
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="I to D KM"
                      type="text"
                      name="itoD_KM"
                      value={
                        storedServiceType === "RSR"
                          ? " "
                          : formAssignVendorsDetails.itoD_KM || ""
                      }
                      onChange={handleVendorAssign}
                      variant="outlined"
                      InputProps={{
                        readOnly: !(
                          checked === true && storedServiceType !== "RSR"
                        ),
                      }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      D to V KM{" "}
                      {checked === true ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleMapLocation(dLat, dLon, vLat, vLon)
                          }
                          style={{
                            float: "right",
                            border: "1px solid #f5f5f5",
                            borderRadius: "4px",
                          }}
                        >
                          <FiMapPin style={{ marginRight: "0.4rem" }} />
                          View Map
                        </button>
                      )}
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="D to V KM"
                      type="text"
                      name="dtoV_KM"
                      value={
                        storedServiceType === "RSR"
                          ? " "
                          : formAssignVendorsDetails.dtoV_KM || ""
                      }
                      onChange={handleVendorAssign}
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      G to G KM
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="G to G KM"
                      type="text"
                      name="gtoG_KM"
                      value={
                        storedServiceType === "RSR"
                          ? formAssignVendorsDetails.vtoL_KM
                          : formAssignVendorsDetails.gtoG_KM || ""
                      }
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Count of Complete Vendor Case{" "}
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="vendorcase"
                      value={formAssignVendorsDetails.vendorcase}
                      onChange={handleVendorAssign}
                      variant="outlined"
                      style={{ backgroundColor: "#f5f5f5" }}
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status ===
                          "Vendor Close Issue" ||
                        fetcdataListItems?.srN_Remark === "Case Cancelled" ||
                        fetcdataListItems?.caseType === "Complete-Enquiry" ||
                        fetcdataListItems?.caseType === "Case Denied" ||
                        fetcdataListItems?.caseType === "Case Cancelled"
                      }
                    />
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <div className="form-check big-checkbox">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="customerCheckbox"
                        checked={customerChecked}
                        disabled={
                          !(
                            fetcdataListItems?.customerMobileNo ||
                            formAssignVendorsDetails?.CustomerMobileNo
                          )
                        }
                        onChange={(e) =>
                          handleCheckboxChangesms(
                            e.target.checked,
                            fetcdataListItems?.customerMobileNo,
                            fetcdataListItems?.srN_No,
                            "customer",
                            setCustomerChecked
                          )
                        }
                      />
                      <label
                        className="form-check-label ms-2 fw-bold fs-7"
                        htmlFor="customerCheckbox"
                      >
                        Send SMS (Customer)
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Complete Information Date& Time
                      <span className="text-danger">*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      name="informationDateTime"
                      value={formAssignVendorsDetails.informationDateTime || ""}
                      onChange={handleVendorAssign}
                      variant="outlined"
                      // inputProps={{
                      //   max: maxDateTime,
                      // }}
                      required
                      disabled={
                        fetcdataListItems?.rsaStatus === "Case Completed" ||
                        fetcdataListItems?.srN_Status === "Vendor Close Issue"
                      }
                    />
                  </div>
                  <div className="col-md-3 mb-4"></div>

                  <div className="row d-flex justify-content-center">
                    <div className="w-25 align-item-c d-flex">
                      {loadingTest === true ? (
                        <button
                          type="submit"
                          className="btn btn-light btn-md"
                          style={{
                            backgroundColor: "#7E00D1",
                            color: "white",
                            fontSize: "14px",
                            width: "144px",
                            height: "40px",
                          }}
                        >
                          Submiting...
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
                            height: "40px",
                          }}
                          disabled={
                            fetcdataListItems?.rsaStatus === "Case Completed" ||
                            fetcdataListItems?.srN_Status ===
                              "Vendor Close Issue" ||
                            fetcdataListItems?.caseType ===
                              "Complete-Enquiry" ||
                            fetcdataListItems?.caseType === "Case Denied" ||
                            fetcdataListItems?.caseType === "Case Cancelled"
                          }
                        >
                          Submit{" "}
                        </button>
                      )}
                    </div>

                    <Modal
                      open={venderModal}
                      fullWidth
                      onClose={handleAssignClose}
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
                            bgcolor: "darkblue",
                            padding: "10px",
                            color: "white",
                            borderRadius: "5px 5px 0px 0px",
                            textAlign: "center",
                          }}
                        >
                          Vendor Assign
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          sx={{ mt: 2, padding: "10px", fontSize: "12px" }}
                        >
                          If Not select Assign button then not save Distance and
                          ETA. Are you sure to save vendor
                          <strong>{}</strong>
                        </Typography>
                        <hr />
                        <div className="d-flex justify-content-end m-3">
                          <button
                            type="button"
                            className="btn btn-light btn-md mx-3"
                            onClick={handleAssignClose}
                            style={{
                              border: "1px solid #ccc",
                              color: "#282828",
                              fontSize: "14px",
                              width: "80px",
                              height: "40px",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-md mx-1"
                            style={{
                              fontSize: "14px",
                              width: "70px",
                              height: "40px",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            Save
                          </button>
                        </div>
                        {/* </div> */}
                      </Box>
                    </Modal>
                    {/* venderAssign */}
                    <Modal
                      open={venderAssign}
                      fullWidth
                      onClose={handleAssignSubmitClose}
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
                          sx={{ mt: 2, padding: "10px", fontSize: "12px" }}
                        >
                          Assistance details saved Successfully.Assist Reference
                          Number:
                          <strong>{generatedSRN}</strong>
                          <p>
                            Assigned Vendor :{" "}
                            <strong>
                              {formAssignVendorsDetails.vendorName}
                            </strong>
                            <br />
                            Assigned Branch :{" "}
                            <strong>
                              {formAssignVendorsDetails.vendorName}
                            </strong>
                          </p>
                        </Typography>
                        <hr />
                        <div className="d-flex justify-content-end m-1">
                          <button
                            type="button"
                            className="btn btn-light btn-md mx-3"
                            onClick={handleAssignSubmitClose}
                            style={{
                              border: "1px solid #ccc",
                              color: "#282828",
                              fontSize: "14px",
                              width: "50px",
                              height: "40px",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            OK
                          </button>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </div>
              </Grid>
            </Container>
          </AccordionDetails>
        </form>
      </Accordion>
    </>
  );
};

export default VendorSearch;
