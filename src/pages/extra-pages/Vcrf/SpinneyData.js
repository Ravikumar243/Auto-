import { url } from "api/api";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ImageViewer from "./ImageViewer";

const SpinneyData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [filterSRN, setFilterSRN] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (imgUrl) => {
    setSelectedImage(imgUrl);
    setViewerOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setViewerOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/GetCustomerData`);
        const data = await res.json();
        setCustomerData(data.customerData || []);
        setFilteredData(data.customerData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = customerData.filter((customer) =>
      customer.srnNo?.toLowerCase().includes(filterSRN.toLowerCase())
    );
    setFilteredData(filtered);
  }, [filterSRN, customerData]);

  // All columns from your previous HTML table
  const columns = [
    {
      name: "Technician Name",
      selector: (row) => row.technicianName,
      sortable: true,
    },
    { name: "Time", selector: (row) => row.time },
    { name: "Date", selector: (row) => row.date },
    { name: "Reg. No", selector: (row) => row.regNo },
    { name: "Job No", selector: (row) => row.jobNo },
    { name: "Odometer Reading", selector: (row) => row.odometerReading },
    {
      name: "KM Travelled by Vehicle",
      selector: (row) => row.kmTravelledByAssistanceVehicle,
    },
    { name: "Reported Fault", selector: (row) => row.reportedFault },
    { name: "Customer Name", selector: (row) => row.customerName },
    { name: "Customer Telephone", selector: (row) => row.customerTelephone },
    { name: "Brand Model", selector: (row) => row.brandModel },
    { name: "Location", selector: (row) => row.location },
    { name: "Reaching Time", selector: (row) => row.reachingTime },
    {
      name: "Delivery to Dealership DateTime",
      selector: (row) => row.deliveryToDealershipDateTime,
    },
    { name: "Created Date", selector: (row) => row.createdDate },
    { name: "SRN No", selector: (row) => row.srnNo, sortable: true },
    { name: "Agency Name", selector: (row) => row.agencyName },
    { name: "Agency No", selector: (row) => row.agencyNo },
    { name: "Vehicle No", selector: (row) => row.vehicleNo },
    { name: "State", selector: (row) => row.state },
    { name: "City", selector: (row) => row.city },
    { name: "Vehicle Make", selector: (row) => row.vehicleMake },
    { name: "Engine No", selector: (row) => row.engineNo },
    { name: "Chassis No", selector: (row) => row.chassisNo },
    { name: "Battery No", selector: (row) => row.batteryNo },
    { name: "Driver Contact No", selector: (row) => row.driverContactNo },
    { name: "Claim Created Date", selector: (row) => row.claimCreatedDate },
    { name: "OTP", selector: (row) => row.otp },
    { name: "Error Message", selector: (row) => row.errorMessage },
    {
      name: "Damage Front",
      selector: (row) => (row.hasDamageFront ? "Yes" : "No"),
    },
    {
      name: "Damage Back",
      selector: (row) => (row.hasDamageBack ? "Yes" : "No"),
    },
    {
      name: "Damage Left Side",
      selector: (row) => (row.hasDamageLeftside ? "Yes" : "No"),
    },
    {
      name: "Damage Right Side",
      selector: (row) => (row.hasDamageRightside ? "Yes" : "No"),
    },
    { name: "Towing", selector: (row) => (row.hasTowing ? "Yes" : "No") },
    { name: "Other Comments", selector: (row) => row.otherComments },
      {
  name: "Pickup Photo 1",
  cell: (row) =>
    row.pickupPhoto1 ? (
      <img
        src={row.pickupPhoto1}
        alt="Photo 1"
        style={{ width: "60px", height: "60px", objectFit: "cover", cursor: "pointer" }}
          onClick={() => handleOpen(row.pickupPhoto1)}       
      />
    ) : (
      "N/A"
    ),
},
    {
      name: "Pickup Photo 2",
      cell: (row) =>
        row.pickupPhoto2 ? (
          <img
            src={row.pickupPhoto2}
            alt="Photo 2"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.pickupPhoto2)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Pickup Photo 3",
      cell: (row) =>
        row.pickupPhoto3 ? (
          <img
            src={row.pickupPhoto3}
            alt="Photo 3"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.pickupPhoto3)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Pickup Photo 4",
      cell: (row) =>
        row.pickupPhoto4 ? (
          <img
            src={row.pickupPhoto4}
            alt="Photo 4"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.pickupPhoto4)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Pickup Photo 5",
      cell: (row) =>
        row.pickupPhoto5 ? (
          <img
            src={row.pickupPhoto5}
            alt="Photo 5"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.pickupPhoto5)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Pickup Photo 6",
      cell: (row) =>
        row.pickupPhoto6 ? (
          <img
            src={row.pickupPhoto6}
            alt="Photo 6"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.pickupPhoto6)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Drop Photo 1",
      cell: (row) =>
        row.dropPhoto1 ? (
          <img
            src={row.dropPhoto1}
            alt="Photo 1"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.dropPhoto1)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Drop Photo 2",
      cell: (row) =>
        row.dropPhoto2 ? (
          <img
            src={row.dropPhoto2}
            alt="Photo 2"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.dropPhoto2)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Drop Photo 3",
      cell: (row) =>
        row.dropPhoto3 ? (
          <img
            src={row.dropPhoto3}
            alt="Photo 3"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.dropPhoto3)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Drop Photo 4",
      cell: (row) =>
        row.dropPhoto4 ? (
          <img
            src={row.dropPhoto4}
            alt="Photo 4"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.dropPhoto4)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Drop Photo 5",
      cell: (row) =>
        row.dropPhoto5 ? (
          <img
            src={row.dropPhoto5}
            alt="Photo 5"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.dropPhoto5)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Drop Photo 6",
      cell: (row) =>
        row.dropPhoto6 ? (
          <img
            src={row.dropPhoto6}
            alt="Photo 6"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.dropPhoto6)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Is Two Wheeler",
      selector: (row) => (row.isTwoWheeler ? "Yes" : "No"),
    },
    {
      name: "Is Four Wheeler",
      selector: (row) => (row.isFourWheeler ? "Yes" : "No"),
    },
    {
      name: "Dealer Signature",
      cell: (row) =>
        row.dealerSignature ? (
          <img
            src={row.dealerSignature}
            alt="Dealer Signature"
            style={{ width: "70px", height: "70px", borderRadius: "8px" }}
          />
        ) : (
          "—"
        ),
    },
    {
      name: "Customer Signature",
      cell: (row) =>
        row.customerSignature ? (
          <img
            src={row.customerSignature}
            alt="Customer Signature"
            style={{ width: "70px", height: "70px", borderRadius: "8px" }}
          />
        ) : (
          "—"
        ),
    },
    {
      name: "Operator Signature",
      cell: (row) =>
        row.operatorSignature ? (
          <img
            src={row.operatorSignature}
            alt="Operator Signature"
            style={{ width: "70px", height: "70px", borderRadius: "8px" }}
          />
        ) : (
          "—"
        ),
    },
    {
      name: "Audio System",
      selector: (row) => (row.hasAudioSystem ? "Yes" : "No"),
    },
    {
      name: "Has Keys Remote",
      selector: (row) => (row.hasKeysRemote ? "Yes" : "No"),
    },
    { name: "Has Tools", selector: (row) => (row.hasTools ? "Yes" : "No") },
    { name: "Has Uniform", selector: (row) => (row.hasUniform ? "Yes" : "No") },
    {
      name: "Has Seat Cover/Floor",
      selector: (row) => (row.hasSeatCoverFloor ? "Yes" : "No"),
    },
    {
      name: "Has Water Bottle",
      selector: (row) => (row.hasWaterBottle ? "Yes" : "No"),
    },
    {
      name: "Has Car Cover",
      selector: (row) => (row.hasCarCover ? "Yes" : "No"),
    },
    // { name: "Dealer Signature 2", selector: (row) => row.dealerSignature2 },
    {
      name: "Call Center Rating",
      selector: (row) => row.callCenterServiceRating,
    },
    { name: "Roadside Rating", selector: (row) => row.roadsideServiceRating },
    { name: "Overall Rating", selector: (row) => row.overallServiceRating },
    {
      name: "Recommendation Likelihood",
      selector: (row) => row.recommendationLikelihood,
    },
    { name: "Valuable Comments", selector: (row) => row.valuableComments },
  ];

  return (
    <div className="container-fluid mt-4">
      <h4 className="mb-5">Spinny Data</h4>
      <div className="mb-3 col-3">
        <label className="form-label">Search by SRN No</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter SRN No"
          value={filterSRN}
          onChange={(e) => setFilterSRN(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="600px"
          highlightOnHover
          striped
          dense
          responsive
        />
      </div>
      {viewerOpen && selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "red",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            &times;
          </button>
          <ImageViewer imageUrl={selectedImage} />
        </div>
      )}
    </div>
  );
};

export default SpinneyData;
