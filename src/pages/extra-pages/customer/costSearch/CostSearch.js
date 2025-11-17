import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Radio,
  Select,
  MenuItem,
  Typography,
  Container,
  FormControlLabel,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Accordion from "@mui/material/Accordion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateCustomerHooks, {
  CustomerContext,
} from "../createDetails/CreateCustomerHooks";
import { modalStyle } from "../Style";
// import CreateCustomerHooks from "pages/extra-pages/searchDetails/CreateCustomerHooks";

const CostSearch = () => {
  const {
    loadingTest,
    expanded,
    handleAccordionChange,
    fetcdataListItems,
    handleClose,
    statusmodal,
    handleCostVendor,
    handleUploadAssist,
    formUploadAssist,
    calculatedAmount,
    calculatedTotalAmount,
    calculatedTotalAmountWithGst,
  } = useContext(CustomerContext);

  const vehicleType = [
    "Vehicle Dispatch Type",
    "Flatbed",
    "4 Wheeler FBT",
    "3 Wheeler FBT",
    "2 Wheeler FBT",
    "Under lift",
    "Mini Truck",
    "Zero Degree",
    "RSR",
  ];
  const PaymentType = [
    // "Payment Type",
    "Customer Reimbursement",
    "Dealer Reimbursement",
    "Local Vendor Payment",
    "Across Assis Vendor",
  ];
  const exceptionalKms = [
    "Approved by HOD",
    "Approved by MANAGER",
    "Approved by TL",
    "Exception by Client",
    "Assumed Cover",
    "Approved by Network manager",
  ];
  const Exceptional_policy = [
    "Approved by MANAGER",
    "Approved by TL",
    "Exception by Client",
    "Assumed Cover",
  ];
  // const handleChange = (vall) => {
  // 	setSelected(vall === selected ? null : vall);
  // }

  console.log(formUploadAssist, "form");

  // const storedServiceType = localStorage.getItem("serviceType");
  const serviceTypefromSrnData =
    fetcdataListItems?.serviceDrop_IncidentType === "RSR"
      ? fetcdataListItems?.serviceDrop_IncidentType
      : fetcdataListItems?.serviceDrop_IncidentDetails;

  const statusrejVendorID = localStorage.getItem("statusrej_vendorID");
  const localVendorBaseRate = localStorage.getItem("localVendorBaseRate");

  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    if (
      !statusrejVendorID &&
      localVendorBaseRate &&
      localVendorBaseRate !== ""
    ) {
      const totalKM = parseFloat(fetcdataListItems?.gtoG_KM || 0);
      const baseRate = parseFloat(localVendorBaseRate);
      setTotalAmount((baseRate * totalKM).toString());
    }
  }, [fetcdataListItems, localVendorBaseRate, statusrejVendorID]);

  return (
    <>
      <Accordion
        expanded={expanded === "open8"}
        onChange={() => {
          if (fetcdataListItems?.rsaStatus === "Case Completed") {
            handleAccordionChange("open8")();
          } else {
            alert(
              "You can't view the cost details before the case is completed."
            );
          }
        }}
        sx={{ margin: "0px 0px 18px 0px" }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            bgcolor: expanded === "open8" ? "#7E00D1" : "#f5f5f5",
            width: "100%",
            borderRadius: 1,
            color: expanded === "open8" ? "white" : "#282828",
            height: "40px",
            minHeight:
              expanded === "open1" ? "50px !important" : "50px !important",
          }}
        >
          <Typography component="span" variant="h4">
            Cost Details
          </Typography>
        </AccordionSummary>
        <form onSubmit={handleUploadAssist}>
          <AccordionDetails>
            <Container maxWidth="lg">
              <Grid container>
                <div className="row my-3 ">
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      Reached Location
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="dropLocation"
                      value={fetcdataListItems.incident_Location}
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
                      Reached Time(Min)
                    </Typography>
                    <TextField
                      fullWidth
                      name="reachedTime"
                      // value="Prefilled"
                      //  type="datetime-local"
                      value={fetcdataListItems.vendorETA}
                      onChange={handleCostVendor}
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
                      Drop Location
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="dropLocation"
                      value={fetcdataListItems.dropLocation}
                      //value={formUploadAssist.dropLocation} onChange={handleCostVendor}
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
                      Drop Time
                    </Typography>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      name="dropTime"
                      value="Prefilled"
                      //	value={formUploadAssist.dropTime} onChange={handleCostVendor}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
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
                      Total Running KMs
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      value={fetcdataListItems.gtoG_KM}
                      //name="totalRunningKMs" value={formUploadAssist.totalRunningKMs} onChange={handleCostVendor}
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
                      Exceptional Approval-Kms
                    </Typography>
                    <Select
                      fullWidth
                      name="exceptionalApprovalKMs"
                      value={formUploadAssist.exceptionalApprovalKMs}
                      onChange={handleCostVendor}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return "Exceptional Approval";
                        }
                        return selected;
                      }}
                      variant="outlined"
                    >
                      <MenuItem value disabled>
                        Exceptional Approval - Kms
                      </MenuItem>
                      {exceptionalKms.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <TextField fullWidth type="text" placeholder="Exceptional Approval-Kms" name="exceptionalApprovalKMs" value={formUploadAssist.exceptionalApprovalKMs} onChange={handleCostVendor} variant="outlined" /> */}
                  </div>
                  <div className="col-md-3 mb-4">
                    <Typography
                      id="simple-select-label"
                      variant="h6"
                      gutterBottom
                    >
                      ExceptionalApproval-PolicyCoverage
                    </Typography>
                    {/* <TextField fullWidth type="text" placeholder="Exceptional Approval-Kms" name="exceptionalApprovalPolicyCoverage" value={formUploadAssist.exceptionalApprovalPolicyCoverage} onChange={handleCostVendor} variant="outlined" /> */}
                    <Select
                      fullWidth
                      name="exceptionalApprovalPolicyCoverage"
                      value={formUploadAssist.exceptionalApprovalPolicyCoverage}
                      onChange={handleCostVendor}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return "Exceptional Approval";
                        }
                        return selected;
                      }}
                      variant="outlined"
                    >
                      <MenuItem value disabled>
                        Exceptional Approval-PolicyCoverage
                      </MenuItem>
                      {Exceptional_policy.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  {/* <div className='col-md-3 mb-4'>
										<Typography id="simple-select-label" variant="h6" gutterBottom>VCRF Form</Typography>

										<RadioGroup

											aria-labelledby="demo-radio-buttons-group-label"
											defaultValue="No"
											name="radio-buttons-group"
										>
											<Grid display="flex" justifyContent="around" alignItem="center">
												<FormControlLabel name="vcrfForm" value="Yes" control={<Radio />} label="Yes" />
												<FormControlLabel name="vcrfForm" value="No" control={<Radio />} label="NO" />
											</Grid>
										</RadioGroup>
									</div> */}
                </div>
              </Grid>
            </Container>
          </AccordionDetails>

          <Typography
            variant="h4"
            sx={{ bgcolor: "#FaF3ff", padding: "20px 10px" }}
            gutterBottom
          ></Typography>
          <AccordionDetails>
            <Container maxWidth="lg">
              <Grid container>
                <div className="row my-3 ">
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6"> Toll Charges</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      name="totalCharges"
                      value={formUploadAssist.totalCharges}
                      onChange={handleCostVendor}
                      placeholder=" Toll Charges"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6"> Waiting Hours Charge</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="waitingHoursCharge"
                      value={formUploadAssist.waitingHoursCharge}
                      onChange={handleCostVendor}
                      placeholder="Waiting Hours Charge"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">
                      {" "}
                      Vehicle Custody Hours Charge
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="vehicleCustodyHoursCharge"
                      value={formUploadAssist.vehicleCustodyHoursCharge}
                      onChange={handleCostVendor}
                      placeholder=" vehicle Custody Hours Charge"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6"> Other Charges</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="otherCharges"
                      value={formUploadAssist.otherCharges}
                      onChange={handleCostVendor}
                      placeholder="Other Charges"
                      variant="outlined"
                    />
                  </div>
                   <div className="col-md-3 mb-3">
                    <Typography varient="h6">Border & Other Charges</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="borderAndOtherCharges"
                      value={formUploadAssist.borderAndOtherCharges}
                      onChange={handleCostVendor}
                      placeholder="Border and Other Charges"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6"> Total Kilometer</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="totalKilometers"
                      value={formUploadAssist.totalKilometers}
                      onChange={handleCostVendor}
                      placeholder="Total Kilometer"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6"> Additional Kilometer</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="additionalKMs"
                      value={formUploadAssist.additionalKMs}
                      onChange={handleCostVendor}
                      placeholder="Additional Kilometer"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">V to I KMs</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="vtoL_KM"
                      value={formUploadAssist.vtoL_KM}
                      onChange={handleCostVendor}
                      placeholder="V to I KMs"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">I to D KMs</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="itoD_KM"
                      value={
                        serviceTypefromSrnData === "RSR"
                          ? ""
                          : formUploadAssist.itoD_KM
                      }
                      onChange={handleCostVendor}
                      placeholder="I to D KMs"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">
                      Total Kilometers Charges
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="totalKilometersCharges"
                      // value={
                      //   fetcdataListItems?.finalAmountWithGST &&
                      //   fetcdataListItems.finalAmountWithGST !== ""
                      //     ? fetcdataListItems.finalAmountWithGST
                      //     : calculatedTotalAmount
                      //       ? Number(
                      //           calculatedTotalAmount
                      //         ).toFixed(2)
                      //       : ""
                      // }
                      value={Number(
                        formUploadAssist?.totalKilometersCharges
                          ? formUploadAssist.totalKilometersCharges
                          : calculatedAmount?.totalAmount || 0
                      ).toFixed(2)}
                      onChange={handleCostVendor}
                      placeholder="Total Kilometers Charges"
                      variant="outlined"
                    />
                  </div>
                  {statusrejVendorID ? (
                    <div className="col-md-3 mb-3">
                      <Typography varient="h6">Total Amount*</Typography>
                      <TextField
                        fullWidth
                        type="text"
                        name="totalAmount"
                        // value={
                        //   fetcdataListItems?.totalAmount &&
                        //   fetcdataListItems.totalAmount !== ""
                        //     ? fetcdataListItems.totalAmount
                        //     : calculatedTotalAmount
                        //       ? Number(calculatedTotalAmount).toFixed(2)
                        //       : ""
                        // }
                        value={formUploadAssist?.totalAmount}
                        onChange={handleCostVendor}
                        //value="Prefilled"
                        variant="outlined"
                        required
                      />
                    </div>
                  ) : (
                    <div className="col-md-3 mb-3">
                      <Typography varient="h6">Total Amount*</Typography>
                      <TextField
                        fullWidth
                        type="text"
                        name="totalAmount"
                        // value={
                        //   fetcdataListItems?.totalAmount &&
                        //   fetcdataListItems.totalAmount !== ""
                        //     ? fetcdataListItems.totalAmount
                        //     : calculatedAmount.totalAmount
                        //       ? Number(calculatedAmount.totalAmount).toFixed(2)
                        //       : ""
                        // }
                        value={formUploadAssist?.totalAmount}
                        onChange={handleCostVendor}
                        // onChange={(e) => {
                        //   setTotalAmount(e.target.value);
                        //   handleCostVendor(e);
                        // }}
                        variant="outlined"
                        required
                      />
                    </div>
                  )}

                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">
                      Final Amount ( with GST )*
                    </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="finalAmountWithGST"
                      // value={
                      //   fetcdataListItems?.finalAmountWithGST &&
                      //   fetcdataListItems.finalAmountWithGST !== ""
                      //     ? fetcdataListItems.finalAmountWithGST
                      //     : calculatedTotalAmountWithGst
                      //       ? Number(
                      //           calculatedTotalAmountWithGst
                      //         ).toFixed(2)
                      //       : ""
                      // }
                      value={formUploadAssist?.finalAmountWithGST}
                      onChange={handleCostVendor}
                      variant="outlined"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">Customer paid Amount </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      name="customerPaidAmount"
                      value={formUploadAssist.customerPaidAmount}
                      onChange={handleCostVendor}
                      placeholder="Customer paid Amount "
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">Customer paid Date </Typography>
                    {/* paymentUpdatedTime */}
                    <TextField
                      fullWidth
                      type="date"
                      name="customerPaidDate"
                      value={formUploadAssist.customerPaidDate}
                      onChange={handleCostVendor}
                      placeholder="Customer paid Date "
                      inputProps={{
                        min: new Date().toISOString().split("T")[0],
                      }}
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">Payment Updated Time</Typography>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      name="paymentUpdatedTime"
                      value={
                        formUploadAssist.paymentUpdatedTime ||
                        fetcdataListItems?.paymentUpdatedTime
                      }
                      onChange={handleCostVendor}
                      placeholder="Customer paid Date "
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">Reference No </Typography>
                    <TextField
                      fullWidth
                      type="text"
                      name="referenceNo"
                      value={formUploadAssist.referenceNo}
                      onChange={handleCostVendor}
                      placeholder="Reference No "
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">Vehicle Type</Typography>
                    <Select
                      fullWidth
                      name="product"
                      value={formUploadAssist.product}
                      onChange={handleCostVendor}
                      variant="outlined"
                      displayEmpty
                      renderValue={(select) => {
                        if (!select) {
                          return "Select";
                        }
                        return select;
                      }}
                      required
                    >
                      <MenuItem value="" disabled>
                        Select
                      </MenuItem>
                      {vehicleType.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <Typography varient="h6">Payment Type </Typography>
                    <Select
                      fullWidth
                      name="paymentType"
                      value={formUploadAssist.paymentType}
                      onChange={handleCostVendor}
                      variant="outlined"
                      displayEmpty
                      renderValue={(select) => {
                        if (!select) {
                          return "Select";
                        }
                        return select;
                      }}
                      required
                    >
                      <MenuItem value="" disabled>
                        Select
                      </MenuItem>
                      {PaymentType.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className=" d-flex justify-content-center gap-5">
                    {/* 
										<button type="button" class="btn  btn-light btn-md  " style={{ border: "1px solid #7E00D1", color: "#7E00D1", fontSize: "14px", width: "144px", height: "40px" }}>Refresh</button> */}
                    {loadingTest === true ? (
                      <button
                        type="submit"
                        className="btn btn-light btn-md"
                        disabled
                        // onClick={handleOpen}
                        style={{
                          backgroundColor: "#7E00D1",
                          color: "white",
                          fontSize: "14px",
                          width: "144px",
                          height: "40px",
                        }}
                      >
                        Submiting
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-light btn-md"
                        // onClick={handleOpen}
                        style={{
                          backgroundColor: "#7E00D1",
                          color: "white",
                          fontSize: "14px",
                          width: "144px",
                          height: "40px",
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
                <Modal
                  open={statusmodal}
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
                      Assistance details saved successfully.Assist Reference
                      Number:
                      <strong></strong>
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
                  </Box>
                </Modal>
              </Grid>
            </Container>
          </AccordionDetails>
        </form>
      </Accordion>
    </>
  );
};

export default CostSearch;
