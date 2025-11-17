import React, { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import logo from "../../../assets/images/users/aaLogo.png";
import axios from "../../../../node_modules/axios/index";
import baseURL from "../../../api/autoApi";
import { IoLocationOutline } from "react-icons/io5";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const MessageliveLocation = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const srnNumber = queryParams.get("RequestNumber");
  console.log(srnNumber,"srn")
  const [srn, setSrn] = useState(srnNumber);
  const [userlocationPoints, setUserLocationPoints] = useState({
    lat: null,
    lng: null,
  });
  const [vendorlocationPoints, setVendorLocationPoints] = useState({
    lat: null,
    lng: null,
  });

  const navigate = useNavigate();

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
 

  const handleviewLocation = () => {
  if (
    userlocationPoints.lat &&
    userlocationPoints.lng &&
    vendorlocationPoints.lat &&
    vendorlocationPoints.lng
  ) {
    navigate("/live-tracking", {
      state: {
        srnNumber,
        userlocationPoints,
        vendorlocationPoints,
      },
    });
  } else {
    alert("Coordinates not found. Please refresh the page.");
  }
};


  return (
    <div>
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
            <h4 className="text-center mt-2">Live location Towing van </h4>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <IoLocationOutline
              style={{ fontSize: "150px", color: "oklch(58.8% 0.158 241.966)" }}
            />
          </div>
          {srn ? (
            <div className="text-center mt-2">
              <h6>Please click bellow down</h6>
              <button
               onClick={handleviewLocation}
              // onClick={() =>
              //     handleviewLocation(
              //       userlocationPoints.lat,
              //       userlocationPoints.lng,
              //       vendorlocationPoints.lat,
              //       vendorlocationPoints.lng
              //     )
              //   }
                style={{
                  backgroundColor: "#7E00D1",
                  color: "white",
                  fontSize: "14px",
                  width: "144px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "0px solid #7e00d1",
                }}
              >
                click here{" "}
              </button>
            </div>
          ) : (
            <div className="text-center mt-5">
              <h6>Please click below down </h6>
              <button
                onClick={() => alert("Please Refresh the page")}
                style={{
                  backgroundColor: "#7E00D1",
                  color: "white",
                  fontSize: "14px",
                  width: "144px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "0px solid #7e00d1",
                }}
              >
                click here{" "}
              </button>
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default MessageliveLocation;
