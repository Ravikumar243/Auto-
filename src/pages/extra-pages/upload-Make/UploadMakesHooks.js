import React, { useEffect, useState } from "react";
import axios from "../../../../node_modules/axios/index";
import baseURL from "../../../api/autoApi";
import { toast } from "../../../../node_modules/react-toastify/";

const UploadMakesHooks = () => {
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [search, setSearch] = useState("");
  const [dataitems, setDataitems] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [vehicleType, setVehicleType] = useState("Four wheeler");

  useEffect(() => {
    handleMakeModels();
  }, []);

  useEffect(() => {
    if (!search) {
      return;
    }
    const filteredData = dataitems.filter(
      (items) =>
        items.make.toLowerCase().includes(search.toLowerCase()) ||
        items.model.toLowerCase().includes(search.toLowerCase())
    );
    console.log("filterdata", filteredData);
    setFilterData(filteredData);
  }, [search, dataitems]);

  // const handleMakeModels = async () => {
  //     try {
  //         const res = await axios.get(`${baseURL}/GetMakeModel`)
  //         setDataitems(res.data.dataItem)
  //     } catch (error) {
  //         console.log("error message", error);
  //     }
  // }

  const handleMakeModels = async (type = vehicleType) => {
    try {
      const res = await axios.get(
        `${baseURL}/GetFilteredMakeModel?VehicleType=${encodeURIComponent(type)}`
      );
      if (res.data.status) {
        setDataitems(res.data.dataItem || []);
      } else {
        toast.error("No data found for selected vehicle type");
      }
    } catch (error) {
      console.log("Error fetching make/models:", error);
      toast.error("Error fetching make/models");
    }
  };

  useEffect(() => {
    if (vehicleType) handleMakeModels(vehicleType);
  }, [vehicleType]);

  useEffect(() => {
    if (search !== "") {
      const filtered = dataitems.filter(
        (item) =>
          item.make.toLowerCase().includes(search.toLowerCase()) ||
          item.model.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(filtered);
    } else {
      setFilterData([]);
    }
  }, [search, dataitems]);

  const handleUploadMakemodels = async () => {
    if (uploadFile === null) {
      alert("Please Select a file");
      return;
    }
    setLoading(true);
    const form = new FormData();
    form.append("file", uploadFile);
    try {
      const res = await axios.post(`${baseURL}/ModelMakeBulkUpload`, form);
      console.log(res);
      toast.success("File Uploaded Successfully.");
      setUploadFile(null);
      handleMakeModels();
    } catch (error) {
      console.log("Error Message", error);
    } finally {
      setLoading(false);
    }
  };
  const downloadExcelFile = () => {
    const link = document.createElement("a");
    link.href = "/MakeModelUploaders_Template.xlsx";
    link.download = "MakeModelUploaders_Template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return {
    loading,
    handleUploadMakemodels,
    setUploadFile,
    downloadExcelFile,
    uploadFile,
    setSearch,
    search,
    dataitems,
    filterData,
    vehicleType,
    setVehicleType
  };
};

export default UploadMakesHooks;
