import { useEffect, useState } from "react";
// import baseURL from '../../../api/autoApi'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
// import dayjs from 'dayjs';
import moment from "moment";
import baseURL from "../../../api/autoApi";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { ToastContainer, toast } from "react-toastify";

const ReportMisHooks = () => {
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

  const fetchDataAPI = async () => {
    try {
      const URL = `${baseURL}/GetPolicyCRMData`;
      const request = await fetch(URL);
      const data = await request.json();
      const listItems = data.dataItems;
      setListData(listItems);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataAPI();
  }, []);

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



  // const sendOtp = async (email) => {
  //   // Replace with your backend endpoint: `${baseURL}/sendOtp`
  //   toast.success(`OTP sent to ${email}`);
  //   return true;
  // };

  // const verifyOtp = async (otp) => {
  //   // Replace with your backend endpoint: `${baseURL}/verifyOtp`
  //   if (otp === "123456")
  //     return true; // simulate correct OTP
  //   else return false;
  // };

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
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data?.status === true || data?.Status === true) {
        toast.success("OTP sent successfully!");
        setStep(2);
      } else {
        toast.error(data?.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");

    try {
      setLoading(true);

      const res = await fetch(
        `${baseURL}/VerifyOTP?email=${encodeURIComponent(email)}&otp=${otp}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data?.status === true || data?.Status === true) {
        toast.success("OTP verified successfully!");
        handleDowloadExcel(filtercase)
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

  const transformDataWithHeaders = (data, mapping) => {
    return data.map((row) => {
      const newRow = {};
      Object.keys(mapping).forEach((key) => {
        newRow[mapping[key]] = row[key] ?? "";
      });
      return newRow;
    });
  };

  useEffect(() => {
    const result = listData.filter((row) => {
      const referenceMatch = row.reference_No
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const contactMatch = row.contactNo
        ?.toLowerCase()
        .includes(search.toLowerCase());

      let dateMatch = true;
      if (from && to) {
        const dateStr = row.completeInformationTime?.split(" ")[0]; // "14-04-2025"
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
    setTo,
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
// setFromdate, setTodate
//  fromdate, todate

export default ReportMisHooks;
