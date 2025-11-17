import React, { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import logo from "../../../assets/images/users/aaLogo.png";
import MessaggeHooks from "./MessaggeHooks";
import Skeleton from "@mui/material/Skeleton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import Button from "themes/overrides/Button";
import axios from "../../../../node_modules/axios/index";
import baseURL from "api/autoApi";

const Messagge = () => {
  const { location, error } = MessaggeHooks();

  const queryParams = new URLSearchParams(window.location.search);
  const srnNumber = queryParams.get("RequestNumber");
  console.log(srnNumber, "srn");
  const [srn, setSrn] = useState(srnNumber);
  const [userlocationPoints, setUserLocationPoints] = useState({
    lat: null,
    lng: null,
  });
  const [vendorlocationPoints, setVendorLocationPoints] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    console.log(" 123", srnNumber);
    fetchpoints(srnNumber);
  }, [srnNumber]);

  const fetchpoints = async (srn) => {
    try {
      if (srn) {
        const res = await axios.post(`${baseURL}/GetAllCoordinates`, {
          srN_No: srn,
        });
        setUserLocationPoints({
          lat: Number(res.data.dataItem[0].userLatitude),
          lng: Number(res.data.dataItem[0].userLongitude),
        });
        setVendorLocationPoints({
          lat: Number(res.data.dataItem[0].vendorLatitude),
          lng: Number(res.data.dataItem[0].vendorLongitude),
        });
      } else {
        alert("Couldn't Find Details.Please refresh the page.");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleviewLocation = (lx, ly, ulx, uly) => {
    const googleMapsLink = (() => {
      if (lx && ly && ulx && uly) {
        return `https://www.google.com/maps/dir/?api=1&origin=${lx},${ly}&destination=${ulx},${uly}&travelmode=driving`;
      }
      return "";
    })();
    console.log("Google Maps Link:", googleMapsLink);
    if (googleMapsLink) {
      window.open(googleMapsLink, "_self");
    }
  };

  return (
    <>
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
            <h5 className=" mt-4"> Location Tracking User </h5>
          </div>
          {error ? (
            <div className="text-center">
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
              <PiWarningCircleBold
                style={{
                  fontSize: "150px",
                  color: "oklch(82.8% 0.189 84.429)",
                }}
              />
              <h6>Please Turn on your device Location</h6>
              <p>{error}</p>
            </div>
          ) : location.lat && location.long ? (
            <div className="text-center">
              <IoMdCheckmarkCircleOutline
                style={{ fontSize: "200px", color: "green" }}
              />
              <h6>Thanks For Location Sharing</h6>
              {/* <button
                // onClick={handleviewLocation(
                //   userlocationPoints.lat,
                //   userlocationPoints.lng,
                //   vendorlocationPoints.lat,
                //   vendorlocationPoints.lng
                // )}
                    onClick={() => window.history.back()}

                className="btn btn-primary"
              >
                Close
              </button> */}
            </div>
          ) : (
            <div className="text-center">
              <h6>Requesting Location...</h6>
            </div>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Messagge;
