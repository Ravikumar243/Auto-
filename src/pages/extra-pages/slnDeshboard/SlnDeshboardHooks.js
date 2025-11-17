import { useState } from 'react'
import baseURL from '../../../api/autoApi'
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
// import dayjs from 'dayjs';

const SlnDeshboardHooks = () => {
	const [listData, setListData] = useState([]);
	// const [filtercase, setFiltercase] = useState([]);
	const [search, setSearch] = useState('');
	// const [fromdate, setFromdate] = useState('');
	// const [todate, setTodate] = useState('');
	const [formData, setFormData] = useState({
		from: "",
		to: "",
	})

	const handledatechange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const URL = `${baseURL}/GetVendorSLA`
			// const request = await fetch(`${ baseURL }/GetPolicyCRMData`);
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData)
			});
			const data = await response.json();
			setListData(data.dataItems);
		} catch (error) {
			console.log("error", error);
		}
	}
	// useEffect(() => {
	// 	fetchDataAPI();
	// }, []); 


	const handleDowloadExcel = (data, filename = "sheetdata.xlsx") => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
		const file = new Blob([excelBuffer], { type: "application/octet-stream" });
		saveAs(file, filename);
	}

	// useEffect(() => {
	// 	// console.log(row);
	// 	// const rowDate = dayjs(row.date)
	// 	// const isRange = (!fromdate || rowDate.isSameOrAfter())
	// 	const result = listData.filter((row) =>

	// 		row.firstName?.toLowerCase().includes(search.toLowerCase())
	// 	)
	// 	setFiltercase(result)
	// }, [listData, search,]);
	//  fromdate, todate

	return { listData, handleDowloadExcel, setSearch, formData, handleSubmit, handledatechange, search }

	// setFromdate, setTodate, filtercase,
}

export default SlnDeshboardHooks;