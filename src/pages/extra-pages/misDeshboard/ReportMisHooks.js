



import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import baseURL from "../../../api/autoApi";
import { toast } from "react-toastify";

const ReportMisHooks = () => {

  // ⬇️ NEW: GET ROLE FROM LOCALSTORAGE
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userRole = userInfo?.role;   // "Admin" or "Agent"
  const userEmail = localStorage.getItem("userEmail");

  const [listData, setListData] = useState([]);
  const [filtercase, setFiltercase] = useState([]);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(userEmail);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  // Fetch all data
  const fetchDataAPI = async () => {
    try {
      const URL = `${baseURL}/GetPolicyCRMData`;
      const request = await fetch(URL);
      const data = await request.json();
      setListData(data.dataItems);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataAPI();
  }, []);

  // Excel Download
  const handleDowloadExcel = (data, filename = "sheetdata.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${baseURL}/SendOTP?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data?.status === true || data?.Status === true) {
        toast.success("OTP sent successfully!");
        setStep(2);
      } else {
        toast.error(data?.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP + DOWNLOAD based on ROLE
  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");

    try {
      setLoading(true);

      const res = await fetch(
        `${baseURL}/VerifyOTP?email=${encodeURIComponent(email)}&otp=${otp}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data?.status === true || data?.Status === true) {
        toast.success("OTP verified successfully!");

        // ⬇️ ROLE BASED DOWNLOAD LOGIC
        
        if (userRole === "Admin") {
          // ADMIN → DOWNLOAD ALL DATA
          handleDowloadExcel(filtercase);
        } 
        else {
          // AGENT → ONLY LAST 3 DAYS
          const last3DaysData = filtercase.filter((row) => {
            const dateStr = row.completeInformationTime?.split(" ")[0]; 
            const caseDate = moment(dateStr, "DD-MM-YYYY");
            const today = moment();
            const diff = today.diff(caseDate, "days");
            return diff <= 3;
          });

          if (last3DaysData.length === 0) {
            toast.error("No data available for the last 3 days.");
            return;
          }

          handleDowloadExcel(last3DaysData);
        }

        setStep(1);
        setOpen(false);
        setOtp("");

      } else {
        toast.error(data?.message || "Invalid or expired OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Something went wrong while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  // FILTER LIST
  // useEffect(() => {
  //   const result = listData.filter((row) => {
  //     const referenceMatch = row.reference_No
  //       ?.toLowerCase()
  //       .includes(search.toLowerCase());
  //     const contactMatch = row.contactNo
  //       ?.toLowerCase()
  //       .includes(search.toLowerCase());

  //     let dateMatch = true;

  //     // Only apply custom date filter if user selected it 
  //     if (from && to) {
  //       const dateStr = row.completeInformationTime?.split(" ")[0];
  //       const caseDate = moment(dateStr, "DD-MM-YYYY");
  //       const fromDate = moment(from, "YYYY-MM-DD");
  //       const toDate = moment(to, "YYYY-MM-DD");
  //       dateMatch =
  //         caseDate.isSameOrAfter(fromDate) && caseDate.isSameOrBefore(toDate);
  //     }

  //     return dateMatch && (referenceMatch || contactMatch || !search);
  //   });

  //   setFiltercase(result);
  // }, [listData, search, from, to]);

  useEffect(() => {
  let baseData = [...listData];

  // --------------------------------------
  // 🟦 AGENT → Restrict to last 3 days view
  // --------------------------------------
  if (userRole === "Agent") {
    baseData = baseData.filter((row) => {
      const dateStr = row.completeInformationTime?.split(" ")[0];
      const caseDate = moment(dateStr, "DD-MM-YYYY");
      const today = moment();
      const diff = today.diff(caseDate, "days");
      return diff <= 2; // 0(today) + 1 + 2 = 3 days
    });
  }

  // --------------------------------------
  // 🟦 SEARCH Filter
  // --------------------------------------
  const result = baseData.filter((row) => {
    const referenceMatch = row.reference_No
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const contactMatch = row.contactNo
      ?.toLowerCase()
      .includes(search.toLowerCase());

    let dateMatch = true;

    // --------------------------------------
    // 🟦 DATE FILTER
    // --------------------------------------
    if (from && to) {
      const dateStr = row.completeInformationTime?.split(" ")[0];
      const caseDate = moment(dateStr, "DD-MM-YYYY");
      const fromDate = moment(from, "YYYY-MM-DD");
      const toDate = moment(to, "YYYY-MM-DD");

      dateMatch =
        caseDate.isSameOrAfter(fromDate) && caseDate.isSameOrBefore(toDate);
    }

    return dateMatch && (referenceMatch || contactMatch || !search);
  });

  setFiltercase(result);
}, [listData, search, from, to]);


  return {
    listData,
    handleDowloadExcel,
    filtercase,
    setSearch,
    setFrom,
    to,
    setTo,
    from ,
    loading,
    setOpen,
    open,
    email,
    setEmail,
    otp,
    setOtp,
    step,
    setStep,
    handleSendOtp,
    handleVerifyOtp,
  };
};

export default ReportMisHooks;

