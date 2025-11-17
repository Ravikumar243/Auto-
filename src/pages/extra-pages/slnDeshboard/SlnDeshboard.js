import React,{useMemo} from "react"
import SlnDeshboardHooks from './SlnDeshboardHooks'
import MainCard from 'components/MainCard'
import { Grid } from '@mui/material'
import DataTable from "react-data-table-component"
import { ToastContainer } from 'react-toastify'
import SaveAltIcon from '@mui/icons-material/SaveAlt';


const SlnDeshboard = () => {
	// const Data = [
	// 	{ 'S_No': "1", 'policyNumber': "123", 'serviceType': "4W FBT", 'SRN_no': "SRN407494333802", 'customerName': "Rishabh Khatana", 'customerMobile': "9719134152", 'Location': "sec 52 Noida", 'Location_type': "abc", 'modelName': "121-Tatamotors", 'vehicleRegistrationNumber': "vln00893#", 'chasisNo': "0899", 'created_Date': "4/24/2025", 'status': "ongoing", 'Action': "on the way of Incedent" },
	// 	{ 'S_No': "2", 'policyNumber': "301", 'serviceType': "4W FBT", 'SRN_no': "SRN093032417371", 'customerName': "DEWA TOWING SERVICES", 'customerMobile': "9719134152", 'Location': "sec 52 Noida", 'Location_type': "abc", 'modelName': "101-Ecomet", 'vehicleRegistrationNumber': "vln00893#", 'chasisNo': "0899", 'created_Date': "4/24/2025", 'status': "ongoing", 'Action': "on the way of Incedent" },
	// 	{ 'S_No': "3", 'policyNumber': "986", 'serviceType': "4W FBT", 'SRN_no': "SRN582838912920", 'customerName': "Shivam Crane Services", 'customerMobile': "9719134152", 'Location': "sec 52 Noida", 'Location_type': "abc", 'modelName': "VLI-FORD", 'vehicleRegistrationNumber': "vln00893#", 'chasisNo': "0899", 'created_Date': "4/24/2025", 'status': "ongoing", 'Action': "on the way of Incedent" },
	// ]
	// setFromdate, setTodate  setSearch, filtercase,
	const { listData, handleDowloadExcel, formData, handleSubmit, handledatechange } = SlnDeshboardHooks()
	const column = useMemo(()=>[
		// {
		// 	name: "S. NO",
		// 	cell: (row, index) => <>{index + 1}</>
		// },
		{
			name: "S.No",
			cell: (row, index) => <>{index + 1}</>,
			width:"70px"
		},
		
		{
			name: "SRN No",
			selector: (row) => <>{row.reference_No}</>,
			width: "200px",
		},
		{
			name: "Customer Name",
			selector: (row) => <>{row.firstName + " " + row.lastName}</>,
			width:"160px"
		},
		{
			name: "Mobile Number",
			selector: (row) => <>{row.contactNo}</>,
			width:"140px"
		},
		{
			name: "Location",
			selector: (row) => <>{row.incidentLocation}</>,
			width:"300px"
		},
		{
			name: "Model Name",
			selector: (row) => <>{row.carModel}</>,
			width:"220px"
		},
		{
			name: "Registration Number",
			selector: (row) => <>{row.vehicleRegistration}</>,
			width:"180px"
		},
		{
			name: "Chasis No",
			selector: (row) => <>{row.chassisNo}</>,
			width:'200px'
		},
		{
			name: "Date",
			selector: (row) => <>{row.reportedDate}</>,
			width:'180px'
		},
		{
			name: "Status",
			selector: (row) => <>{row.status	}</>
		},
		// {
		// 	name: "Action",
		// 	selector: () => <><button type="button" style={{ color: "#f5f5f5", borderRadius: '4px', background: "#7e00d1", border: "none", padding: "5px 20px", fontSize: "16px" }}><EditIcon className="me-1" />EDIT</button></>
		// },
	]);

		const tableCustomStyles = {
  headCells: {
    style: {
      backgroundColor: "#f0f0f0"
    },
  },
};
	return (
		<div>
			<div className=''>
				<MainCard title=" ">
					<h4>SLA Report</h4>
					<div className="d-flex justify-content-between">
						{/* <div className="d-flex " style={{ width: "30%", height: "40px" }}>
						</div> */}
					</div>
					<form onSubmit={handleSubmit}>
						<div className="row mt-2">
							<div className="col-md-2">
								<input type="date" className="form-control" name="from" value={formData.from} onChange={handledatechange} style={{ fontSize: "14px" }}
									required/>
							</div>
							<div className="col-md-2">
								<input type="date" className="form-control" name="to" value={formData.to} onChange={handledatechange} style={{ fontSize: "14px" }}
									required/>
							</div>
							<div className="col-md-2">
								<button type="Submit" style={{ color: "white", borderRadius: '4px', background: "#7e00d1", border: "none", padding: "7px 40px", fontSize: "14px" }}>Submit</button>
							</div>
							<div className="col-md-4 ">
								<button style={{ color: "white", borderRadius: '4px', background: "#7e00d1", border: "none", padding: "5px 10px", fontSize: "14px" }}
							onClick={() => handleDowloadExcel(listData)}><SaveAltIcon className="me-1" />Generate Excel</button>
							</div>
						</div>
					</form>
					<Grid item xs={12} md={12} lg={12}>
						<Grid>
							<ToastContainer />
						</Grid>
						<DataTable className="mt-5 data-table"
							columns={column}
							data={listData}
							customStyles={tableCustomStyles}
							pagination
							fileration
							fixedHeader
						></DataTable>
					</Grid>
				</MainCard>
			</div>
		</div>
	)
}

export default SlnDeshboard
