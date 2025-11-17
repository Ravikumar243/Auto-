
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { url } from "../../../api/api";
import { CircularProgress } from "../../../../node_modules/@mui/material/index";
 
const FeedbackRecord = () => {
  const [customerData, setCustomerData] = useState([]);
  const [filterSRN, setFilterSRN] = useState("");
  const [loading, setLoading] =useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}/GetCustomerFeedbackRecord`);
        const data = await res.json();
        setCustomerData(data.getCustomerFeedbackList || []);
      } catch (error) {
        console.log("Error fetching data:", error);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Define columns
  const columns = [
       { name: "SRN Number", selector: (row) => row.srN_Number},
    { name: "Call Center Service Rating", selector: (row) => row.callCenterServiceRating, width:"230px"},
    { name: "Road Service Rating", selector: (row) => row.roadsideServiceRating, width:"200px" },
    { name: "Over All Service Rating", selector: (row) => row.overallServiceRating, width:"190px" },
    { name: "Recommendation ", selector: (row) => row.recommendationLikelihood , width:"160px"},
    { name: "Valuable Comments", selector: (row) => row.valuableComments , width:"180px"},
    { name: "Customer Telephone", selector: (row) => row.customerTelephone, width:"180px" },
    { name: "Created Date", selector: (row) => row.created_date },
   
  ];

    const tableCustomStyles = {
    headCells: {
      style: {
        backgroundColor: "#f0f0f0",
      },
    },
  };
 
  return (
    <div className="container-fluid">
      <h4 className="fs-5">FeedBack Record</h4>
 
      {/* Filter input */}
  
 
      {/* DataTable */}
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
            data={customerData}
            customStyles={tableCustomStyles}
            pagination
            highlightOnHover
            striped
            responsive
            persistTableHead
          />
        )}
      </div>
    </div>
  );
};
 
export default FeedbackRecord;