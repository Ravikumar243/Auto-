import React, { useEffect, useState } from 'react'
import axios from '../../../../node_modules/axios/index'
import baseURL from '../../../api/autoApi'
import { toast } from '../../../../node_modules/react-toastify/'

const UploadCItysHooks = () => {
    const [loading,setLoading]=useState(false);
    const [dataitems,setDataitems]= useState([])
    const [uploadFile,setUploadFile] = useState(null)
    const [search,setSearch]=useState('')
    const [filterData,setFilterData]= useState([])
    useEffect(()=>{
        handleStatecitys()
    },[])

    useEffect(()=>{
        if(!search){
            return;
        }
        const filteredData = dataitems.filter((items)=>
            items.state.toLowerCase().includes(search.toLowerCase()) || items.city.toLowerCase().includes(search.toLowerCase()) || items.pincode.toLowerCase().includes(search.toLowerCase()))
        console.log("filterdata",filteredData)
        setFilterData(filteredData);
    },[search,dataitems])

    const handleStatecitys= async()=>{
        try{
            const res = await axios.get(`${baseURL}/GetAutoStateCity`)
            setDataitems(res.data.dataItem)
        }catch(error){
            console.log("error message",error);
        }
    }

    const handleUploadStateCity= async()=>{
        if(uploadFile === null){
            alert("Please Select a file");
            return;
        }
        setLoading(true)
        const form = new FormData();
        form.append("file",uploadFile)
        
        try{
            const res = await axios.post(`${baseURL}/StateCityBulkUpload`,form);
            console.log(res)
            toast.success("File Uploaded Successfully.")
            setUploadFile(null)
            handleStatecitys()
        }catch(error){
            console.log("Error Message",error);
        }finally{
            setLoading(false)
        }
    }

    	const downloadExcelFile = () => {
	        const link = document.createElement("a");
			link.href = "/StateCityUploaders_Template.xlsx";
			link.download = "StateCityUploaders_Template.xlsx";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		
	}
  return {
    handleUploadStateCity,loading,setUploadFile,dataitems,uploadFile,downloadExcelFile,search,setSearch,filterData
  }
}

export default UploadCItysHooks