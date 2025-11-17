import { useState, } from "react";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import baseURL from '../../../api/autoApi'
import axios from "axios";
// import CreateCustomerHooks from "../customer/createDetails/CreateCustomerHooks";
import { toast } from 'react-toastify';

const CreateCustomerHooks = () => {
	// const { setExpanded, expanded } = CreateCustomerHooks();
	const [activeStep, setActiveStep] = useState();
	const [completed, setCompleted] = useState({});
	const [companyName, setCompanyName] = useState('');
	const [supportVerification, setSupportVerification] = useState("");
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState("open");
	const [generatedSRN, setGeneratedSRN] = useState('');
	const [incidentStatus, setIncidentStatus] = useState(false);
	const [venderModal, setVenderModal] = useState(false);
	const [statusmodal, setStatusmodal] = useState(false);
	const [venderAssign, setVenderAssign] = useState(false)
	const [assistData, setAssistData] = useState(true);
	const [completeDeatils, setCompleteDeatils] = useState(false);
	const [fetcdataListItems, setFetcdataListItems] = useState('');
	const [states, setStates] = useState([]);
	const [stepsCount, setStepscount] = useState(0);
	const [userLatitude, setUserLatitude] = useState(0.0);
	const [searchCalimAllData, setSearchCalimAllData] = useState([])
	// const [vendorCity, setVendorCity] = useState('');
	// const [vendorState, setVendorState] = useState('');

	const navigate = useNavigate();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleSerachAssistance = () => setAssistData(true);
	const handleIncidenceOpen = () => setIncidentStatus(true);
	const handleIncidenceClose = () => setIncidentStatus(false);
	const handleDetailsModal = () => setCompleteDeatils(false);
	const handleAssignOpen = () => setVenderModal(true);
	const handleAssignClose = () => {
		setVenderModal(false);
		setVenderAssign(true);
	}
	const venderAssignOpen = () => setVenderAssign(true);
	const venderAssignClose = () => setVenderAssign(false);

	const handleAccordionChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : null);
	};

	const [formSRN, setFormSRN] = useState({ srN_No: "" });
	const [formClaimsData, setFormClaimsData] = useState({ rquestData: "" });

	const [searchCalimTerms, setSearchCalimTerms] = useState('')

	const handleSrnFetch = (e) => {
		const { name, value } = e.target;
		setFormSRN((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleClaimFetch = (e) => {
		const { name, value } = e.target;
		setFormClaimsData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	const fetchData = async (e) => {
		e.preventDefault();
		if (!formSRN.srN_No) {
			alert("Ticket No/SRN No is mandetory !")
			return;
		}
		try {
			let url = ``;
			let hUrl = ``;
			if (formSRN.srN_No !== '') {
				url = `${baseURL}/GetSRNData`;
				hUrl = `${baseURL}/GetSRN_History`;
				const response = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formSRN),
				});

				const response_h = await fetch(hUrl, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formSRN),
				});

				const result = await response.json();
				const hResult = await response_h.json();

				if (result.status && result.dataItem && result.dataItem.length > 0) {
					const data = result.dataItem[0];
					const summaryData = (hResult.dataItems && hResult.dataItems.length > 0) ? hResult.dataItems[0] : '';
					let count;
					let expandPanel = null;
					if (!data.incident_Location?.trim()) {
						expandPanel = 'open3';
						count = 2;
					} else if (!data.serviceDrop_IncidentType.trim()) {
						// else if (!data.incident?.trim()) {
						expandPanel = 'open4';
						count = 3;
						// count = 'Complete Details';
					} else if (!data.vtoL_KM?.trim()) {
						expandPanel = 'open5';
						count = 4;
						// count = 'Complete Details';
					} else if (!data.rsaStatus?.trim()) {
						// else if (data.rsaStatus === "OnGoing" && data.srN_Remark === "Ongoing") 
						expandPanel = 'open6';
						// count = 5;
					} else if (data.rsaStatus === "Case Completed" && !data.toll?.trim()) {
						expandPanel = 'open8';
						// count = '6';
					} else if (!data.toll?.trim()) {
						expandPanel = 'open6';
						// count = '5';
					} else {
						expandPanel = 'open8';
						// count = '6';
					}
					// if (
					// 	(data.srN_Remark === "Case Cancelled" && data.srN_Status === "Vendor Close Issue") ||
					// 	(data.srN_Remark === "Ongoing" && data.srN_Status === "OnGoing" && data.rsaStatus === "Case Completed")
					// ) {
					// 	setExpanded("open8");
					// } else {
					// 	setExpanded("open6");
					// }

					// 	// (!data.rsaStatus?.trim()) {
					// 	expandPanel = 'open6';
					// } else {
					// 	expandPanel = 'open8';
					// }

					if (expandPanel) {
						navigate('/createTickets', { state: { expandPanel, ticketData: data, historyStatus: summaryData, stepscounts: count } });
					}
					else {
						alert('All required fields are filled. No accordion to open specifically.');
					}
				} else {
					alert('No Data Found!');
				}
			}
			else if (formClaimsData.rquestData) {
				const response = await fetch(`${baseURL}/GetAllClaimsAutoData`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formClaimsData),
				});

				const result = await response.json();
				const litsMenu = result.dataItem[0];
				// if (expandPanel) {
				let expandPanel = 'open3';
				navigate('/createTickets', { state: { expandPanel, ticketData: result, claimData: litsMenu, } });
				// }
				// if (result.status && result.dataItem && result.dataItem.length > 0) {
				// 	const data = result.dataItem[0];
				// 	const summaryData = (hResult.dataItems && hResult.dataItems.length > 0) ? hResult.dataItems[0] : '';
				// 	const count = 0;
				// 	let expandPanel = null;
				// 	if (!data.incident_Location?.trim()) {
				// 		expandPanel = 'open3';
				// 		// count = 'Complete Details';
				// 	} else if (!data.serviceDrop_IncidentType?.trim()) {
				// 		expandPanel = 'open4';
				// 		// count = 'Complete Details';
				// 	} else if (!data.vtoL_KM?.trim()) {
				// 		expandPanel = 'open5';
				// 		// count = 'Complete Details';
				// 	} else if (!data.rsaStatus?.trim()) {
				// 		// else if (data.rsaStatus === "OnGoing" && data.srN_Remark === "Ongoing") 
				// 		expandPanel = 'open6';
				// 		// count = 5;
				// 	} else if (data.rsaStatus === "Case Completed" && !data.toll?.trim()) {
				// 		expandPanel = 'open8';
				// 		// count = '6';
				// 	} else if (!data.toll?.trim()) {
				// 		expandPanel = 'open6';
				// 		// count = '5';
				// 	} else {
				// 		expandPanel = 'open8';
				// 		// count = '6';
				// 	}
				// 	if (expandPanel) {
				// 		navigate('/createTickets', { state: { expandPanel, ticketData: data, historyStatus: summaryData, stepscounts: count } });
				// 	}
				// }
			}

		} catch (error) {
			console.log('error fetching data', error);
		}
	};
	// handleAccordionChange = { handleAccordionChange } handleIncidenceOpen = { handleIncidenceOpen } expanded = { expanded } fetcdataListItems = { fetcdataListItems }

	// expanded = { expanded === 'open3'} ,{state: { expandPanel: "open3" } }

	const handleSearchCalimChanges = (e) => {
		setSearchCalimTerms((e.target.value)?.trim())
	}

	const handleSearchCalimData = async () => {
		if (searchCalimTerms.length > 0) {
			try {
				const response = await axios.post(
					`${baseURL}/GetFilteredRecord_Global`,
					{
						searchtext: searchCalimTerms,
					}
				);

				const data = response.data?.dataItem || [];
				setSearchCalimAllData(data);
				if (data.length === 0) {
					toast.info('No data found', {
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				}
			} catch (error) {
				console.error(error);
				toast.error('An error occurred while fetching data', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		} else {
			toast.info('Ticket No / Engine / Vehicle Reg / Chassis / Mobile / Email Address / Battery No', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	};

	return {
		activeStep,
		completed,
		companyName,
		supportVerification,
		handleClose,
		open,
		handleOpen,
		expanded,
		setExpanded,
		handleAccordionChange,
		setCompanyName,
		generatedSRN,
		incidentStatus,
		handleIncidenceOpen,
		handleIncidenceClose,
		handleAssignOpen,
		handleAssignClose,
		venderModal,
		venderAssign,
		venderAssignClose,
		venderAssignOpen,
		handleSerachAssistance,
		assistData,
		statusmodal,
		completeDeatils,
		handleDetailsModal,
		fetcdataListItems,
		states,
		stepsCount,
		setStepscount,
		ToastContainer,
		userLatitude,
		handleSrnFetch,
		fetchData,
		formSRN,
		formClaimsData,
		handleClaimFetch,
		handleSearchCalimChanges,
		searchCalimTerms,
		handleSearchCalimData,
		searchCalimAllData
	};
};

export default CreateCustomerHooks;
