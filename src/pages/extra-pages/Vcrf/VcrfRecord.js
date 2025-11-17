import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { url } from "../../../api/api";
import { Box, CircularProgress, Modal } from "../../../../node_modules/@mui/material/index";
import ImageViewer from "./ImageViewer";

const VcrfRecord = () => {
  const [customerData, setCustomerData] = useState([]);
  const [filterSRN, setFilterSRN] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userRole = userInfo?.role || 'Agent';



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}/GetCustomerData`);
        const data = await res.json();
        setCustomerData(data.customerData || []);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter by SRN No
  const filteredData = customerData.filter((customer) =>
    customer.srnNo?.toLowerCase().includes(filterSRN.toLowerCase())
  );



  const handleOpen = (imgUrl) => {
    setSelectedImage(imgUrl);
    setViewerOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setViewerOpen(false);
  };


  const adminColumns = [
    {
      name: "Vendor Name",
      selector: (row) => row.technicianName,
      sortable: true,
      width: "180px",
    },
    {
      name: "SRN No",
      selector: (row) => row.srnNo,
      sortable: true,
      width: "200px",
    },
    { name: "Time", selector: (row) => row.time },
    { name: "Date", selector: (row) =>  row.date?.split(" ")[0], width: "140px" },
   
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      width: "150px",
    },
    {
      name: "Customer Telephone",
      selector: (row) => row.customerTelephone,
      width: "180px",
    },
    { name: "Location", selector: (row) => row.location, width: "300px" },
    {
      name: "Created Date",
      selector: (row) => row.createdDate.split(" ")[0],
      width: "180px",
    },
    { name: "State", selector: (row) => row.state },
    { name: "City", selector: (row) => row.city },
    
    {
      name: "Driver Contact No",
      selector: (row) => row.driverContactNo,
      width: "160px",
    },
    
   {
  name: "Pickup Photo 1",
  cell: (row) =>
    row.pickupPhoto1 ? (
      <img
        src={row.pickupPhoto1}
        alt="Photo 1"
        style={{ width: "100px", height: "60px", objectFit: "cover", cursor: "pointer" }}
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
            style={{ width: "100px", height: "60px", objectFit: "cover" }}
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
            style={{ width: "100px", height: "60px", objectFit: "cover" }}
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
            style={{ width: "100px", height: "60px", objectFit: "cover" }}
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
            style={{ width: "100px", height: "60px", objectFit: "cover" }}
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
            style={{ width: "100px", height: "60px", objectFit: "cover" }}
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
            style={{ width: "80px", height: "60px", objectFit: "cover" }}
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
      name: "Customer Signature",
      cell: (row) =>
        row.customerSignature ? (
          <img
            src={row.customerSignature}
            alt="Signature"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.customerSignature)}
          />
        ) : (
          "N/A"
        ),
      width: "180px",
    },
    {
      name: "Operator Signature",
      cell: (row) =>
        row.operatorSignature ? (
          <img
            src={row.operatorSignature}
            alt="Signature"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.operatorSignature)}
          />
        ) : (
          "N/A"
        ),
      width: "160px",
    },
    
    {
      name: "Dealer Signature 2",
      cell: (row) =>
        row.dealerSignature2 ? (
          <img
            src={row.dealerSignature2}
            alt="Signature"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.dealerSignature2)}
            
          />
        ) : (
          "N/A"
        ),
      width: "160px",
    },
   
  ];


   const agentColumns = [
    
  
    {
      name: "SRN No",
      selector: (row) => row.srnNo,
      sortable: true,
      width: "200px",
    },
    { name: "Date", selector: (row) => row.date?.split(" ")[0], width: "180px" },
    { name: "State", selector: (row) => row.state },
    { name: "City", selector: (row) => row.city },
     { name: "Vendor Name", selector: (row) => row.technicianName, width:"160px" },
     { name: "Time", selector: (row) => row.time },
    {
  name: "Photo 1",
  cell: (row) =>
    row.photoUrl1 ? (
      <img
        src={row.photoUrl1}
        alt="Photo 1"
        style={{ width: "60px", height: "60px", objectFit: "cover", cursor: "pointer" }}
          onClick={() => handleOpen(row.photoUrl1)}       
      />
    ) : (
      "N/A"
    ),
},
    {
      name: "Photo 2",
      cell: (row) =>
        row.photoUrl2 ? (
          <img
            src={row.photoUrl2}
            alt="Photo 1"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.photoUrl2)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Photo 3",
      cell: (row) =>
        row.photoUrl3 ? (
          <img
            src={row.photoUrl3}
            alt="Photo 1"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.photoUrl3)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Photo 4",
      cell: (row) =>
        row.photoUrl4 ? (
          <img
            src={row.photoUrl4}
            alt="Photo 1"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.photoUrl4)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Photo 5",
      cell: (row) =>
        row.photoUrl5 ? (
          <img
            src={row.photoUrl5}
            alt="Photo 1"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.photoUrl5)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Photo 6",
      cell: (row) =>
        row.photoUrl6 ? (
          <img
            src={row.photoUrl6}
            alt="Photo 1"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.photoUrl6)}
          />
        ) : (
          "N/A"
        ),
    },
    
    {
      name: "Customer Signature",
      cell: (row) =>
        row.customerSignature ? (
          <img
            src={row.customerSignature}
            alt="Signature"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.customerSignature)}
          />
        ) : (
          "N/A"
        ),
      width: "180px",
    },
    {
      name: "Operator Signature",
      cell: (row) =>
        row.operatorSignature ? (
          <img
            src={row.operatorSignature}
            alt="Signature"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.operatorSignature)}
          />
        ) : (
          "N/A"
        ),
      width: "160px",
    },
    
    {
      name: "Dealer Signature 2",
      cell: (row) =>
        row.dealerSignature2 ? (
          <img
            src={row.dealerSignature2}
            alt="Signature"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            onClick={() => handleOpen(row.dealerSignature2)}
            
          />
        ) : (
          "N/A"
        ),
      width: "160px",
    },
   
  ];


  const columns = userRole === "Admin" ? adminColumns : agentColumns;

  const tableCustomStyles = {
    headCells: {
      style: {
        backgroundColor: "#f0f0f0",
      },
    },
  };

  return (
    <div className="container-fluid">
      <h4 className="fs-5">Vcrf Record</h4>

      {/* Filter input */}
      <div className="col-3 mt-3">
        <label className="form-label">Search By SRN No</label>
        <input
          type="text"
          className="form-control"
          placeholder="Filter by SRN No"
          value={filterSRN}
          onChange={(e) => setFilterSRN(e.target.value)}
        />
      </div>

      <div className="mt-4">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ padding: "4rem" }}
          >
            <CircularProgress />
            <span style={{ marginLeft: "1rem" }}>Loading...</span>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            customStyles={tableCustomStyles}
            highlightOnHover
            striped
            responsive
            persistTableHead
           
          />
        )}
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

export default VcrfRecord;
