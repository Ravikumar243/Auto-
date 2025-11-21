import baseURL from "api/autoApi";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const OldMisHook = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleUpload = async () => {
  //   if (!file) return alert("Please select a file!");

  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const res = await fetch(`${baseURL}/UploadCaseMasterExcel`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       alert(errorData || "Upload failed!");
  //       return false;
  //     }

  //     const data = await res.json();

  //     console.log("API Response:", data);
  //     alert("File uploaded successfully!");
  //     return true;
  //   } catch (error) {
  //     console.error("Upload Error:", error);
  //     alert("Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleUpload = async () => {
  if (!file) return alert("Please select a file!");

  setLoading(true);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${baseURL}/UploadCaseMasterExcel`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      let errorMessage = "Upload failed!";
      const text = await res.text();

      try {
        const json = JSON.parse(text);
        errorMessage = json.message || json.error || errorMessage;
      } catch {
        // response was not JSON → use plain text
        errorMessage = text || errorMessage;
      }

      toast.error(errorMessage);
      return false;
    }

    // ---- Success Response ----
    const data = await res.json();
    console.log("API Response:", data);

    toast.success("File uploaded successfully!");
    return true;

  } catch (error) {
    console.error("Upload Error:", error);
    toast.error("Upload Error:", error);
  } finally {
    setLoading(false);
  }
};


  const handleSearch = async () => {
    if (!searchText.trim()) {
      alert("Please enter SRN number!");
      return;
    }

    try {
      const res = await fetch(
        `${baseURL}/GetCaseByReferenceNo?referenceNo=${searchText}`
      );

      const data = await res.json();
      console.log("Search API Response:", data);

      if (data) {
        setRows([data]);
      } else {
        alert("No record found!");
        setRows([]);
      }
    } catch (error) {
      console.error("Search Error:", error);
      alert("Error while searching");
    }
  };

  return {
    handleFileChange,
    handleUpload,
    loading,
    rows,
    file,
    searchText,
    setSearchText,
    handleSearch,
  };
};

export default OldMisHook;
