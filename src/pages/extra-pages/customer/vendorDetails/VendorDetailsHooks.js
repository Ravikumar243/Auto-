import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
// import { contextType } from "react-copy-to-clipboard";
// import { useNavigate } from "react-router-dom";
import baseURL from '../../../../api/autoApi'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const VendorDetailsHooks = () => {
	const [activeStep, setActiveStep] = useState();
	const [flag, setflag] = useState(false);
	const [completed, setCompleted] = useState({});
	const [open, setOpen] = useState(false);
	// const [expanded, setExpanded] = useState("open");
	const [generatedSRN, setGeneratedSRN] = useState('');
	const [data, setData] = useState([
		// ["Date & Time", ""],
		// ["Case ID", ""],
		// ["Customer Name", ""],
		// ["Vehicle Make /Brand", ""],
		// ["Model", ""],
		// ["Registration No", ""],
		// ["Verified Customer", ""],
		// ["Incident Reason", ""],
		// ["Incident Place", ""],
		// ["Drop Location", ""]
	]);

	const [assistData, setAssistData] = useState(true);
	const [completeDeatils, setCompleteDeatils] = useState(false);
	const [fetcdataListItems, setFetcdataListItems] = useState('');
	const [stepsCount, setStepscount] = useState(0);
	// const navigate = useNavigate();


	// modal open fun
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleDetailsModal = () => setCompleteDeatils(false);
	const handleDownload = (vall) => {
		fetchClaim(vall);
	}

	const fetchClaim = async (idd) => {
		try {
			const res = await fetch(`${baseURL}/GetSRNDetail`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ srN_No: idd }),
			})
			const data = await res.json();
			if (data?.dataItems?.[0]) {
				setData([
					["Date & Time", data.dataItems[0].caseCreated_Date],
					["Case ID", data.dataItems[0].srN_No],
					["Customer Name", data.dataItems[0].fullName],
					["Vehicle Make /Brand", data.dataItems[0].make],
					["Model", data.dataItems[0].model_Variant],
					["Registration No", data.dataItems[0].vehicleNo],
					["Verified Customer", data.dataItems[0].verifiedCustomer],
					["Incident Reason", data.dataItems[0].incidentReason],
					["Incident Place", data.dataItems[0].incidentAddress],
					["Drop Location", data.dataItems[0].dropLocation]
				])
			}
		} catch (error) {
			console.log('error Message', error);
		}
	}

	useEffect(() => {
		setflag(true)
		claimDownloaddetails();
	}, [data]);

	const claimDownloaddetails = async () => {
		if (flag) {
			const rows = [
				["Case Remarks", "Case Information"],
				...data
			];

			const ws = XLSX.utils.aoa_to_sheet(rows);
			["A1", "B1"].forEach((addr) => {
				if (ws[addr]) {
					ws[addr].s = {
						font: { bold: true },
						alignment: { horizontal: "center", vertical: "center" },
						border: {
							top: { style: "thin", color: { rgb: "000000" } },
							bottom: { style: "thin", color: { rgb: "000000" } },
							left: { style: "thin", color: { rgb: "000000" } },
							right: { style: "thin", color: { rgb: "000000" } }
						}
					};
				}
			});

			ws["!cols"] = rows[0].map((h) => ({ wch: h.toString().length + 2 }));
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "Claim Intimation Form");
			const excelBuffer = await XLSX.write(wb, { bookType: "xlsx", type: "array" });
			saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Claim Intimation Form.xlsx");

		}
	}

	// modal close fun
	//open Accordion 
	// const handleAccordionChange = (panel) => (event, isExpanded) => {
	// 	setExpanded(isExpanded ? panel : null);
	// };

	// complete form Incident Deatils
	const [fetchForm, setFetchForm] = useState({ srN_No: "" });
	// save Srn Status details

	const [formsrnStatus, setFormSrnStatus] = useState({
		srN_No: "SRN998107637461",
		srN_Status: "",
		srN_Remark: "",
		rsaTimeLineStatus: "",
		followup_DateTime: "",
		assistance_Summary: "",
		vendorReachedDropLoc: "",
	})

	// const handleswitch = (e) => {
	// 	handleAccordionChange(e);
	// 	//   document.getElementById("panel2-header").click();
	// }

	// const handleCoordinates = (e) => {
	// 	setArea(e.target.value);
	// }

	const handleStatus = (e) => {
		// setFormSrnStatus({ ...formsrnStatus, [e.target.name]: e.target.value });
	}

	// useEffect(() => {
	// console.log("Updated Area:", area);
	// setFormArea((prevForm) => ({
	// 	...prevForm,
	// 	area: area,
	// }));
	//setInterval
	// const handlerdelay = setTimeout(() => {
	// 	handleCoordinatesAPI();
	// }, 500);

	// return () => clearTimeout(handlerdelay);
	// }, [area]);

	useEffect(() => {

		setFetchForm((prevForm) => ({
			...prevForm,
			srN_No: generatedSRN, // Update srN_No with the new value
		}));
		// setFormAssistance((prevForm) => ({
		// 	...prevForm,
		// 	srN_No: generatedSRN,
		// }))

		// setFormSrnStatus((prev) => ({
		// 	...prev,
		// 	srN_No: generatedSRN,
		// }))

	}, [generatedSRN]); // Adding vall as a dependency to useEffect to ensure it runs when vall changes

	// Log the updated fetchForm state
	// useEffect(() => {

	// 	fetchData();
	// }, [fetchForm]);



	// const fetchData = async () => {
	// 	// alert("hello")
	// 	try {
	// 		const responce = await fetch("https://mintflix.live:8086/api/Auto/GetSRNData", {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(fetchForm),
	// 		}
	// 		);
	// 		const data = await responce.json();
	// 		const { status, message, dataItem } = data;

	// 		//Destructure the first object inside "dataItem"
	// 		if (dataItem.length > 0) {
	// 			const fetchedData = dataItem[0];
	// 			setFetcdataListItems(fetchedData);
	// 			//console.log(fetcdataListItems?.srN_No)
	// 		}
	// 	} catch (error) {
	// 		console.log('error fetching data', error);
	// 	}
	// };



	const handleVendordetailsSubmit = async (e) => {
		e.preventDefault();

		try {
			const respond = await fetch('https://mintflix.live:8086/api/Auto/SaveSRN_StatusDetails',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'Application/Json',
					},
					body: JSON.stringify(formsrnStatus),
				}
			);

			const data = await respond.json();
			console.log('data', data);
			toast.success('Form Submitted Successfully !')
		
		} catch (error) {
			toast.success('form Submitted !', error);
		}
	}
	return {
		activeStep,
		completed,
		handleClose,
		open,
		handleOpen,
		// expanded,
		// setExpanded,
		// handleAccordionChange,
		// handleswitch,
		generatedSRN,
		assistData,
		// formAssistance,
		completeDeatils,
		handleDetailsModal,
		fetcdataListItems,
		stepsCount,
		setStepscount,
		ToastContainer,
		handleVendordetailsSubmit,
		handleStatus,
		formsrnStatus,
		handleDownload,
	};
}

export default VendorDetailsHooks
