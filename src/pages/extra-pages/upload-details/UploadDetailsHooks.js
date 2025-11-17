

import React, { useState, useEffect } from 'react'
import baseURL from '../../../api/autoApi'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { json } from '../../../../node_modules/react-router-dom/dist/index';
import axios from '../../../../node_modules/axios/index';
import Swal from "sweetalert2";

const UploadDetailsHooks = () => {
	const navigate = useNavigate()

	const [count, setcount] = useState('false');
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [update, setUpdate] = useState(false);
	const [companyNames, setCompanyNames] = useState('');
	const [getCompanyData, setGetCompanyData] = useState('');
	const [dataitems, setDataitems] = useState([])
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		companyName: ''
	});
	const [formeval, setFormeval] = useState({
		name: '',
	});
	// const [show, setShow] = useState(true);
	const [companylist, setCompanylist] = useState([]);
	const [formPdf, setFormPdf] = useState({
		CompanyName: '',
		file: null,
	})
	const [todayCases, setTodayCases] = useState([])


	useEffect(() => {
		GetCompanyList();
	}, [update])

	useEffect(() => {
		if (search !== '') {
			const filetrdata = dataitems.filter((row) =>
				row.name?.toLowerCase().includes(search.toLowerCase()) ||
				row.email?.toLowerCase().includes(search.toLowerCase()) ||
				row.mobile?.toLowerCase().includes(search.toLowerCase()) ||
				row.engineNo?.toLowerCase().includes(search.toLowerCase()) ||
				row.chassisNo?.toLowerCase().includes(search.toLowerCase()) ||
				row.batteryNo?.toLowerCase().includes(search.toLowerCase())
			);
			setGetCompanyData(filetrdata);
		}

	}, [search, dataitems]);

	const GetCompanyList = async () => {
		try {
			const listdata = await fetch(`${baseURL}/GetCompanyList`);
			const data = await listdata.json()
			setCompanylist(data.dataItem)
		} catch (error) {
			console.log("Unable to fetch data");
		}
	}

	const handleCreateCompanyN = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			prev,
			[name]: value,
		}));

	}

	const handleAddList = async (e) => {
		e.preventDefault(); 
		try {
			const response = await fetch(`${baseURL}/AddNewCompany`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
			const data = await response.json();
			handleClose();
			setUpdate(prev => !prev);
				toast.success("Company Name added Successfully");
				setForm((prev) => ({
					prev,
					CompanyName: '',
				}));
			
		} catch (error) {
			console.log("Error Message:", error.message);
			toast.error(error.message);
			handleClose();

		}
	}

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setCompanyNames(e.target.value);
		setFormeval((prev) => ({ ...prev, name: value }));
		setFormPdf((prev) => ({ ...prev, [name]: value, }));

	}

	const handleFileChanges = (e) => {
		const file = e.target.files[0]
		setFormPdf((prev) => ({ ...prev, [e.target.name]: file }));
	}
	const handleSubmitPDF = async (e) => {
		e.preventDefault();
		if (!formPdf.file || !formPdf.CompanyName) {
			alert("Please provide Company name and Upload a excel file before submitting.");
			return;
		}
		const formData = new FormData();
		const cName = formPdf.CompanyName;
		formData.append("file", formPdf.file);

		const fileName = formPdf.file.name.split(" ")[0].split(".xlsx")[0];

		let url = "";

		if (fileName === "MCSL_Company") {
			url = `${baseURL}/MCSL_CompanyBulkUpload`;
		} else if (fileName === "Montra-EV_Company") {
			url = `${baseURL}/Montra_EV_CompanyBulkUpload`;
		} else if (fileName === "GO_Mech_Company") {
			url = `${baseURL}/GO_MechBulkUpload`;
		} else {
			alert("Invalid file name format. Please upload a supported sheet.");
			return;
		}

		try {
			setLoading(true)
			const response = await fetch(`${url}?CompanyName=${cName}`, {
				method: "POST",
				body: formData,
			});
			const data = await response.json();
			toast.success("Uploaded successfully!");

		} catch (error) {
			console.error("Error uploading file:", error);
			toast.error('Something went wrong.Please try again.');
		} finally {
			setLoading(false)
		}
	};

	const downloadExcelFile = () => {
		const link = document.createElement("a");
		// if (companyNames !== "") {
		if (companyNames === "GO_Mech_Company") {
			link.href = "/GO_Mech_Company.xlsx";
			link.download = "GO_Mech_Company.xlsx";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else if (companyNames === "MCSL") {
			link.href = "/MCSL_Company.xlsx";
			link.download = "MCSL_Company.xlsx";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else if (companyNames === "Montra-EV") {
			link.href = "/Montra-EV_Company.xlsx";
			link.download = "Montra-EV_Company.xlsx";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			alert("Please select a Valid Company Name !")
		}
		
	}
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {

		try {
			const req = await fetch(`${baseURL}/GetSRNList`);
			const response = await req.json();
			const data = response.dataItem;
			const Com_nameslist = data.filter(row => row.companyName === "Montra-EV_Company" || row.companyName === "MCSL_Company")
			setTodayCases(Com_nameslist);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const handleReload = () => {
		setcount(prev => !prev);
	}

	const handleuploadSearch = async () => {
		if (formeval.name === "") {
			return alert('select comany name')
		}
		try {
			const response = await fetch(`${baseURL}/GetRecordByCompany`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formeval),
			});
			const data = await response.json();
			setDataitems(data.customerList);
			toast.success("Company Details fetched successfully!");

		} catch (error) {
			console.error("Error uploading file:", error);
			toast.error('Something went wrong.Please try again.');
		}
	}

	const handleSearchCases = (value) => {
		const data = value;
		let expandPanel = null;
		expandPanel = 'open';
		// }
		if (expandPanel) {
			navigate('/createTickets', { state: { uploadedDetails: data, } });
		}
		else {
			alert('All required fields are filled. No accordion to open specifically.');
		}
	}


const handleDeleteCompany = async () => {
  if (!companyNames) {
    Swal.fire("Oops!", "Please select a company name", "warning");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axios.post(`${baseURL}/DeleteCompany`, {
          companyName: companyNames,
        });

        Swal.fire("Deleted!", res.data.message, "success");
        GetCompanyList();
		setCompanyNames("");
      } catch (error) {
        console.error("Error message", error);
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  });
};


	const tableHeaderStyle = {
		headCells: {
			style: {
				fontWeight: "bold",
				fontSize: "17px",
				backgroundColor: "rgba(241,244,249,255)",
			},
			head: {
				style: {
					borderTopLeftRadius: "10px",
					borderTopRightRadius: "10px",
				},
			},
			cells: {
				style: {
					fontSize: "0.875rem",
					fontFamily: "'Public Sans',sans-serif",
				},
			},
		},
	};


	return {
		tableHeaderStyle,
		handleReload,
		fetchData,
		downloadExcelFile,
		handleSubmitPDF,
		handleFileChanges,
		handleChanges,
		handleAddList,
		handleCreateCompanyN,
		GetCompanyList,
		handleOpen, formPdf, companylist, handleClose, form, open,
		todayCases, count, dataitems,

		handleuploadSearch, search, setSearch, getCompanyData, handleSearchCases, loading,handleDeleteCompany
	}
}

export default UploadDetailsHooks
