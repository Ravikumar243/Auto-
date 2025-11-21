import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import OutlinedInput from "themes/overrides/OutlinedInput";
// import Typography from "themes/overrides/Typography";

const ViewPage = () => {
  const { state } = useLocation();
  const customerData = state?.CustomerData;

  console.log(customerData, "statekdklf");

  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: "#7e00d1",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "600",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          Search Company Data
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <div className="col-md-3 mb-4">
            <FormControl fullWidth variant="outlined">
              <Typography id="Company-simple-select" variant="h6" gutterBottom>
                Company Name *
              </Typography>

              <TextField
                fullWidth
                placeholder="Company Name"
                name="companyName"
                label=" "
                value={customerData?.companyName}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                style={{ backgroundColor: "#f1f1f1" }}
              />
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
            <TextField
              fullWidth
              placeholder="Certificate No"
              name="certificateNo"
              variant="outlined"
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
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
              variant="outlined"
              value={customerData?.firstName}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Last Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Last Name"
              name="CustomerLastName"
              value={customerData?.lastName}
              type="text"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vehicle No
            </Typography>

            <TextField
              fullWidth
              placeholder="Vehicle No"
              type="Text"
              name="vehicleNo"
              value={customerData?.vehicleRegistration}
              inputProps={{ maxLength: 12 }}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Engine No/ Battery No
            </Typography>
            <TextField
              fullWidth
              placeholder="engineNo"
              name="engineNo"
              type="text"
              value={customerData?.engineNo}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Chassis No/ Frame No
            </Typography>
            <TextField
              fullWidth
              placeholder="chassisNo"
              name="chassisNo"
              type="text"
              value={customerData?.chassisNo}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Email ID
            </Typography>
            <TextField
              fullWidth
              placeholder="Email ID"
              name="CustomerEmailid"
              type="email"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Contact No
            </Typography>
            <TextField
              fullWidth
              placeholder="Contact No"
              name="contactNo"
              value={customerData?.contactNo}
              inputProps={{ maxLength: 10 }}
              type="telephone"
              variant="outlined"
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
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
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
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
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
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
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography id="simple-select-label" variant="h6" gutterBottom>
              Call Time <span className="text-danger"></span>
            </Typography>
            <TextField
              value={customerData?.callTime}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Policy Verification
            </Typography>
            <TextField
              fullWidth
              placeholder="Motor Serial No"
              type="Text"
              value={customerData?.policyVerificationType}
              name="motorserialno"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#7e00d1",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "600",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          Assistance Data Entry
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Product
            </Typography>
            <TextField
              fullWidth
              placeholder="product"
              type="Text"
              name="product"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Car Segment
            </Typography>
            <TextField
              fullWidth
              placeholder="carMake"
              type="Text"
              name="carMake"
              value={customerData?.carMake}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Model Variant
            </Typography>
            <TextField
              fullWidth
              placeholder="carModel"
              type="Text"
              name="carModel"
              value={customerData?.carModel}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Customer First Name
            </Typography>
            <TextField
              fullWidth
              placeholder="firstName"
              type="Text"
              name="firstName"
              variant="outlined"
              value={customerData?.firstName}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Customer Middle Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Middle Name"
              type="Text"
              name="middleName"
              value={customerData?.middleName}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Customer Last Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Last Name"
              type="Text"
              name="lastName"
              value={customerData?.lastName}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Customer Mobile No
            </Typography>
            <TextField
              fullWidth
              placeholder="Contact No"
              type="Text"
              name="contactNo"
              value={customerData?.contactNo}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Alternate Mobile No
            </Typography>
            <TextField
              fullWidth
              placeholder="Alternate Mobile No"
              type="Text"
              name="product"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              State
            </Typography>
            <TextField
              fullWidth
              placeholder="State"
              type="Text"
              name="state"
              variant="outlined"
              value={customerData?.state}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              City
            </Typography>
            <TextField
              fullWidth
              placeholder="product"
              type="Text"
              name="city"
              value={customerData?.city}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vehicle No
            </Typography>
            <TextField
              fullWidth
              placeholder="Vehicle No"
              type="Text"
              name="vehicleRegistration"
              value={customerData?.vehicleRegistration}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Engine No / Battery No
            </Typography>
            <TextField
              fullWidth
              placeholder="product"
              type="Text"
              name="engineNo"
              value={customerData?.engineNo}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Chassis No / Frame No
            </Typography>
            <TextField
              fullWidth
              placeholder="Chassis No"
              type="Text"
              name="chassisNo"
              value={customerData?.chassisNo}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Customer Email ID
            </Typography>
            <TextField
              fullWidth
              placeholder="Email Id"
              type="Text"
              name="product"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Policy No
            </Typography>
            <TextField
              fullWidth
              placeholder="product"
              type="Text"
              name="policyNumber"
              value={customerData?.policyNumber}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Policy Start Date
            </Typography>
            <TextField
              fullWidth
              placeholder="Policy Start Date"
              type="Text"
              name="product"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Policy End Date
            </Typography>
            <TextField
              fullWidth
              placeholder="Policy End Date"
              type="Text"
              name="product"
              variant="outlined"
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#7e00d1",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "600",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          Complete Details
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Company Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
               placeholder="Company Name"
              name="companyName"
              variant="outlined"
              value={customerData?.companyName}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              First Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              value={customerData?.firstName}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Last Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              value={customerData?.lastName}
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Email ID
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Mobile No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              value={customerData?.contactNo}
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Certificate No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Certificate Start Date
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Certificate End Date
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Make
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              value={customerData?.carMake}
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Model Variant
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              value={customerData?.carModel}
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Engine No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="engineNo"
              value={customerData?.engineNo}
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Chassis No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="chassisNo"
              variant="outlined"
              value={customerData?.chassisNo}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Registration No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
       
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vehicle No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="vehicleRegistration"
              variant="outlined"
                     value={customerData?.vehicleRegistration}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vehicle Color
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Mobile No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.contactNo}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Incident Location
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.incidentLocation}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Landmark
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              State
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              City
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Pincode
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vendor Allocation
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Status
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Remark
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Assistance Summary
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              External Assistance Summary
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#7e00d1",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "600",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          Service Request Details
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vehicle Type
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vehicleType}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Select Incident*
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              value={customerData?.incidentType}
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Incident Details
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.selectIncident}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Incident Reasons
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.incidentReason}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              State
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              City
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Mobile No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.contactNo}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Select Location
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.incidentLocation}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Landmark
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Pincode
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Location Type
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.locationType}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Assistance Summary
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              External Assistance Summary
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vendor Not Assign Remark
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Case Type
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.caseType}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Sub Category
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.subCategory}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Request Type
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Drop Location
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.dropLocation}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Kilometer (KM)
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#7e00d1",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "600",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          Vendor Search
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vendor Mobile No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Driver Mobile No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vendor Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vendorName}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              ETA (in MIN)
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vtoIETA}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Base Rate
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              V to I KM
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vtoIKms}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              I to D KM
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.itoDKms}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              D to V KM
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.dtoVDistance}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              G to G KM
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.gtoGDistance}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Count of Complete Vendor Case
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Complete Information Date& Time
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.completeInformationTime}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#7e00d1",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "600",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          Vendor Details
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Company Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.companyName}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              First Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.firstName}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Last Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.lastName}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Email
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Mobile No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.contactNo}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Certificate No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Certificate Start Date
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Certificate End Date
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Make
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.carMake}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Model Variant
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.carModel}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Engine No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="engineNo"
              variant="outlined"
              value={customerData?.engineNo}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Chassis No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.chassisNo}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Registration No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vehicle No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vehicleRegistration}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Select Location
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.incidentLocation}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Landmark
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Pincode
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Location Type
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.locationType}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Servic Assigned Date Time
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.serviceAssignedDateTime}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vendor Not Assin Remark
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.afterVendorAssignRemark}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vendor Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vendorName}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vendor Branch Name
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.branchName}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Status
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.status}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Remark
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.remark}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              RSA Time Line Status
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Follow Up Date and Time
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
              
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vendor Contact Number
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              ETA (in Min)
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.gtoGDETA}
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              RNM Contact Number
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Assistance Summary
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              External Assistance Summary
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
               InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#7e00d1",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "600",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          Cost Details
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Reached Location
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Reached Time(Min)
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vendorReachedIncidentTime}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Drop Location
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.dropLocation}

            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Drop Time
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vendorReachedIncidentDate}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Total Running KMs
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Exceptional Approval-Kms
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.exceptionalApprovalKms}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              ExceptionalApproval-PolicyCoverage
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.exceptionalApprovalPolicyCoverage}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Toll Charges
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.tollCharges}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Waiting Hours Charge
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.waitingHoursCharge}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vehicle Custody Hours Charge
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vehicleCustodyHoursCharge}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Other Charges
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.otherCharges}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Border & Other Charges
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Total Kilometer
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.totalKm}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              V to I KMs
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vtoIKms}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              I to D KMs
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.itoDKms}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Total Kilometers Charges
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.totalKmCharges}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Total Amount
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.totalAmountWithoutGST}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Final Amount ( with GST )
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.totalAmountWithGST}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Customer paid Amount
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.customerAmountPaid}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Customer paid Date
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.customerPaidDate}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Payment Updated Time
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Reference No
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.referenceNo}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Vehicle Type
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.vehicleType}
            />
          </div>
          <div className="col-md-3 mb-4">
            <Typography
              id="demo-simple-select-label2"
              variant="h6"
              gutterBottom
            >
              Payment Type
            </Typography>
            <TextField
              fullWidth
              type="Text"
              name="product"
              variant="outlined"
              value={customerData?.paymentType}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPage;
