import React, { useMemo } from "react";
import MainCard from "components/MainCard";
import { Grid, Box } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import DataTable from "react-data-table-component";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ToastContainer } from "react-toastify";
// import uploadfile from '../../../../src/assets/images/users/uploadFIle.png'
// import assignWorkshop from '../../../../src/assets/images/users/assignWorkshop.png'
// import sendSMS from '../../../../src/assets/images/users/sendSMS.png'
// import updateTask from '../../../../src/assets/images/users/updateTask.png'
// import viewCasehistory from '../../../../src/assets/images/users/viewCasehistory.png'
// import Hook from 'pages/extra-pages/userCreation/hook';
import ActiveCasesHook from "./ActiveCasesHook";
// import { Height } from '../../../../node_modules/@mui/icons-material/index';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ReplayIcon from "@mui/icons-material/Replay";
import index from "../searchDetails/Index";
dayjs.extend(customParseFormat);


const AutoActivecases = () => {

  const loggedMail = localStorage.getItem("userEmail")


  const {
    
    search,
    setSearch,
    filterData,
    assigned,
    completed,
    escalated,
    setMysearch,
    mysearch,
    followsearch,
    setFollowsearch,
    mycases,
    setRecallCancelledSearch,
    recallCancelledSearch,
    comSearch,
    setComSearch,
    escSearch,
    setEscSearch,
    filterCancelledCases,
    handleReload,
    handleSearchCases,
  } = ActiveCasesHook();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
  };



   const filteredCases = mycases.filter(
    (row) => row.assigned_AgentId?.toLowerCase() === loggedMail?.toLowerCase()
  );


  const column2 = useMemo(() => [
    {
      name: "Search Ticket",
      cell: (row, index) => (
        <div className="custom-cell">
          <SearchOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={(e) => handleSearchCases(row.srN_No)}
          />
          {/* <Button
                    type="button"
                    className="btn btn-primary me-4"
                    onClick={(e) => handleSearchCases(row.srN_No)}
                    style={{ backgroundColor: "#7E00D1", border: "0px", fontSize: '0.875rem !important' }}
                > </Button> */}
        </div>
      ),
      width: "130px",
    },
    {
      name: "SRN No",
      selector: (row) => row.srN_No,
      width: "200px",
    },
    {
      name: "Remark",
      selector: (row) => row.srN_Remark,
      width: "160px",
      cell: (row) => <> {row.srN_Remark}</>,
    },
    // {
    //     name: 'Status',
    //     selector: row => row.srN_Status,
    //     width: "240px",
    //     cell: row => <>
    //         {/* {row.srN_Status}  */}
    //         {/* {row.rsaStatus ==="" ? row.rsaStatus : row.srN_Status}
    //          */}

    //     </>
    // },
    {
      name: "Status",
      selector: (row) => row.srN_Status || row.srN_Status,
      width: "240px",
      cell: (row) => (
        <>
          {/* {row.rsaStatus} */}
          {row.rsaStatus ? row.rsaStatus : row.srN_Status}
        </>
      ),
    },

    {
      name: "Customer Name",
      selector: (row) => row.customerFirstName + " " + row.customerLastName,
      width: "150px",
    },
    {
      name: "Mobile Number exc",
      selector: (row) => row.customerMobileNo,
      width: "240px",
    },
    {
      name: "Service Type",
      selector: (row) => row.serviceDrop_IncidentType,
      width: "130px",
    },
    {
      name: "Incident Location",
      selector: (row) => row.incident_Location,
      width: "140px",
    },
    {
      name: "Location Type",
      selector: (row) => row.serviceDrop_LocationType,
      width: "140px",
    },
    {
      name: "Model Name",
      selector: (row) => row.model_Variant,
      width: "140px",
    },
    {
      name: "Vehicle No",
      selector: (row) => row.vehicleNo,
      width: "120px",
    },
    {
      name: "Chasis No",
      selector: (row) => row.chasisNo_FrameNo,
      width: "120px",
    },
    {
      name: "Created Date",
      selector: (row) => row.caseCreated_Date,
      width: "200px",
      options: {
        customBodyRender: (value) => {
          const isWithinFirst3Seconds = (dateString) => {
            const date = new Date(
              dateString.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
            );
            const seconds = date.getMinutes();
            return seconds >= 0 && seconds <= 2;
          };
          const highlight = isWithinFirst3Seconds(value);
          return (
            <div
              style={{ backgroundColor: highlight ? "yellow" : "transparent" }}
            >
              {value}
            </div>
          );
        },
      },
    },

    {
      name: "Case Creatred Time",
      selector: (row) => row.tat,
      width: "240px",
      cell: (row) => (
        <>
          {row.tat}
        </>
      ),
    },
    
  ]);

  const column1 = useMemo(() => [
    {
      name: "Search Ticket",
      cell: (row, index) => (
        <div className="custom-cell">
          <SearchOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={(e) => handleSearchCases(row.srN_No)}
          />
        </div>
      ),
      width: "130px",
    },
    {
      name: "SRN No",
      selector: (row) => row.srN_No,
      width: "200px",
    },
    {
      name: "Remark",
      selector: (row) => row.srN_Remark,
      width: "160px",
      cell: (row) => <> {row.srN_Remark}</>,
    },
    {
      name: "Status",
      selector: (row) => row.srN_Status || row.srN_Status,
      width: "240px",
      cell: (row) => (
        <>
          {row.rsaStatus ? row.rsaStatus : row.srN_Status}
        </>
      ),
    },

    {
      name: "Customer Name",
      selector: (row) => row.customerFirstName + " " + row.customerLastName,
      width: "150px",
    },
    {
      name: "Service Type",
      selector: (row) => row.serviceDrop_IncidentType,
      width: "130px",
    },

    {
      name: "Mobile Number exc",
      selector: (row) => row.customerMobileNo,
      width: "240px",
    },
    {
      name: "Incident Location",
      selector: (row) => row.incident_Location,
      width: "140px",
    },
    {
      name: "Location Type",
      selector: (row) => row.serviceDrop_LocationType,
      width: "140px",
    },
    {
      name: "Model Name",
      selector: (row) => row.model_Variant,
      width: "140px",
    },
    {
      name: "Vehicle No",
      selector: (row) => row.vehicleNo,
      width: "120px",
    },
    {
      name: "Chasis No",
      selector: (row) => row.chasisNo_FrameNo,
      width: "120px",
    },
    {
      name: "Created Date",
      selector: (row) => row.caseCreated_Date,
      width: "200px",
      options: {
        customBodyRender: (value) => {
          const isWithinFirst3Seconds = (dateString) => {
            const date = new Date(
              dateString.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
            ); 
            const seconds = date.getMinutes();
            return seconds >= 0 && seconds <= 2;
          };

          const highlight = isWithinFirst3Seconds(value);

          return (
            <div
              style={{ backgroundColor: highlight ? "yellow" : "transparent" }}
            >
              {value}
            </div>
          );
        },
      },
    },

    {
      name: "TAT",
      selector: (row) => row.tat,
      width: "240px",
      cell: (row) => <>{row.tat}</>,
    },
   
  ]);

  const column = useMemo(() => [
    {
      name: "Search Ticket",
      cell: (row, index) => (
        <div className="custom-cell">
          <SearchOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={(e) => handleSearchCases(row.srN_No)}
          />
        </div>
      ),
      width: "130px",
    },
    {
      name: "SRN No",
      selector: (row) => row.srN_No,
      width: "200px",
    },
    {
      name: "Remark",
      selector: (row) => (
        <div
          style={{
            width:"100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <p>{row.srN_Remark}</p>
        </div>
      ),
      width: "200px",

      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
        <p>{row.srN_Remark}</p>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.srN_Status || row.srN_Status,
      width: "240px",

      cell: (row) => <>{row.rsaStatus ? row.rsaStatus : row.srN_Status}</>,
    },

    {
      name: "Customer Name",
      selector: (row) => row.customerFirstName + " " + row.customerLastName,
      width: "150px",
    },
    {
      name: "Mobile Number",
      selector: (row) => row.customerMobileNo,
      width: "140px",
    },
    {
      name: "Service Type",
      selector: (row) => row.serviceDrop_IncidentType,
      width: "130px",
    },
    {
      name: "Incident Location",
      selector: (row) => row.incident_Location,
      width: "200px",
    },
    {
      name: "Location Type",
      selector: (row) => row.serviceDrop_LocationType,
      width: "140px",
    },
    {
      name: "Model Name",
      selector: (row) => row.model_Variant,
      width: "230px",
    },
    {
      name: "Vehicle No",
      selector: (row) => row.vehicleNo,
      width: "120px",
    },
    {
      name: "Chasis No",
      selector: (row) => row.chasisNo_FrameNo,
      width: "170px",
    },
    {
      name: "Created Date & Time",
      selector: (row) => row.caseCreated_Date,
      width: "200px",
    },
  ]);

const tableCustomStyles = {
  headCells: {
    style: {
      justifyContent: "flex-start", 
      textAlign: "left",
      fontWeight: "bold",
      backgroundColor: "#f0f0f0"
    },
  },
  cells: {
    style: {
      justifyContent: "flex-start", 
      textAlign: "left",            
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
};

  const [value, setValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mt-4">
      <MainCard title=" ">
        <Grid item xs={12} md={12} lg={12}>
          <Grid>
            <ToastContainer />
          </Grid>
          <div className="text-end ">
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  className="d-flex justify-content-between testtt"
                  TabIndicatorProps={{ style: { display: "none" } }}
                >
                  <Tab
                    label="Today's Cases"
                    value="1"
                    sx={{
                      color: value === "1" ? "white" : "black",
                      borderBottom: value === "1" ? "2px solid #7E00D1" : "0px",
                      textDecoration: "none",
                      // padding: "10px 10px",
                      "&.Mui-selected": {
                        backgroundColor: "",
                        color: "#7E00D1",
                        fontWeight: "bolder",
                        borderBottom: "2px solid #7E00D1",
                      },
                      "&:hover": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                      },
                    }}
                  />
                  <Tab
                    label="My Cases"
                    value="2"
                    sx={{
                      color: value === "2" ? "white" : "black",
                      textDecoration: "none",
                      padding: "10px 25px",
                      "&.Mui-selected": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                        borderBottom: "2px solid #7E00D1",
                      },
                      "&:hover": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                      },
                    }}
                  />
                  <Tab
                    label="Follow-up"
                    value="3"
                    sx={{
                      color: value === "3" ? "white" : "black",
                      textDecoration: "none",
                      padding: "10px 25px",
                      "&.Mui-selected": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                        borderBottom: "2px solid #562477ff",
                      },
                      "&:hover": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                      },
                    }}
                  />
                  <Tab
                    label="Escalated Cases"
                    value="4"
                    sx={{
                      color: value === "4" ? "white" : "black",
                      textDecoration: "none",
                      padding: "10px 25px",
                      "&.Mui-selected": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                        borderBottom: "2px solid #7E00D1",
                      },
                      "&:hover": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                      },
                    }}
                  />
                  <Tab
                    label="Completed"
                    value="5"
                    sx={{
                      color: value === "5" ? "white" : "black",
                      textDecoration: "none",
                      padding: "10px 25px",
                      "&.Mui-selected": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                        borderBottom: "2px solid #7E00D1",
                      },
                      "&:hover": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                      },
                    }}
                  />
                  <Tab
                    label="Recall/cancelled"
                    value="6"
                    sx={{
                      // backgroundColor: value === "6" ? "purple" : "transparent",
                      color: value === "6" ? "white" : "black",
                      // borderRadius: "7px 25px",
                      textDecoration: "none",
                      padding: "10px 25px",
                      "&.Mui-selected": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                        borderBottom: "2px solid #7E00D1",
                      },
                      "&:hover": {
                        color: "#7E00D1",
                        fontWeight: "bolder",
                      },
                    }}
                  />
                </Tabs>
              </Box>
              <TabPanel value="1" className="upperDiv">
                <div className="d-flex justify-content-between">
                  <div>
                    <p style={{ fontSize: "24px", fontWeight: "600" }}>
                      Today's Cases
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary me-4"
                      onClick={handleReload}
                      style={{ backgroundColor: "#7E00D1", border: "0px" }}
                    >
                      <ReplayIcon /> Reload
                    </button>
                  </div>
                </div>
                <div className="text-end">
                  {/* row={filteredRows} */}
                  <DataTable
                    columns={column}
                    data={filterData}
                    fixedHeader
                    customStyles={tableCustomStyles}
                    className="data-table"
                    pagination
                    subHeader
                    subHeaderComponent={
                      <>
                        <div className="row">
                          <div
                            className="d-flex items-center form-control ms-3"
                            style={{ width: "270px" }}
                          >
                            <SearchOutlinedIcon
                              style={{
                                cursor: "pointer",
                                fonsize: "16px",
                                position: "relative",
                                zIndex: "999",
                              }}
                            />
                            <input
                              type="text"
                              className=""
                              placeholder="Search by SRN No / Phone No ..."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              style={{
                                fontSize: "14px",
                                paddingLeft: "10px",
                                background: "transparent",
                                border: "none",
                                width: "100%",
                                outline: "none",
                              }}
                            />

                            <div className="d-flex"></div>
                          </div>
                        </div>
                      </>
                    }
                  />
                </div>
              </TabPanel>
              <TabPanel value="2" className="upperDiv">
                <div className="d-flex justify-content-between">
                  <div>
                    <p style={{ fontSize: "24px", fontWeight: "600" }}>
                      My Cases
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary me-4"
                      onClick={handleReload}
                      style={{ backgroundColor: "#7E00D1", border: "0px" }}
                    >
                      <ReplayIcon />
                      Reload
                    </button>
                  </div>
                </div>
                <div className="text-end">
                  <DataTable
                    columns={column}
                    data={filteredCases}
                    fixedHeader
                    customStyles={tableCustomStyles}
                    className="data-table"
                    pagination
                    subHeader
                    subHeaderComponent={
                      <>
                        <div className="row">
                          <div
                            className="d-flex items-center form-control ms-3"
                            style={{ width: "270px" }}
                          >
                            <SearchOutlinedIcon
                              style={{
                                cursor: "pointer",
                                fonsize: "16px",
                                position: "relative",
                                zIndex: "999",
                              }}
                            />
                            <input
                              type="text"
                              className=""
                              placeholder="Search by SRN No / Phone No ..."
                              value={mysearch}
                              onChange={(e) => setMysearch(e.target.value)}
                              style={{
                                fontSize: "14px",
                                paddingLeft: "10px",
                                background: "transparent",
                                border: "none",
                                width: "100%",
                                outline: "none",
                              }}
                            />
                            <div className="d-flex"></div>
                          </div>

                         
                        </div>
                      </>
                    }
                  />
                </div>
              </TabPanel>
              <TabPanel value="3" className="upperDiv">
                <div className="d-flex justify-content-between">
                  <div>
                    <p style={{ fontSize: "24px", fontWeight: "600" }}>
                      Follow-Up
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary me-4"
                      onClick={handleReload}
                      style={{ backgroundColor: "#7E00D1", border: "0px" }}
                    >
                      <ReplayIcon />
                      Reload
                    </button>
                  </div>
                </div>
                <div className="text-end">
                  <DataTable
                    columns={column2}
                    data={assigned}
                    fixedHeader
                    customStyles={tableCustomStyles}
                    className="data-table"
                    pagination
                    subHeader
                    subHeaderComponent={
                      <>
                        <div className="row">
                          <div
                            className="d-flex items-center form-control ms-3"
                            style={{ width: "270px" }}
                          >
                            <SearchOutlinedIcon
                              style={{
                                cursor: "pointer",
                                fonsize: "16px",
                                position: "relative",
                                zIndex: "999",
                              }}
                            />
                            <input
                              type="text"
                              className=""
                              placeholder="Search by SRN No / Phone No ..."
                              value={followsearch}
                              onChange={(e) => setFollowsearch(e.target.value)}
                              style={{
                                fontSize: "14px",
                                paddingLeft: "10px",
                                background: "transparent",
                                border: "none",
                                width: "100%",
                                outline: "none",
                              }}
                            />
                            <div className="d-flex"></div>
                          </div>
                        </div>
                      </>
                    }
                  />
                </div>
              </TabPanel>
              <TabPanel value="4" className="upperDiv">
                <div className="d-flex justify-content-between">
                  <div>
                    <p style={{ fontSize: "24px", fontWeight: "600" }}>
                      Escalated Cases
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary me-4"
                      onClick={handleReload}
                      style={{ backgroundColor: "#7E00D1", border: "0px" }}
                    >
                      <ReplayIcon />
                      Reload
                    </button>
                  </div>
                </div>
                <div className="text-end">
                  <DataTable
                    columns={column1}
                    data={escalated}
                    fixedHeader
                    customStyles={tableCustomStyles}
                    className="data-table"
                    pagination
                    subHeader
                    subHeaderComponent={
                      <>
                        <div className="row">
                          <div
                            className="d-flex items-center form-control ms-3"
                            style={{ width: "270px" }}
                          >
                            <SearchOutlinedIcon
                              style={{
                                cursor: "pointer",
                                fonsize: "16px",
                                position: "relative",
                                zIndex: "999",
                              }}
                            />
                            <input
                              type="text"
                              className=""
                              placeholder="Search by SRN No / Phone No ..."
                              value={escSearch}
                              onChange={(e) => setEscSearch(e.target.value)}
                              style={{
                                fontSize: "14px",
                                paddingLeft: "10px",
                                background: "transparent",
                                border: "none",
                                width: "100%",
                                outline: "none",
                              }}
                            />
                            <div className="d-flex"></div>
                          </div>
                        </div>
                      </>
                    }
                  />
                </div>
              </TabPanel>
              <TabPanel value="5" className="upperDiv">
                <div className="d-flex justify-content-between">
                  <div>
                    <p style={{ fontSize: "24px", fontWeight: "600" }}>
                      Completed
                    </p>
                  </div>
                  <button
                    className="btn btn-primary me-4"
                    onClick={handleReload}
                    style={{
                      backgroundColor: "#7E00D1",
                      border: "0px",
                      height: "37px",
                    }}
                  >
                    <ReplayIcon />
                    Reload
                  </button>
                </div>
                <div className="text-end">
                  <DataTable
                    columns={column}
                    data={completed}
                    fixedHeader
                    customStyles={tableCustomStyles}
                    className="data-table"
                    pagination
                    subHeader
                    subHeaderComponent={
                      <>
                        <div className="row">
                          <div
                            className="d-flex items-center form-control ms-3"
                            style={{ width: "270px" }}
                          >
                            <SearchOutlinedIcon
                              style={{
                                cursor: "pointer",
                                fonsize: "16px",
                                position: "relative",
                                zIndex: "999",
                              }}
                            />
                            <input
                              type="text"
                              className=""
                              placeholder="Search by SRN No / Phone No ..."
                              value={comSearch}
                              onChange={(e) => setComSearch(e.target.value)}
                              style={{
                                fontSize: "14px",
                                paddingLeft: "10px",
                                background: "transparent",
                                border: "none",
                                width: "100%",
                                outline: "none",
                              }}
                            />
                            <div className="d-flex"></div>
                          </div>
                        </div>
                      </>
                    }
                  />
                </div>
              </TabPanel>
              <TabPanel value="6" className="upperDiv">
                <div className="d-flex justify-content-between">
                  <div>
                    <p style={{ fontSize: "24px", fontWeight: "600" }}>
                      Recall/Cancelled
                    </p>
                  </div>
                  <button
                    className="btn btn-primary me-4"
                    onClick={handleReload}
                    style={{
                      backgroundColor: "#7E00D1",
                      border: "0px",
                      height: "37px",
                    }}
                  >
                    <ReplayIcon />
                    Reload
                  </button>
                </div>
                <div className="text-end">
                  <DataTable
                    columns={column}
                    data={filterCancelledCases}
                    fixedHeader
                    customStyles={tableCustomStyles}
                    className="data-table"
                    pagination
                    subHeader
                    subHeaderComponent={
                      <>
                        <div className="row">
                          <div
                            className="d-flex items-center form-control ms-3"
                            style={{ width: "270px" }}
                          >
                            <SearchOutlinedIcon
                              style={{
                                cursor: "pointer",
                                fonsize: "16px",
                                position: "relative",
                                zIndex: "999",
                              }}
                            />
                            <input
                              type="text"
                              className=""
                              placeholder="Search by SRN No / Phone No ..."
                              value={recallCancelledSearch}
                              onChange={(e) =>
                                setRecallCancelledSearch(e.target.value)
                              }
                              style={{
                                fontSize: "14px",
                                paddingLeft: "10px",
                                background: "transparent",
                                border: "none",
                                width: "100%",
                                outline: "none",
                              }}
                            />
                            <div className="d-flex"></div>
                          </div>
                        </div>
                      </>
                    }
                  />
                </div>
              </TabPanel>
            </TabContext>
          </div>
        </Grid>
       
      </MainCard>
      <div className="my-3 p-3 descDiv">
       
      </div>
    </div>
  );
};

export default AutoActivecases;
// export { Data }
