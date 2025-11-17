
import React from "react";
import { Grid, Container } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import logo from "../../../assets/images/users/aaLogo.png";
import MessageCustomerHooks from "./MessageCustomerHooks";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import "./vendorLocation.css"

const MessageCustomer = () => {
  // ✅ renamed to vendorCoords
  const { vendorCoords, error, userLatLong } = MessageCustomerHooks() || {};
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestNumber = params.get("RequestNumber");
  const srn_no = requestNumber || "";

  const navigate = useNavigate();

  const vendorViewMap = () => {
    if (
      vendorCoords?.lat &&
      vendorCoords?.long &&
      userLatLong?.lat &&
      userLatLong?.long
    ) {
      navigate("/vendor-live-tracking", {
        state: {
          srn_no,
          vendorCoords,
          userLatLong,
        },
      });
    } else {
      alert("Coordinates not found. Please refresh the page.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid
        sx={{
          border: "1px solid black",
          padding: "10px",
          margin: "auto",
          width: "330px",
          marginTop: "100px",
          borderRadius: "5px",
        }}
      >
        <img src={logo} width="100%" alt="img" />
        <hr />
        <div className="text-center">
          <h5 className="mt-4">Location Tracking Towing</h5>
        </div>

        {error ? (
          <div className="text-center">
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <PiWarningCircleBold
              style={{ fontSize: "150px", color: "orange" }}
            />
            <h6>Please turn on your device location</h6>
            <p>{error}</p>
          </div>
        ) : vendorCoords?.lat && vendorCoords?.long ? (
          <div className="text-center">
            <IoMdCheckmarkCircleOutline
              style={{ fontSize: "200px", color: "green" }}
            />
            <h6>Thanks for sharing your location!</h6>
          </div>
        ) : (
          <div className="text-center">
            <h6>Requesting location...</h6>
            <Skeleton animation="wave" />
          </div>
        )}

        {userLatLong?.lat && userLatLong?.long ? (
          <div className="text-center mt-3">
            <button className="btn text-white" style={{backgroundColor:"#7E00D1"}} onClick={vendorViewMap}>
              View Map
            </button>
          </div>
          // <div className="text-center mt-3">
          //   <button className="btn-neon" onClick={vendorViewMap}>
          //     View Map
          //   </button>
          // </div>
        ) : null}
      </Grid>
    </Container>
  );
};

export default MessageCustomer;
