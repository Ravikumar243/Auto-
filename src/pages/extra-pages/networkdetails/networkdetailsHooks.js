import { useEffect, useState } from 'react';
import baseURL from '../../../api/autoApi';
import axios from 'axios';

const useNetworkDetails = () => {
  const [file, setFile] = useState(null); // Only store the File object directly
  const [datalist, setDatalist] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadFile = (e) => {
    //  const file = e.target.files[0];
    setFile(e.target.files[0]);
    //  setSelectedFile(file);
  };

  useEffect(() => {
    getNetworklist()
  }, []);

  const getNetworklist = async () => {
    try {
      const res = await axios.get(`${baseURL}/GetNetworkVendorList`)
      setDatalist(res.data.networkVendor)
    } catch (error) {
      console.log('error',);
    }
  }

  const handleNetworkData = async (e) => {
    e.preventDefault();


    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true)
      const res = await fetch(`${baseURL}/UploadNetworkVendor`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      alert(data.message)
    } catch (error) {
      console.error("Error uploading file:",);
    } finally {
      setLoading(false)
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = "/Network-sheet.xlsx";
    link.download = "/Network-sheet.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return {
    handleNetworkData,
    handleUploadFile,
    file,
    datalist,
    handleClick,
    loading
  };
};

export default useNetworkDetails;
