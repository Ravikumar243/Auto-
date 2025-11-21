import { useState, useEffect, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAsyncError, useLocation } from "react-router-dom";
import baseURL from "../../../../api/autoApi";
import { State, City } from "country-state-city";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [remarkLoading, setRemarkLoading] = useState(false);
  const [remarkLogsData, setRemarkLogsData] = useState([]);
  const [activeStep, setActiveStep] = useState();
  const [spinnerloading, setSpinnerLoading] = useState(false);
  const [uploadDetailsFrom, setUploadDetailsFrom] = useState([]);
  const [completed, setCompleted] = useState({});
  const [boolean, setBoolean] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [searchdata, setSearchdata] = useState(false);
  const [supportVerification, setSupportVerification] = useState("");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState("open");
  const [generatedSRN, setGeneratedSRN] = useState("");
  const [rquestData_, setRquestData_] = useState("");
  const [calculationData, setCalculationData] = useState([]);
  const [selectedRsaStatus, setSelectedRsaStatus] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [multipleRecords, setMultipleRecords] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [service, setService] = useState("");
  const distacneTotalAmount = JSON.parse(
    localStorage.getItem("CalculationData")
  );

  console.log(calculationData, "cal");

  const storedServiceType = localStorage.getItem("serviceType");
  // const [generated_SRNo, setGenerated_SRNo] = useState('');
  const [incidentStatus, setIncidentStatus] = useState(false);
  const [venderModal, setVenderModal] = useState(false);
  const [statusmodal, setStatusmodal] = useState(false);

  const [localincidentlat, setLocalincidentlat] = useState("");
  const [localincidentlon, setLocalincidentlon] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [venderAssign, setVenderAssign] = useState(false);
  const [assistData, setAssistData] = useState(true);
  const [completeDeatils, setCompleteDeatils] = useState(false);
  const [fetcdataListItems, setFetcdataListItems] = useState("");
  const [fetcdataCustomerNo, setFetcdataCustomerNo] = useState("");
  const [historySrn, setHistorySrn] = useState("");
  // const [states, setStates] = useState([]);
  const [incidenttype, setIncidenttype] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [area, setArea] = useState("");
  const [stepsCount, setStepscount] = useState(0);
  const [companylist, setCompanylist] = useState([]);
  // const [userLongitude, setUserLongitude] = useState(0.0);
  const [vendorCity, setVendorCity] = useState("");
  const [vendorState, setVendorState] = useState("");
  const [vendorFetchList, setVendorFetchList] = useState([]);

  // vender Search
  const [vendor_Name, setVendor_Name] = useState("");
  const [vendor_Branch, setVendor_Branch] = useState("");
  const [m_no, setM_no] = useState();
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  //location
  // const [query, setQuery] = useState("");
  const [suggestions_drop, setSuggestions_drop] = useState([]);
  const [suggestions_Vedor, setSuggestions_Vedor] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [stateCitiesList, setStateCitiesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [filterSelectState, setFilterSelectState] = useState("");
  const [localVendorStateCity, setLocalVendorStateCity] = useState({
    localVendorState: "",
    localVendorCity: "",
    ratePerKm: "",
  });
  console.log(localVendorStateCity, "localVendorStateCitykjsdfk");
  const vendorIdFromSrn = fetcdataListItems?.vendorId;

  console.log(fetcdataListItems, "fetcdataListItemskjflkdkf");
  // lat and lon
  const [vLat, setVLat] = useState("");
  const [vLon, setVLon] = useState("");
  const [iLat, setILat] = useState("");
  const [iLon, setILon] = useState("");
  const [dLat, setDLat] = useState("");
  const [dLon, setDLon] = useState("");

  const [isSelecting, setIsSelecting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingVendor, setIsTypingVendor] = useState(false);
  const [loadingTest, setLoadingTest] = useState(false);

  const [incLat, setInclat] = useState("");
  const [incLong, setInclong] = useState("");
  const [dropLat, setDroplat] = useState("");
  const [dropLong, setDroplong] = useState("");
  const [dropCoordinates, setDropCoordinates] = useState({
    lat: null,
    lon: null,
  });
  const [pickupCoordinates, setPickupCoordinates] = useState({
    lat: null,
    lon: null,
  });
  const [localVendorCoordinates, setLocalVendorCoordinates] = useState({
    lat: null,
    lon: null,
  });
  const [editable, setEditable] = useState(false);
  const [states, setStates] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [cities, setCities] = useState([]);
  const [calculatedAmount, setCalculatedAmount] = useState({
    totalAmount: "",
    totalAmountWithGST: "",
    message: "",
    srN_Number: "",
  });

  const storedVendorID = localStorage.getItem("statusrej_vendorID");

  console.log(selectedVendorId, "selectedVendorIddjhjfhd");

  const [companyAndSearchTearm, setCompanyAndSearchTearm] = useState({
    companyName: "",
    vehicleNo: "",
  });
  const [isSelectingVendor, setIsSelectingVendor] = useState(false);

  const handleChangeCmpanyAndSearchTearm = (e) => {
    const { name, value } = e.target;
    setCompanyAndSearchTearm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "companyName") {
      setFormData({
        CompanyName: value,
      });
    }
  };

  console.log(serviceType, "serviceTypeprob");
  useEffect(() => {
    if (
      serviceType === "RSR" ||
      serviceType === "2W-Flatbed" ||
      serviceType === "4W-Flatbed" ||
      serviceType === "3W-Flat Bed" ||
      serviceType === "Underlift" ||
      serviceType === "Zero-Degree" ||
      serviceType === "Mini Truck" ||
      serviceType === "Car to Car" ||
      serviceType === "Hydra"
    ) {
      console.log(serviceType, "serviceTypeprob");
      localStorage.setItem("serviceType", serviceType);
    }
  }, [serviceType]);

  const location = useLocation();
  const storedSRN = localStorage.getItem("genratedSRN");
  console.log("Stored SRN:", storedSRN);

  useEffect(() => {
    if (location.state?.expandPanel) {
      setStepscount(location.state.stepscounts);
    } else {
      setExpanded("open");
      setFetcdataListItems([]);
      setHistorySrn("");
    }
  }, [location.state]);

  useEffect(() => {
    if (stateCode) {
      const cityList = City.getCitiesOfState("IN", stateCode);
      setCities(cityList);
    }
  }, [stateCode]);

  useEffect(() => {
    console.log("useEffect ran, serviceType =", serviceType);
    if (
      serviceType === "2W-Flatbed" ||
      serviceType === "4W-Flatbed" ||
      serviceType === "3W-Flat Bed" ||
      serviceType === "Underlift" ||
      serviceType === "Zero-Degree" ||
      serviceType === "Mini Truck" ||
      serviceType === "Car to Car" ||
      serviceType === "Hydra"
    ) {
      setIncidentStatus(true);
      setVendorDistance((prev) => ({
        ...prev,
        srN_No: generatedSRN,
        ServiceType: serviceType,
      }));
    } else if (serviceType === "RSR") {
      setIncidentStatus(false);
      setFormIncident((prev) => ({
        ...prev,
        kiloMeter: "",
        dropLocation: "",
        drop_latitude: "",
        drop_longitude: "",
      }));
      setFormAssignVendorsDetails((prev) => ({
        ...prev,
        srN_No: "",
        vendorName: "",
        vtoL_KM: "",
        dtoV_KM: "",
        itoD_KM: "",
        gtoG_KM: "",
        vendorContactNumber: "",
        vendorETA: "",
        kmPerHourCharges: "",
        baseRate: "",
      }));
      setInputDropValue("");

      setVendorDistance((prev) => ({
        ...prev,
        ServiceType: serviceType,
      }));
    }
  }, [serviceType]);

  const handleLocalVendorChange = (e) => {
    const { name, value } = e.target;
    setLocalVendorStateCity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSerachAssistance = () => setAssistData(true);
  const handleIncidenceOpen = () => setIncidentStatus(true);
  const handleIncidenceClose = () => setIncidentStatus(false);
  const handleDetailsModal = () => setCompleteDeatils(false);
  const handleAssignOpen = () => setVenderModal(true);
  const handleAssignClose = () => setVenderModal(false);
  const handleAssignSubmitOpen = () => {
    setVenderModal(false);
    setVenderAssign(true);
  };
  const handleAssignSubmitClose = () => {
    setVenderAssign(false);
    setVenderModal(false);
  };
  const savedEmail = localStorage.getItem("userEmail");

  //open Accordion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  //create ticket Data
  const [formData, setFormData] = useState({
    CompanyName: "",
    PolicyVerification: "",
    Product: "",
    Make: "",
    Model_Variant: "",
    CustomerFirstName: "",
    CustomerMiddleName: "",
    CustomerLastName: "",
    CustomerMobileNo: "",
    State: "",
    City: "",
    EngineNo_BatteryNo: "",
    ChasisNo_FrameNo: "",
    CustomerEmailid: "",
    PolicyStartDate: "",
    PolicyEndDate: "",
    VehicleNo: "",
    PolicyNumber: "",
    ChargerNo: "",
    Invoiceno: "",
    motorserialno: "",
    AgentId: savedEmail,
    Upload: null,
    VehicleType: "",
    AlternateNumber: "",
  });

  const [makeComaniesList, setMakeCompaniesList] = useState([]);
  const [modelVarientList, setModelVarientList] = useState([]);

  useEffect(() => {
    const fetchMakeList = async () => {
      if (!formData.Product) return;

      try {
        setFormData((prev) => ({
          ...prev,
          Make: "",
        }));
        const encodedProduct = encodeURIComponent(formData.Product);
        const res = await axios.get(
          `${baseURL}/GetFilteredMakeModel?VehicleType=${encodedProduct}`
        );

        if (res.data?.status) {
          setMakeCompaniesList(res.data.dataItem);
        } else {
          setMakeCompaniesList([]);
        }
      } catch (error) {
        console.error("Error fetching make list:", error);
        setMakeCompaniesList([]);
      }
    };

    fetchMakeList();
  }, [formData.Product]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        AgentId: savedEmail,
      }));
    }
  }, [savedEmail]);

  const [fetchForm, setFetchForm] = useState({ srN_No: "" });
  const [fetchFormexcel, setFetchFormexcel] = useState({ rquestData: "" });
  const [averageDistance, setAverageDistance] = useState("");
  console.log(averageDistance, "averageDistance===========>");

  const [formAssistance, setFormAssistance] = useState({
    srN_No: "",
    mobileNumber: "",
    location: "",
    landmark: "",
    state: "",
    city: "",
    pincode: "",
    vendorAllocation: "",
    status: "",
    remark: "",
    callTime: "",
    assistanceSummary: "",
    externalAssistanceSummry: "",
    externalAssistanceSummaryHistroy: "",
    AgentId: savedEmail,
  });
  const [getallClaimData, setGetallClaimData] = useState({
    certificateNo: "",
    vehicleNo: "",
    CustomerName: "",
    companyName: "",
    engineNo_BatteryNo: "",
    chassisNo_FrameNo: "",
    contactNo: "",
    CustomerEmailid: "",
    startdate: "",
    endDate: "",
    state: "",
    city: "",
    vehicleType: "",
    AlternateNumber: "",
  });

  const [formArea, setFormArea] = useState({
    srN_No: "",
    area: "",
    userType: "User",
  });

  const [vendorDistance, setVendorDistance] = useState({
    Latitude: "",
    Longitude: "",
    City: "",
    State: "",
    ServiceType: "",
  });

  console.log(generatedSRN, "genreated srn number");
  const storedSRNSave = localStorage.getItem("genratedSRN");

  const [formAssignVendorsDetails, setFormAssignVendorsDetails] = useState({
    srN_No: "",
    vendorName: "",
    vendorETA: "",
    vtoL_KM: "",
    itoD_KM: "",
    dtoV_KM: "",
    // gtog_KM: "",
    gtoG_KM: "",
    informationDateTime: "",
    driverMobileNo: "",
    baseRate: "",
    vendorContactNumber: "",
    vendorLocation: "",
    kmPerHourCharges: "",
    vendorId: storedVendorID || "",
  });

  const [formSrnStatus, setFormSrnStatus] = useState({
    srN_No: "",
    srN_Status: "OnGoing",
    srN_Remark: "",
    rsaTimeLineStatus: "",
    recallStatus: "",
    followup_DateTime: "",
    assistance_Summary: "",
    vendorReachedDropLoc: "",
    rnmContactNo: "",
    externalAssistanceSummary: "",
    AgentId: savedEmail,
    vendorReachTime: "",
    vendorDropTime: "",
  });

  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);

    setFormSrnStatus((prev) => ({
      ...prev,
      srN_No: generatedSRN,
      srN_Remark: "Vendor Assigned",
    }));
  }, []);
  // Upload Assist Details
  const [formUploadAssist, setFormUploadAssist] = useState({
    reachedTime: "",
    srN_No: "",
    dropLocation: "",
    dropTime: "",
    totalRunningKMs: "",
    exceptionalApprovalKMs: "",
    exceptionalApprovalPolicyCoverage: "",
    vcrfForm: true,
    totalCharges: 0,
    waitingHoursCharge: "",
    vehicleCustodyHoursCharge: "",
    otherCharges: "",
    totalKilometers: "",
    vtoL_KM: "",
    itoD_KM: "",
    totalKilometersCharges: "",
    // totalAmount: "",
    // finalAmountWithGST: "",
    totalAmount: 0,
    finalAmountWithGST: 0,
    customerPaidAmount: 0,
    customerPaidDate: "",
    referenceNo: "",
    product: "",
    paymentType: "",
    paymentUpdatedTime: "",
    additionalKMs: "",
    borderAndOtherCharges: "",
  });

  console.log(
    formUploadAssist,
    formUploadAssist.waitingHoursCharge,
    "watitng hours charge"
  );

  const [searchCompamyData, setSearchCompamyData] = useState([]);

  const [disabledFromStates, setDisabledFromStates] = useState({
    CompanyName: false,
    PolicyVerification: false,
    Product: false,
    Make: false,
    Model_Variant: false,
    CustomerFirstName: false,
    CustomerMiddleName: false,
    CustomerLastName: false,
    CustomerMobileNo: false,
    State: false,
    City: false,
    EngineNo_BatteryNo: false,
    ChasisNo_FrameNo: false,
    CustomerEmailid: false,
    PolicyStartDate: false,
    PolicyEndDate: false,
    VehicleNo: false,
    PolicyNumber: false,
    ChargerNo: false,
    Invoiceno: false,
    motorserialno: false,
    AgentId: savedEmail,
    Upload: null,
    AlternateNumber: false,
  });

  useEffect(() => {
    if (formAssignVendorsDetails?.gtoG_KM) {
      localStorage.setItem("gtoG_KM", formAssignVendorsDetails?.gtoG_KM);
    }
  }, [formAssignVendorsDetails?.gtoG_KM]);

  const storedGtoGKM = localStorage.getItem("gtoG_KM");

  useEffect(() => {
    if (
      !uploadDetailsFrom ||
      Object.keys(uploadDetailsFrom || {}).length === 0
    ) {
      return;
    }
    setSearchdata(true);
    setFormData((prev) => ({
      ...prev,
      CompanyName: uploadDetailsFrom?.company || "",
      CustomerMobileNo: uploadDetailsFrom.mobile || "",
      CustomerFirstName: uploadDetailsFrom?.name || "",
      EngineNo_BatteryNo:
        uploadDetailsFrom.engineNo || uploadDetailsFrom.batteryNo || "",
      ChasisNo_FrameNo: uploadDetailsFrom.chassisNo || "",
      AgentId: savedEmail || " ",
      PolicyStartDate: uploadDetailsFrom.subscriptionStartDate || "",
      PolicyEndDate: uploadDetailsFrom.endDate || "",
      State: uploadDetailsFrom.state || "",
      City: uploadDetailsFrom.city || "",
      PolicyVerification: "Verified",
      AlternateNumber: uploadDetailsFrom.AlternateNumber || "",
    }));

    const hasAnyField =
      uploadDetailsFrom?.company ||
      uploadDetailsFrom?.mobile ||
      uploadDetailsFrom?.name ||
      uploadDetailsFrom?.engineNo ||
      uploadDetailsFrom?.batteryNo ||
      uploadDetailsFrom?.chassisNo;

    // setFormData((prev) => ({
    // 	...prev,
    // 	PolicyVerification: hasAnyField ? "Verified" : "Manual Verified",
    // }));

    setDisabledFromStates({
      CompanyName: !!uploadDetailsFrom?.company,
      Product: !!uploadDetailsFrom?.product,
      Make: !!uploadDetailsFrom?.make,
      Model_Variant: !!uploadDetailsFrom?.modelVariant,
      CustomerFirstName: !!uploadDetailsFrom?.name,
      CustomerMiddleName: !!uploadDetailsFrom?.middleName,
      CustomerLastName: !!uploadDetailsFrom?.lastName,
      CustomerMobileNo: !!uploadDetailsFrom?.mobile,
      State: !!uploadDetailsFrom?.state,
      City: !!uploadDetailsFrom?.city,
      EngineNo_BatteryNo: !!(
        uploadDetailsFrom?.engineNo || uploadDetailsFrom?.batteryNo
      ),
      ChasisNo_FrameNo: !!uploadDetailsFrom?.chassisNo,
      CustomerEmailid: !!uploadDetailsFrom?.email,
      PolicyStartDate: !!uploadDetailsFrom?.subscriptionStartDate,
      PolicyEndDate: !!uploadDetailsFrom?.endDate,
      VehicleNo: !!uploadDetailsFrom?.vehicleNo,
      PolicyNumber: !!uploadDetailsFrom?.policyNumber,
      ChargerNo: !!uploadDetailsFrom?.chargerNo,
      Invoiceno: !!uploadDetailsFrom?.invoiceNo,
      motorserialno: !!uploadDetailsFrom?.motorserialno,
      AlternateNumber: !!uploadDetailsFrom?.AlternateNumber,
      AgentId: true,
      PolicyVerification: hasAnyField ? "Verified" : "Manual Verified", // keep always disabled (since savedEmail is fixed)
    });
  }, [uploadDetailsFrom]);

  const handleSearchData = async () => {
    try {
      const response = await axios.post(`${baseURL}/GetCreateDetails`, {
        searchtext: getallClaimData?.vehicleNo,
      });
      if (response.data) {
        setSearchCompamyData(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleCmpanyAndSearchTearm = async () => {
    if (!companyAndSearchTearm.companyName) {
      toast.error("Please select a company before searching.");
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post(`${baseURL}/GetCreateDetails`, {
        searchtext: companyAndSearchTearm?.vehicleNo,
        companyName: companyAndSearchTearm?.companyName,
      });

      if (response.data?.message === "Record already exists") {
        toast.info("Multiple Record exist for this search data !");
        // setSearchdata(false);
        if (Array.isArray(response.data?.records)) {
          setMultipleRecords(response.data.records);
          setShowPopup(true);
        }
        return;
      }
      if (response.data?.message === "Record not exists") {
        setSearchdata(false);
      }
      if (
        response.data?.companyName === null &&
        response.data?.customer_name === null
      ) {
        toast.info("No Record Found !");
        setSearchdata(false);
        return;
      }

      // alert("heelo",response.data.companyName)

      const hasAnyField =
        response.data?.companyName ||
        response?.data?.customer_name ||
        response?.data?.customer_mobile ||
        response.data?.registration_no ||
        response.data?.battery_No ||
        response.data?.engineNo ||
        response.data?.chassisNo;

      const formatDateToMMDDYYYY = (dateStr) => {
        if (!dateStr) return "";
        const [datePart] = dateStr.split(" ");
        const [day, month, year] = datePart.split("-");
        return `${month}/${day}/${year}`;
      };

      setFormData({
        CompanyName: response.data?.companyName || "",
        CustomerFirstName: response?.data?.customer_name || "",
        CustomerMobileNo: response?.data?.customer_mobile || "",
        AlternateNumber: response?.data?.AlternateNumber || "",
        VehicleNo: response.data?.registration_no || "",
        EngineNo_BatteryNo:
          response.data?.engineNo || response.data?.battery_No || "",
        ChasisNo_FrameNo: response.data?.chassisNo || "",
        CustomerEmailid: response.data?.email || "",
        PolicyVerification: hasAnyField ? "Verified" : "Manual Verified",
        AgentId: savedEmail,
        Product:
          response.data?.oeM_Model_Name ||
          response.data?.vehicleType ||
          response.data?.type ||
          "",
        Make: response.data?.car_name,
        Model_Variant: response.data?.model_Code || "",
        State: response.data?.state || "",
        City: response.data?.city || "",
        PolicyStartDate: response.data?.subscriptionStartDate
          ? response.data.subscriptionStartDate
              .trim()
              .split(/\s+/)
              .slice(0, 3)
              .join(" ")
          : "",

        PolicyEndDate: response.data?.endDate
          ? response.data.endDate.trim().split(/\s+/).slice(0, 3).join(" ")
          : "",
        PolicyNumber: "",
      });
      setSearchdata(true);
      // setFormData(newFormData);
      setDisabledFromStates({
        CompanyName: !!response.data?.companyName,
        Product: !!(
          response.data?.oeM_Model_Name || response.data?.vehicleType
        ),
        Make: !!response.data?.car_name,
        Model_Variant: !!response.data?.model_Code,
        CustomerFirstName: !!response?.data?.customer_name,
        CustomerMobileNo: !!response?.data?.customer_mobile,
        State: !!response.data?.state,
        City: !!response.data?.city,
        EngineNo_BatteryNo: !!(
          response.data?.engineNo || response.data?.battery_No
        ),
        ChasisNo_FrameNo: !!response.data?.chassisNo,
        CustomerEmailid: !!response.data?.email,
        PolicyStartDate: !!response.data?.subscriptionStartDate,
        PolicyEndDate: !!response.data?.endDate,
        VehicleNo: !!response.data?.registration_no,
        PolicyNumber: !!response.data?.endDate,
        PolicyVerification: hasAnyField ? "Verified" : "Manual Verified",
      });
    } catch (err) {
      console.error("Error fetching filtered record:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordSelect = (selected) => {
    setFormData({
      CompanyName: selected.companyName || "",
      CustomerFirstName: selected.customer_name || "",
      CustomerMobileNo: selected.customer_mobile || "",
      AlternateNumber: selected.AlternateNumber || "",
      VehicleNo: selected.registration_no || "",
      EngineNo_BatteryNo: selected.engineNo || selected.battery_No || "",
      ChasisNo_FrameNo: selected.chassisNo || "",
      CustomerEmailid: selected.email || "",
      PolicyVerification: "Verified",
      AgentId: savedEmail,
      Product:
        selected.oeM_Model_Name || selected.vehicleType || selected.type || "",
      Make: selected.car_name,
      Model_Variant: selected.model_Code || "",
      State: selected.state || "",
      City: selected.city || "",
      PolicyStartDate: selected.subscriptionStartDate
        ? selected.subscriptionStartDate
            .trim()
            .split(/\s+/)
            .slice(0, 3)
            .join(" ")
        : "",
      PolicyEndDate: selected.endDate
        ? selected.endDate.trim().split(/\s+/).slice(0, 3).join(" ")
        : "",
      PolicyNumber: "",
    });

    setSearchdata(true);
    setShowPopup(false);
  };

  useEffect(() => {
    setGetallClaimData((prev) => ({
      ...prev,
      companyName: companyAndSearchTearm?.companyName || "",
    }));
  }, [companyAndSearchTearm?.companyName]);

  const GetCompanyList = async () => {
    try {
      const listdata = await fetch(`${baseURL}/GetCompanyList`);
      const data = await listdata.json();
      setCompanylist(data.dataItem);
      setBoolean(false);
    } catch (error) {
      console.log("Unable to fetch data");
    }
  };

  useEffect(() => {
    GetCompanyList();
    getStatecity();
  }, []);

  useEffect(() => {
    if (
      getallClaimData.companyName !== "" ||
      getallClaimData.vehicleType !== "" ||
      getallClaimData.state !== "" ||
      getallClaimData.city !== "" ||
      getallClaimData?.startdate !== "" ||
      getallClaimData?.endDate !== "" ||
      getallClaimData.CustomerEmailid !== "" ||
      getallClaimData.engineNo_BatteryNo !== "" ||
      getallClaimData.vehicleNo !== "" ||
      getallClaimData.chassisNo_FrameNo !== "" ||
      getallClaimData.contactNo !== ""
    ) {
    }
  }, [
    getallClaimData.companyName,
    getallClaimData.vehicleType,
    getallClaimData.state,
    getallClaimData.city,
    getallClaimData.startdate,
    getallClaimData.endDate,
    getallClaimData.engineNo_BatteryNo,
    getallClaimData.vehicleNo,
    getallClaimData.chassisNo_FrameNo,
    getallClaimData.contactNo,
    getallClaimData.CustomerEmailid,
  ]);

  useEffect(() => {
    localStorage.removeItem("VendorName");
    localStorage.removeItem("calDistanceDtoV");
    localStorage.removeItem("calDistanceVtoI");
    localStorage.removeItem("Vendormobile_n");
    localStorage.removeItem("gtogVal1");
    localStorage.removeItem("gtogVal2");
    localStorage.removeItem("gtogVal3");
    localStorage.removeItem("EstimatedTime");
  }, []);

  useEffect(() => {
    if (!generatedSRN) return;
    setFetchForm(() => ({
      srN_No: generatedSRN,
    }));
    localStorage.setItem("genratedSRN", generatedSRN);
    fetchData();
    fetchSrnRemarkLogs();
  }, [generatedSRN]);

  useEffect(() => {
    setFetchFormexcel(() => ({
      rquestData: rquestData_,
    }));
  }, [rquestData_]);

  // Handle file selection correctly
  const handleFileChange = (e) => {
    setFormData({ ...formData, Upload: e.target.files[0] });
  };

  // Handle text field changes
  const handleChange = async (e) => {
    const { name, value } = e.target;

    const nameRegex = /^[A-Za-z\s]*$/;

    if (
      name === "CustomerFirstName" ||
      name === "CustomerMiddleName" ||
      name === "CustomerLastName" ||
      name === "City"
    ) {
      if (!nameRegex.test(value)) return;
    }
    if (name === "CustomerMobileNo") {
      const numberRegex = /^[0-9\s]*$/;
      if (!numberRegex.test(value)) return;
    }
    if (name === "callTime" && value) {
      const selectedDateTime = new Date(value);
      const now = new Date();

      // Extract only date (ignore time)
      const selectedDate = new Date(
        selectedDateTime.getFullYear(),
        selectedDateTime.getMonth(),
        selectedDateTime.getDate()
      );
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (selectedDate.getTime() !== today.getTime()) {
        toast.error("Call Time date must be today's date only.");
        return;
      }

      const selectedMinutes =
        selectedDateTime.getHours() * 60 + selectedDateTime.getMinutes();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      if (selectedMinutes >= currentMinutes) {
        toast.error("Call Time must be earlier than the current time.");
        return;
      }
    }

    if (e.target.name === "Make") {
      try {
        const res = await axios.post(`${baseURL}/GetModelsList`, {
          make: e.target.value,
          vehicleType: formData.Product,
        });

        if (res.data?.dataItem?.length > 0) {
          localStorage.setItem(
            "modelVariantList",
            JSON.stringify(res.data.dataItem)
          );

          const storedVariants = JSON.parse(
            localStorage.getItem("modelVariantList")
          );
          setModelVarientList(storedVariants);
        } else {
          setModelVarientList([]);
          localStorage.removeItem("modelVariantList");
        }
      } catch (error) {
        console.error("Error fetching model variants:", error);
        setModelVarientList([]);
        localStorage.removeItem("modelVariantList");
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      AgentId: savedEmail,
    });
  };

  const handleChangedrop = (e) => {
    const selectedCode = e.target.value;

    console.log(selectedCode, "selected state");
    setFormData({ ...formData, State: selectedCode, City: "" });
    setFilterSelectState(selectedCode);
  };

  useEffect(() => {
    if (formData.State) {
      setFilterSelectState(formData.State);
    }
  }, [formData.State]);

  const handleChangeclaimdata = (e) => {
    if (e.target.name === "contactNo") {
      const numberRegex = /^[0-9\s]*$/;
      if (!numberRegex.test(e.target.value)) return;
    }

    setGetallClaimData({ ...getallClaimData, [e.target.name]: e.target.value });
  };

  const handleAssist = (e, isUserAction = true) => {
    // add a flag
    const { name, value } = e.target;

    if (name === "callTime") {
      const currentTime = dayjs();
      const [hours, minutes] = value.split(":");
      const selectedTime = dayjs().hour(hours).minute(minutes);

      if (selectedTime.isAfter(currentTime)) {
        toast.error("Please select current or past time");
        return;
      }
    }

    if (name === "pincode") {
      const numberRegx = /^[0-9\s]*$/;
      if (!numberRegx.test(value)) return;
    }

    setFormAssistance((prev) => ({
      ...prev,
      [name]: value,
      srN_No: generatedSRN,
    }));

    console.log(name, "name state city");

    if (name === "state" && isUserAction) {
      console.log(value, "value of state");
      getCitiesByState(value);
      setFormAssistance((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleDownloadHistory = async () => {
    try {
      if (!remarkLogsData || remarkLogsData.length === 0) {
        alert("No remark data available!");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Assistance History");

      // Define columns
      sheet.columns = [
        {header:"SRN Number", key : "srnNo", width:40},
        { header: "Customer First Name", key: "firstName", width: 25 },
        { header: "Assistance Remark", key: "remark", width: 40 },
        { header: "External Remark", key: "externalRemark", width: 40 },
        { header: "Date & Time", key: "date", width: 25 },
        { header: "Stage", key: "stage", width: 20 },
        { header: "Agent Id", key: "agentId", width: 15 },
      ];
      
      console.log(fetcdataListItems?.customerFirstName,"fetckjdkfdataListItemssjdkljsfd")

      remarkLogsData.forEach((item) => {
        sheet.addRow({
          srnNo : fetcdataListItems?.srN_No || "N/A",
          firstName: fetcdataListItems?.customerFirstName || "N/A",
          remark: item?.assistanceSummary ?? "N/A",
           externalRemark: item?.externalAssistanceSummary ?? "N/A",
          date: item?.date ?? "",
          stage: item?.stage ?? "",
          agentId: item?.agentId ?? "",
        });
      });

      // Download
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "Assistance_History.xlsx");
    } catch (error) {
      console.error(error);
      alert("Excel download failed!");
    }
  };

  useEffect(() => {}, [serviceType]);
  console.log(serviceType, "servicetypesjdkfs");

  const handleService = (e) => {
    const { name, value } = e.target;
    console.log("Current Service Type:", value);
    setFormIncident((prev) => ({
      ...prev,
      [name]: value,
    }));

    // When user selects "incident"
    if (name === "incident") {
      if (value === "RSR") {
        setServiceType(value);
        setVendorDistance((prev) => ({
          ...prev,
          ServiceType: value,
        }));
      } else if (value === "TOWING") {
        setServiceType(""); // clear until details selected
        setVendorDistance((prev) => ({
          ...prev,
          ServiceType: "",
        }));
      } else {
        setServiceType(value);
        setVendorDistance((prev) => ({
          ...prev,
          ServiceType: value,
        }));
      }

      // Reset incidentDetails when changing incident type
      setFormIncident((prev) => ({
        ...prev,
        incidentDetails: "",
      }));
    }

    // When user selects "incidentDetails"
    if (name === "incidentDetails") {
      if (formIncident.incident === "TOWING") {
        console.log(value, "valuekdjfkjsd");
        setServiceType(value);
        setVendorDistance((prev) => ({
          ...prev,
          ServiceType: value,
        }));
      } else {
        // For RSR or others, you can store separately if needed
        setVendorDistance((prev) => ({
          ...prev,
          IncidentDetails: value,
        }));
      }
    }
  };

  const handleVendorAssign = (e) => {
    const { name, value } = e.target;

    if (
      name === "driverMobileNo" ||
      name === "vendorContactNumber" ||
      name === "vendorETA"
    ) {
      const numregex = /^[0-9\s]*$/;

      if (!numregex.test(value)) return;
    }

    if (name === "informationDateTime" && value) {
      const callTimeString = fetcdataListItems?.callTime;
      if (!callTimeString) {
        toast.warning("Please select Call Time first.");
        return;
      }

      // ✅ Convert callTime to local Date (avoid UTC shift)
      const [callDatePart, callTimePart] = callTimeString.split("T");
      const [callYear, callMonth, callDay] = callDatePart
        .split("-")
        .map(Number);
      const [callHour, callMinute] = callTimePart.split(":").map(Number);
      const callTime = new Date(
        callYear,
        callMonth - 1,
        callDay,
        callHour,
        callMinute
      );

      const selectedInfoDateTime = new Date(value);

      // Extract only the date parts (ignore time)
      const callDate = new Date(
        callTime.getFullYear(),
        callTime.getMonth(),
        callTime.getDate()
      );
      const selectedDate = new Date(
        selectedInfoDateTime.getFullYear(),
        selectedInfoDateTime.getMonth(),
        selectedInfoDateTime.getDate()
      );

      // ❌ Case 1: Date must match exactly
      if (selectedDate.getTime() !== callDate.getTime()) {
        toast.error("Date must be the same as Call Date.");
        return; // stop update
      }

      // ❌ Case 2: Time must be greater than Call Time
      const selectedMinutes =
        selectedInfoDateTime.getHours() * 60 +
        selectedInfoDateTime.getMinutes();
      const callMinutes = callTime.getHours() * 60 + callTime.getMinutes();

      if (selectedMinutes <= callMinutes) {
        toast.error("Time must be greater than Call Time.");
        return; // stop update
      }
    }
    setFormAssignVendorsDetails((prev) => ({
      ...prev,
      srN_No: generatedSRN,
      [e.target.name]: e.target.value || "",
    }));
  };

  const handleNovendorAssign = () => {
    setFormAssignVendorsDetails((prev) => ({
      ...prev,
      srN_No: "",
      vendorName: "",
      vendorETA: "",
      vtoL_KM: "",
      itoD_KM: "",
      dtoV_KM: "",
      gtoG_KM: "",
      informationDateTime: "",
      driverMobileNo: "",
      baseRate: "",
      vendorContactNumber: "",
    }));
  };
  // vendor details - incedent status
  const handleStatus = (e) => {
    const { name, value } = e.target;

    if (name === "rsaTimeLineStatus") {
      setSelectedRsaStatus(value);
    }

    if (name === "followup_DateTime" && value) {
      const infoDateTimeString = fetcdataListItems?.informationDateTime;

      if (!infoDateTimeString) {
        toast.warning("Please select Information Date & Time first.");
        return;
      }

      // ✅ Parse API datetime properly (local timezone)
      const [infoDatePart, infoTimePart] = infoDateTimeString.split("T");
      const [infoYear, infoMonth, infoDay] = infoDatePart
        .split("-")
        .map(Number);
      const [infoHour, infoMinute] = infoTimePart.split(":").map(Number);
      const infoDateTime = new Date(
        infoYear,
        infoMonth - 1,
        infoDay,
        infoHour,
        infoMinute
      );

      const followupDateTime = new Date(value);

      // 🔹 Extract just the date (ignore time)
      const infoDate = new Date(
        infoDateTime.getFullYear(),
        infoDateTime.getMonth(),
        infoDateTime.getDate()
      );
      const followDate = new Date(
        followupDateTime.getFullYear(),
        followupDateTime.getMonth(),
        followupDateTime.getDate()
      );

      // ❌ 1️⃣ Follow-up date can't be before Information date
      if (followDate < infoDate) {
        toast.error("Follow-up Date can't be before Information Date.");
        return;
      }

      // ❌ 2️⃣ If same date, follow-up time must be greater
      if (followDate.getTime() === infoDate.getTime()) {
        const infoMinutes =
          infoDateTime.getHours() * 60 + infoDateTime.getMinutes();
        const followMinutes =
          followupDateTime.getHours() * 60 + followupDateTime.getMinutes();

        if (followMinutes <= infoMinutes) {
          toast.error(
            "Follow-up time must be greater than Information Date & Time."
          );
          return;
        }
      }
    }

    setFormSrnStatus((prev) => {
      if (name === "srN_Status") {
        return {
          ...prev,
          srN_Status: value,
          srN_Remark: "",
          rsaTimeLineStatus: "",
        };
      }

      return { ...prev, [name]: value, srN_No: generatedSRN };
    });
  };
  // cost Details ->recah Time

  const handleCostVendor = (e) => {
    const { name, value } = e.target;

    if (name === "waitingHoursCharge") {
      const numberRegx = /^[0-9\s]*$/;
      if (!numberRegx.test(value)) return;
    }

    // ✅ Validate: paymentUpdatedTime > vendorDropTime
    if (name === "paymentUpdatedTime" && value) {
      const vendorDropTimeString =
        fetcdataListItems?.vendorDropTime || "2025-11-03T17:30"; // fallback

      if (!vendorDropTimeString) {
        toast.warning("Please select Vendor Drop Time first.");
        return;
      }

      // Convert both strings to Date objects
      const vendorDropTime = new Date(vendorDropTimeString);
      const paymentTime = new Date(value);

      // ✅ Strict comparison
      if (paymentTime <= vendorDropTime) {
        toast.error(
          "Payment Date & Time must be greater than Vendor Drop Time."
        );
        return;
      }
    }

    // ✅ Update form state
    setFormUploadAssist((prev) => ({
      ...prev,
      [name]: name === "totalCharges" ? Number(value) || 0 : value,
      srN_No: generatedSRN,
    }));
  };

  const calculatedTotalAmount = (
    Number(formUploadAssist?.waitingHoursCharge || 0) +
    Number(formUploadAssist?.vehicleCustodyHoursCharge || 0) +
    Number(formUploadAssist?.otherCharges || 0) +
    Number(formUploadAssist?.totalCharges || 0) +
    Number(calculatedAmount?.totalAmount || 0)
  ).toFixed(2);

  const calculatedTotalAmountWithGst = (
    Number(calculatedTotalAmount || 0) * 1.18
  ).toFixed(2);

  useEffect(() => {
    setFormUploadAssist((prev) => ({
      ...prev,
      totalKilometersCharges: Number(calculatedAmount?.totalAmount) || 0,
      totalAmount: Number(calculatedTotalAmount) || 0,
      finalAmountWithGST: Number(calculatedTotalAmountWithGst) || 0,
    }));
  }, [
    formUploadAssist.waitingHoursCharge,
    formUploadAssist.vehicleCustodyHoursCharge,
    formUploadAssist.otherCharges,
    formUploadAssist.totalCharges,
    calculatedAmount?.totalAmount,
  ]);

  // useEffect(() => {

  //   const total =
  //     parseFloat(formUploadAssist.totalCharges || 0) +
  //     parseFloat(formUploadAssist.waitingHoursCharge || 0) +
  //     parseFloat(formUploadAssist.vehicleCustodyHoursCharge || 0) +
  //     parseFloat(formUploadAssist.totalKilometersCharges || 0) +
  //     parseFloat(formUploadAssist.otherCharges || 0);
  //   const finalamout = total + (total * 18) / 100;

  const handleswitch = (e) => {
    handleAccordionChange(e);
  };

  const handleCoordinates = (e) => {
    setArea(e.target.value);
  };

  useEffect(() => {
    if (generatedSRN !== "") {
      setFormArea((prevForm) => ({
        ...prevForm,
        area: area.toLowerCase(),
        srN_No: generatedSRN,
      }));
    }
    //setInterval
    if (generatedSRN !== "") {
      const handlerdelay = setTimeout(() => {
        handleCoordinatesAPI();
      }, 1000);
      if (generatedSRN !== "") {
        handleCoordinatesAPI();
      }
      return () => clearTimeout(handlerdelay);
    }
  }, [area]);

  useEffect(() => {
    console.log(filterSelectState, "filterselected state");
    getCitiesByState(filterSelectState);
  }, [filterSelectState]);

  // Log the updated fetchForm state
  useEffect(() => {
    if (generatedSRN !== "") {
      fetchData();
      setFormUploadAssist((prev) => ({
        ...prev,
        srN_No: generatedSRN,
      }));
    }
  }, [fetchForm]);

  useEffect(() => {
    if (fetcdataListItems.length === 0) {
      return;
    }
    // if (!uploadDetailsFrom || Object.keys(uploadDetailsFrom || {}).length === 0) {
    // 	return;
    // }
    localStorage.setItem(
      "pickupCoordinates",
      JSON.stringify({ lat: pickupCoordinates.lat, lon: pickupCoordinates.lon })
    );

    console.log(fetcdataListItems, "fetcdataListItemskjdkjfdsdkf");

    setFormData((prev) => ({
      ...prev,
      CompanyName: fetcdataListItems.companyName || "",
      PolicyVerification: fetcdataListItems.policyVerification || "",
      Product: fetcdataListItems.product || "",
      Make: fetcdataListItems.make || "",
      Model_Variant: fetcdataListItems.model_Variant || "",
      CustomerFirstName: fetcdataListItems.customerFirstName || "",
      CustomerMiddleName: fetcdataListItems.customerMiddleName || "",
      CustomerLastName: fetcdataListItems.customerLastName || "",
      CustomerMobileNo: fetcdataListItems.customerMobileNo || "",
      State: fetcdataListItems.state || "",
      City: fetcdataListItems.city || "",
      EngineNo_BatteryNo: fetcdataListItems.engineNo_BatteryNo || "",
      ChasisNo_FrameNo: fetcdataListItems.chasisNo_FrameNo || "",
      CustomerEmailid: fetcdataListItems.customerEmailid || "",
      PolicyStartDate: fetcdataListItems.policyStartDate,
      PolicyEndDate: fetcdataListItems.policyEndDate,
      VehicleNo: fetcdataListItems.vehicleNo || "",
      PolicyNumber: fetcdataListItems.engineNo_BatteryNo || "",
      AgentId: "",
      Upload: fetcdataListItems.upload || "",
      AlternateNumber: fetcdataListItems.alternateNumber || "",
    }));

    const hasAnyField =
      fetcdataListItems.companyName ||
      fetcdataListItems.customerFirstName ||
      fetcdataListItems.engineNo_BatteryNo ||
      fetcdataListItems.vehicleNo ||
      fetcdataListItems.chasisNo_FrameNo ||
      fetcdataListItems.policyStartDate ||
      fetcdataListItems.policyEndDate;

    setFormData((prev) => ({
      ...prev,
      PolicyVerification: hasAnyField ? "Verified" : "Manual Verified",
    }));

    setFormAssistance((prev) => ({
      ...prev,
      srN_No: generatedSRN,
      MobileNumber: fetcdataListItems.customerMobileNo || "",
      landmark: fetcdataListItems?.incident_Landmark || "",
      state: fetcdataListItems?.incident_State,
      city: fetcdataListItems?.incident_City,
      pincode:
        fetcdataListItems?.incident_Pincode || fetcdataListItems?.pincode || "",
      callTime: fetcdataListItems?.incident_CallTime || "",
    }));

    setFormIncident((prev) => ({
      ...prev,
      vehicleType: fetcdataListItems?.vehicleType || "",
      kiloMeter: fetcdataListItems?.serviceDrop_KiloMeter || "",
      incident: fetcdataListItems?.serviceDrop_IncidentType || "",
      incidentDetails: fetcdataListItems?.serviceDrop_IncidentDetails || "",
      incidentReason: fetcdataListItems?.serviceDrop_IncidentReason || "",
      locationType: fetcdataListItems?.serviceDrop_LocationType || "",
      caseType: fetcdataListItems?.caseType || "",
      subCategory: fetcdataListItems?.subCategory || "",
      requestType: fetcdataListItems?.requestType || "",
    }));

    console.log(fetcdataListItems, "fetcdataListItemskdfdfjkdfl");

    setFormUploadAssist((prev) => ({
      ...prev,
      totalCharges: fetcdataListItems?.totalCharges || "",
      waitingHoursCharge: fetcdataListItems?.waitingHoursCharge || "",
      vehicleCustodyHoursCharge:
        fetcdataListItems?.vehicleCustodyHoursCharge || "",
      otherCharges: fetcdataListItems?.otherCharges || "",
      vtoL_KM: fetcdataListItems.vtoL_KM || "",
      itoD_KM: fetcdataListItems.itoD_KM || "",
      totalKilometersCharges: fetcdataListItems.totalKilometersCharges || "",
      totalKilometers: fetcdataListItems.gtoG_KM || "",
      totalAmount: fetcdataListItems.totalAmount || "",
      finalAmountWithGST: fetcdataListItems.finalAmountWithGST || "",
      additionalKMs: fetcdataListItems.additionalKMs || "",
      borderAndOtherCharges: fetcdataListItems.borderAndOtherCharges || "",
    }));
    // 22 Aug
    if (fetcdataListItems?.incident_Location) {
      setFormAssistance((prev) => ({
        ...prev,
        location: fetcdataListItems?.incident_Location,
      }));
    }
    // 22 Aug
    if (fetcdataListItems?.dropLocation) {
      setFormIncident((prev) => ({
        ...prev,
        dropLocation: fetcdataListItems?.dropLocation,
      }));
    }
    setFormAssignVendorsDetails((prev) => ({
      ...prev,
      vendorName: fetcdataListItems?.vendorName || "",
      vendorETA: fetcdataListItems?.vendorETA || "",
      vtoL_KM: fetcdataListItems?.vtoL_KM || "",
      itoD_KM: fetcdataListItems?.itoD_KM || "",
      dtoV_KM: fetcdataListItems?.dtoV_KM || "",
      gtoG_KM: fetcdataListItems?.gtoG_KM || "",
      informationDateTime: fetcdataListItems?.informationDateTime || "",
      // driverMobileNo: fetcdataListItems?.vendorName,
      // baseRate: fetcdataListItems?.kmPerHourCharges,
      vendorContactNumber: fetcdataListItems?.vendorContactNumber || "",
    }));
  }, [fetcdataListItems]);

  useEffect(() => {
    setServiceType(fetcdataListItems?.serviceDrop_IncidentType);
    setVendorDistance((prev) => ({
      ...prev,
      Latitude: pickupCoordinates.lat,
      Longitude: pickupCoordinates.lon,
      City: vendorCity,
      State: vendorState,
      ServiceType: incidenttype || fetcdataListItems?.serviceDrop_IncidentType,
    }));
  }, [
    formAssistance.city,
    formAssistance.state,
    pickupCoordinates,
    incidenttype,
    localincidentlat,
    localincidentlon,
    vendorCity,
    vendorState,
  ]);

  useEffect(() => {}, [vendorFetchList]);

  const handleClaimData = async () => {
    try {
      const response = await fetch(`${baseURL}/GetAllClaimsAutoData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getallClaimData),
      });

      const result = await response.json();
      if (result.status == true) {
        const litsMenu = await result.dataItem[0];
        const savedEmail = localStorage.getItem("userEmail");
        setFormData((prev) => ({
          ...prev,
          CompanyName: litsMenu.companyName,
          Product: "",
          Make: litsMenu.car_name,
          Model_Variant: litsMenu.model_Description,
          CustomerFirstName: litsMenu.customer_name,
          CustomerMiddleName: "",
          CustomerLastName: "",
          CustomerMobileNo: litsMenu.customer_mobile,
          State: litsMenu.state,
          City: litsMenu.city,
          VehicleNo: litsMenu.vehicleType,
          EngineNo_BatteryNo: litsMenu.engineNo,
          ChasisNo_FrameNo: litsMenu.chassisNo,
          CustomerEmailid: litsMenu.email,
          PolicyStartDate: "",
          PolicyEndDate: litsMenu.endDate,
          AgentId: savedEmail,
        }));

        const hasAnyField =
          litsMenu.companyName ||
          litsMenu.vehicleType ||
          litsMenu.engineNo ||
          litsMenu.chassisNo;

        setFormData((prev) => ({
          ...prev,
          PolicyVerification: hasAnyField ? "Verified" : "Manual Verified",
        }));

        setExpanded(expanded === "open1" ? false : "open1");
      }
      if (result.status === false) {
        if (
          companyAndSearchTearm.companyName !== "" &&
          companyAndSearchTearm.vehicleNo !== ""
        ) {
          setExpanded(expanded === "open1" ? false : "open1");
        } else {
          setSearchdata((prev) => !prev);
        }
      }
    } catch (error) {
      console.log("error message", error.message);
    }
  };

  const getStatecity = async () => {
    try {
      const res = await axios.get(`${baseURL}/GetAutoStateCity`);
      const stateList = res.data;
      const allStates = stateList.dataItem.flatMap((item) => item.state);
      const allCities = stateList.dataItem.flatMap((item) => item);

      setStateCitiesList(allCities);
      const sortedCities = [
        ...new Set(allStates.map((city) => city.toLowerCase())),
      ].sort();
      setStateList(sortedCities);
    } catch (error) {
      console.log("error message", error.message);
    }
  };

  function getCitiesByState(stateName) {
    if (!stateName) return;

    const normalizedState = stateName.trim().toLowerCase();
    console.log("Normalized:", normalizedState);

    const filtered = stateCitiesList.filter(
      (item) => item.state?.trim().toLowerCase() === normalizedState
    );

    const cities = [...new Set(filtered.map((item) => item.city))].sort();
    console.log(cities, "cities found for", stateName);
    setCitiesList(cities);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      const value = formData[key];
      formDataToSend.append(key, value == null ? "" : value);
    }

    try {
      setLoadingTest(true);
      const response = await fetch(`${baseURL}/CreateAutoSRN`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (data.status === true) {
        toast.success("Form submitted successfully!");
        setGeneratedSRN(data.srN_Number);
        handleOpen();
        setExpanded(expanded === "open3" ? false : "open3");
        setFormData({
          CompanyName: "",
          PolicyVerification: "",
          Product: "",
          Make: "",
          Model_Variant: "",
          CustomerFirstName: "",
          CustomerMiddleName: "",
          CustomerLastName: "",
          CustomerMobileNo: "",
          State: "",
          City: "",
          VehicleNo: "",
          EngineNo_BatteryNo: "",
          ChasisNo_FrameNo: "",
          CustomerEmailid: "",
          PolicyStartDate: "",
          PolicyEndDate: "",
          Upload: null,
        });
        setSearchdata(false);
        setStepscount(2);
      } else {
        toast.error("Failed to Submit");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to Submit");
    } finally {
      setLoadingTest(false);
    }
  };

  const handleSync = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      const responce = await fetch(`${baseURL}/GetSRNData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchForm),
      });
      const data = await responce.json();
      if (data?.dataItem.length > 0) {
        localStorage.setItem(
          "CalculationData",
          JSON.stringify(data?.dataItem || [])
        );
      }

      const { status, message, dataItem } = data;
      if (dataItem.length > 0) {
        if (!dataItem.vendorName === null) {
          localStorage.removeItem("pickupCoordinates");
          localStorage.removeItem("dropCoordinates");

          setExpanded(
            (dataItem.srN_Remark === "Case Cancelled" &&
              dataItem.srN_Status === "Vendor Close Issue") ||
              (dataItem.srN_Remark === "Ongoing" &&
                dataItem.srN_Status === "OnGoing" &&
                dataItem.rsaStatus === "Case Completed")
              ? "open6"
              : "open6"
          );
        }

        const fetchedData = dataItem[0];
        setFetcdataListItems(fetchedData);
        setFetcdataCustomerNo(fetchedData.customerMobileNo);
        if (fetchedData.incident_City === "New+Delhi") {
          setVendorCity(fetchedData.incident_City.split("+")[-1]);
        } else {
          setVendorCity(fetchedData.incident_City);
        }
        setPickupCoordinates({
          lat: fetchedData?.user_Latitude,
          lon: fetchedData?.uSer_Longitude,
        });
        if (fetchedData.incident_State === "") {
          if (fetchedData.incident_City === "New+Delhi") {
            setVendorState(fetchedData.incident_City.split("+")[-1]);
          } else {
            setVendorState(fetchedData.incident_City);
          }
          // setVendorState(fetchedData.incident_City)
        } else {
          setVendorState(fetchedData.incident_State);
        }
      }
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  console.log(fetcdataListItems, "fetchdata,,,,");

  //History update
  const fetchSrnRemarkLogs = async () => {
    try {
      setRemarkLoading(true);

      const response = await axios.post(`${baseURL}/GetSRNRemarks`, {
        srN_No: generatedSRN,
      });

      if (response?.data) {
        setRemarkLogsData(response.data || []);
      } else {
        setRemarkLogsData([]);
      }
    } catch (err) {
      console.error("Error fetching SRN Remarks:", err.message || err);
      setRemarkLogsData([]);
    } finally {
      setRemarkLoading(false);
    }
  };

  //complete detaild -incident details
  const handleIncidentDetails = async (e) => {
    e.preventDefault();
    try {
      setLoadingTest(true);
      const response = await fetch(`${baseURL}/SaveIncidentDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formAssistance),
      });

      const data = await response.json();
      if (data) {
        await fetchData();
        await fetchSrnRemarkLogs();
      }
      if (response.ok && data.status === true) {
        toast.success("Form Submitted Succesfully !");
        setCompleteDeatils(true);
        setStepscount(3);
        setExpanded(expanded === "open4" ? false : "open4");
      } else {
        toast.error("Failed to Submit");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to Submit");
    } finally {
      setLoadingTest(false);
    }
  };

  //Service Request -> SaveServiceDropDetails
  console.log("storedsrnnumber", localStorage.getItem("genratedSRN"));
  const [formIncident, setFormIncident] = useState({
    srN_No: "",
    incident: "",
    incidentDetails: "",
    incidentReason: "",
    locationType: "",
    vendorNotAssignRemark: "",
    dropLocation: "",
    kiloMeter: "",
    assistanceSummary: "",
    drop_latitude: "",
    drop_longitude: "",
    externalAssistanceSummary: "",
    vehicleType: "",
    caseType: "",
    subCategory: "",
    requestType: "",
    AgentId: savedEmail,
  });

  const handleServiceDetails = async (e) => {
    console.log(formIncident, "form incident");
    e.preventDefault();

    if (localStorage.getItem("genratedSRN")) {
      try {
        setLoadingTest(true);
        const responce = await fetch(`${baseURL}/SaveServiceDropDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formIncident,
            srN_No: localStorage.getItem("genratedSRN"),
          }),
        });
        const data = await responce.json();

        if (data.status === true) {
          await fetchData();
          await fetchSrnRemarkLogs();
          toast.success("Form Submitted Succesfully !");
          setSpinnerLoading(true);
          await fetchVendorList(generatedSRN);
          console.log("caseTypekjdjfsd:", formIncident?.caseType, expanded);
          if (
            formIncident?.caseType === "Complete-Enquiry" ||
            formIncident?.caseType === "Case Denied" ||
            formIncident?.caseType === "Case Cancelled"
          ) {
            // just close accordion 4, do not open 5
            setExpanded(false);
            setTimeout(() => {
              navigate("/dashboarddetails");
            }, 1000);
          } else {
            // normal toggle for accordion 5
            setExpanded(expanded === "open5" ? false : "open5");
          }
          if (
            vendorDistance.incident_City &&
            vendorDistance.State &&
            vendorDistance.ServiceType &&
            vendorDistance.Latitude &&
            vendorDistance.Longitude
          ) {
            // console.log("validate");
          }
        } else {
          toast.error("Failed to Submit");
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to Submit");
      } finally {
        setLoadingTest(false);
      }
    }
  };

  // const selectedVendor = ServiceDrop_IncidentDetails;
  const handleSubmitAgentfeedback = async (
    value,
    srn,
    Stype,
    contact,
    vendorid
  ) => {
    try {
      const res = await axios.post(`${baseURL}/SaveVendorIssueDetails`, {
        srN_No: srn,
        vendor_id: vendorid,
        agent_id: savedEmail,
        reason: value,
        vendor_MobileNo: contact,
        service_Type: Stype,
        FinalAmount: "",
      });
      console.log("hello", res.data);
      toast.success(res.data.message);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else {
        console.error("Error:", error.message);
        // toast.error(error.message);
      }
    } finally {
      fetchVendorList();
    }
  };

  // latitude and longitude
  const handleCoordinatesAPI = async (areaName, type) => {
    try {
      const response = await fetch(`${baseURL}/GetCoordinates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: areaName.toLowerCase(),
          srN_No: generatedSRN,
          userType: "User",
        }),
      });

      const data = await response.json();

      if (data.latitude && data.longitude) {
        if (type === "drop") {
          setDropCoordinates({ lat: data.latitude, lon: data.longitude });
          // Save drop coordinates to localStorage
          localStorage.setItem(
            "dropCoordinates",
            JSON.stringify({ lat: data.latitude, lon: data.longitude })
          );
          setDLat(data.latitude);
          setDLon(data.longitude);
        } else if (type === "pickup") {
          setPickupCoordinates({ lat: data.latitude, lon: data.longitude });
          // Save pickup coordinates to localStorage
          localStorage.setItem(
            "pickupCoordinates",
            JSON.stringify({ lat: data.latitude, lon: data.longitude })
          );
          setILat(data.latitude);
          setILon(data.longitude);
        } else if (type === "vendor") {
          setLocalVendorCoordinates({
            lat: data.latitude,
            lon: data.longitude,
          });
          // Save pickup coordinates to localStorage
          localStorage.setItem(
            "localVendorCoordinates",
            JSON.stringify({ lat: data.latitude, lon: data.longitude })
          );
          setVLat(data.latitude);
          setVLon(data.longitude);
        }
        return { lat: data.latitude, lon: data.longitude };
      } else {
        console.warn(`Coordinates not found for ${areaName}`);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  //Service Request -> SaveServiceDropDetails -> show vendor list
  const fetchVendorList = async () => {
    const { Latitude, Longitude, City, State } = vendorDistance;
    const storedServiceType = localStorage.getItem("serviceType");
    const queryParams = new URLSearchParams({
      Latitude,
      Longitude,
      City,
      State,
      ServiceType: storedServiceType,
      srnNO: generatedSRN,
    }).toString();
    setSpinnerLoading(true);
    console.log(queryParams, "query params");
    try {
      const response = await fetch(
        `${baseURL}/GetVendorDistance_V1?${queryParams}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("data response", data);
      setService(data?.service);
      const { savedVendors } = data;
      setVendorFetchList(savedVendors.slice(0, 8));
    } catch (error) {
      console.log("Error message", error);
    } finally {
      setSpinnerLoading(false);
    }
  };
  useEffect(() => {
    if (vendorDistance.ServiceType) {
      console.log(vendorDistance.ServiceType, "vendor distance");
      fetchVendorList();
    }
  }, [vendorDistance.ServiceType]);

  const handleAssignvendorDetails = async (e, isLocalSearch) => {
    e.preventDefault();
    if (isLocalSearch) {
      const localVendorPayload = {
        vendorname: formAssignVendorsDetails.vendorName,
        rsr: storedServiceType === "RSR" ? storedServiceType : "",
        _2WFBT: storedServiceType === "2W-Flatbed" ? storedServiceType : "",
        ul: storedServiceType === "Underlift" ? storedServiceType : "",
        _4WFBT: storedServiceType === "4W-Flatbed" ? storedServiceType : "",
        _4WZERODEGREE:
          storedServiceType === "Zero-Degree" ? storedServiceType : "",
        miniTruck: storedServiceType === "Mini Truck" ? storedServiceType : "",
        city: localVendorStateCity?.localVendorCity,
        state: localVendorStateCity?.localVendorState,
        geolocation: formAssignVendorsDetails?.vendorLocation,
        latitudes: localVendorCoordinates?.lat
          ? String(localVendorCoordinates.lat)
          : "",
        longitudes: localVendorCoordinates?.lon
          ? String(localVendorCoordinates.lon)
          : "",
        contactnumber: formAssignVendorsDetails.vendorContactNumber
          ? String(formAssignVendorsDetails?.vendorContactNumber)
          : "",
        rsrDayupto20kms:
          storedServiceType === "RSR"
            ? String(formAssignVendorsDetails.baseRate)
            : "",
        rsrNightupto20kms: "",
        rsrDayperkm:
          storedServiceType === "RSR"
            ? String(localVendorStateCity?.ratePerKm)
            : "",
        rsrNightperkm: "",
        underliftupto40kms:
          storedServiceType === "Underlift"
            ? String(formAssignVendorsDetails.baseRate)
            : "",
        underliftperkm:
          storedServiceType === "Underlift"
            ? String(localVendorStateCity?.ratePerKm)
            : "",
        _4WFBTupto40kms:
          storedServiceType === "4W-Flatbed"
            ? String(formAssignVendorsDetails.baseRate)
            : "",
        _4WFBTperkm:
          storedServiceType === "4W-Flatbed"
            ? String(localVendorStateCity?.ratePerKm)
            : "",
        _2WFBTupto40kms:
          storedServiceType === "2W-Flatbed"
            ? String(formAssignVendorsDetails.baseRate)
            : "",
        _2Wperkm:
          storedServiceType === "2W-Flatbed"
            ? String(localVendorStateCity?.ratePerKm)
            : "",
        miniTruckupto40kms:
          storedServiceType === "Mini Truck"
            ? String(formAssignVendorsDetails.baseRate)
            : "",
        miniTruckupto40kmsforTVS: "",
        miniTruckupto40kmsforOLA: "",
        miniTruckperkm:
          storedServiceType === "Mini Truck"
            ? String(localVendorStateCity?.ratePerKm)
            : "",
        _4WZERODEGREEupto40kms:
          storedServiceType === "Zero-Degree"
            ? String(formAssignVendorsDetails.baseRate)
            : "",
        _4WZERODEGREEperkm:
          storedServiceType === "Zero-Degree"
            ? String(localVendorStateCity?.ratePerKm)
            : "",
      };
      console.log(
        localVendorPayload,
        "local vendor payload ",
        serviceType,
        "service"
      );

      try {
        setLoadingTest(true);
        const repsonce = await fetch(`${baseURL}/SaveVendorDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(localVendorPayload),
        });
        const data = await repsonce.json();
        fetchData();
        fetchSrnRemarkLogs();
        if (data?.[0]?.status === true && data?.[0]?.vendorID) {
          // setSelectedVendorId(data[0].vendorID)
          localStorage.setItem("statusrej_vendorID", data[0].vendorID);
        }
        if (data.status === true) {
          toast.success("Form Submitted Succesfully !");
          setExpanded(expanded === "open6" ? false : "open6");
          setVenderAssign(true);
          handleAssignSubmitOpen();
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to Submit");
      } finally {
        setLoadingTest(false);
      }
    }
    // if (!isLocalSearch) {
    const storedVendorID = localStorage.getItem("statusrej_vendorID");
    if (storedVendorID) {
      console.log(formAssignVendorsDetails, "formAssignVendorsDetailskdjkdf");
      try {
        setLoadingTest(true);
        const repsonce = await fetch(`${baseURL}/SaveAssignVendorDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formAssignVendorsDetails,
            vendorId: storedVendorID,
          }),
        });
        const data = await repsonce.json();

        fetchData();
        fetchSrnRemarkLogs();
        if (data.status === true) {
          localStorage.removeItem("statusrej_vendorID");
          toast.success("Form Submitted Succesfully !");
          setExpanded(expanded === "open6" ? false : "open6");
          setVenderAssign(true);
          handleAssignSubmitOpen();
        } else {
          toast.error("Failed to Submit");
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to Submit");
      } finally {
        setLoadingTest(false);
      }
    }

    // }
  };

  const handleVendordetailsSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    if (formSrnStatus.srN_Status === "Vendor Close Issue") {
      url = `${baseURL}/SaveSRN_CloseStatus`;
    } else {
      url = `${baseURL}/SaveSRN_StatusDetails`;
    }
    try {
      setLoadingTest(true);
      const respond = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify(formSrnStatus),
      });
      const data = await respond.json();
      // console.log('data', data);
      if (data.status === true) {
        toast.success("Form Submitted Successfully ! ");
        setStepscount(7);
        // fetchSRNHistory();
        fetchSrnRemarkLogs();

        setTimeout(() => {
          console.log(formSrnStatus.rsaTimeLineStatus, "jfsldfjlsdfkdjf");
          if (formSrnStatus.rsaTimeLineStatus !== "Case Completed") {
            navigate("/dashboarddetails");
          }
        }, 800);

        if (formSrnStatus.srN_Remark === "Case Completed") {
          setExpanded(expanded === "open8" ? false : "open8");
        } else {
          setExpanded(expanded === "open6" ? false : "open6");
        }
        if (formSrnStatus.rsaTimeLineStatus === "Case Completed") {
          setExpanded(expanded === "open8" ? false : "open8");
        } else {
          setExpanded(expanded === "open6" ? false : "open6");
        }
      } else {
        toast.error("Failed to Submit !");
      }
    } catch (error) {
      toast.error("form Submitted !", error);
    } finally {
      setLoadingTest(false);
    }
  };

  // handleUploadAssist
  const handleUploadAssist = async (e) => {
    e.preventDefault();
    try {
      setLoadingTest(true);

      const cleanedPayload = {
        ...formUploadAssist,
        totalCharges: Number(formUploadAssist.totalCharges) || 0, // send as number
        totalKilometers: formUploadAssist.totalKilometers
          ? formUploadAssist.totalKilometers.replace(/[^0-9.]/g, "") // remove "KM" etc.
          : "",
        vtoL_KM: formUploadAssist.vtoL_KM
          ? formUploadAssist.vtoL_KM.replace(/[^0-9.]/g, "")
          : "",
        itoD_KM: formUploadAssist.itoD_KM
          ? formUploadAssist.itoD_KM.replace(/[^0-9.]/g, "")
          : "",
        totalKilometersCharges: String(
          formUploadAssist.totalKilometersCharges || "0"
        ), // swagger expects string
      };

      const responce = await fetch(`${baseURL}/UploadAssistDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedPayload),
      });
      const data = await responce.json();
      // console.log("data", data);
      setExpanded(expanded === "open8" ? "open9" : "open8");
      if (data.status === true) {
        toast.success("Form Submited SuccesFully !");
        localStorage.removeItem("statusrej_vendorID");
      } else {
        toast.error("Faild To Submit !");
      }
    } catch (error) {
      toast.error(error);
      console.log("error Message", error);
    } finally {
      setLoadingTest(false);
    }
  };

  //location
  const [suggestions, setSuggestions] = useState([]);
  const [inputdropValue, setInputDropValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [inputVendor, setInputVendor] = useState("");
  const [loading, setLoading] = useState(false);
  // Debounced search effect
  // useEffect(() => {
  //   if (inputValue.length < 2 || !isTyping) {
  //     setSuggestions([]);
  //     return;
  //   }
  //   const delayDebounceFn = setTimeout(() => {
  //     fetchSuggestions(inputValue);
  //   }, 500);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [inputValue]);

  useEffect(() => {
    if (inputValue.length < 2 || !isTyping || isSelecting) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, isTyping, isSelecting]);

  useEffect(() => {
    setIsTyping(true);
    if (!isTyping) {
      fetchSuggestions_drop([]);
      return;
    }
    const debounceTimer = setTimeout(() => {
      fetchSuggestions_drop(inputdropValue);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [inputdropValue]);

  useEffect(() => {
    if (inputVendor.length < 2) {
      setSuggestions_Vedor([]);
      return;
    }
    const debounceTimer = setTimeout(() => {
      fetchSuggestions_Vendor(inputVendor);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [inputVendor]);

  const fetchSuggestions = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/GetAreaSuggestions?input=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions_drop = async (query) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${baseURL}/GetAreaSuggestions?input=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const formattedData = data.map((item, index) => ({
          place_id: index,
          display_name: item.description,
          description: item.description,
        }));
        setSuggestions_drop(formattedData);
      } else {
        setSuggestions_drop([]);
      }
    } catch (error) {
      console.error("Error fetching drop suggestions:", error);
      setSuggestions_drop([]);
    } finally {
      setLoading(false);
    }
  };

  //------------------newwwww-----------------------------//
  const handleInputChange = (e) => {
    if (isSelecting) return;
    setIsTyping(true);
    setInputValue(e.target.value);
    setFormAssistance((prev) => ({ ...prev, location: e.target.value }));
  };
  const handleSelect = (place) => {
    // console.log(place, 'placeee placee');
    const state = extractState(place.description);
    const city = extractCity(place.description);
    const location = extractLocation(place.description);

    const cleanCity = city?.replace(/State/i, "").trim();
    if (cleanCity?.toLowerCase().includes("chandigarh state")) {
      cleanCity = cleanCity.split(" ")[0];
    }

    const cleanStateValue = (value) => value?.replace(/\d+/g, "").trim() || "";

    const finalState =
      cleanCity?.trim().toLowerCase() === "chandigarh"
        ? "Chandigarh"
        : cleanStateValue(state);

    // const finalState =
    //   cleanCity?.trim().toLowerCase() === "chandigarh" ? "Chandigarh" : state;

    const finalCity =
      state?.trim().toLowerCase() === "delhi"
        ? "Delhi"
        : state?.trim().toLowerCase() === "chandigarh"
          ? "Chandigarh"
          : cleanCity;

    setIsSelecting(true);

    setFormAssistance((prev) => ({
      ...prev,
      location: location,
      state: finalState,
      city: finalCity,
      pincode: "",
    }));

    // setInputValue(place.description);
    setInputValue(location);
    setSuggestions([]);
    setIsTyping(false);
    //Update formArea
    setFormArea((prev) => ({
      ...prev,
      area: place.description,
      srN_No: generatedSRN,
    }));
    // Call API with selected area immediately
    handleCoordinatesAPI(place.description, "pickup");
    setTimeout(() => setIsSelecting(false), 300);
  };

  const extractState = (description) => {
    const parts = description.split(",").map((part) => part.trim());
    return parts.length >= 2 ? parts[parts.length - 2] : "";
  };

  const extractCity = (description) => {
    const parts = description.split(",").map((part) => part.trim());
    return parts.length >= 3 ? parts[parts.length - 3] : "";
  };

  const extractLocation = (description) => {
    const parts = description.split(",").map((part) => part.trim());
    // console.log(description)
    // if(parts.length >= 6){
    //  return (parts.join(" "));
    //  }else if(parts.length >= 5){
    // 	return (parts[parts.length - 5] && parts[parts.length - 4]);
    //   }else{
    // return	parts[parts.length - 4];
    // }

    return parts.join(" ");
  };

  const handleSelectDrop = async (dropPlace, IncidentPlace) => {
    // console.log('Drop place selected:', dropPlace);
    setInputDropValue(dropPlace.description);
    setFormIncident((prev) => ({
      ...prev,
      dropLocation: dropPlace.description, //29 changes
    }));

    setFormArea((prevForm) => ({
      ...prevForm,
      area: dropPlace.description || fetcdataListItems?.dropLocation,
      srN_No: generatedSRN,
    }));
    setSuggestions_drop([]);
    setIsTyping(false);
    // setSuggestions_Vedor([]);
    // Call Coordinates API using your POST API
    const dropCoords = await handleCoordinatesAPI(
      dropPlace.description,
      "drop"
    );
    const pickupCoords = await handleCoordinatesAPI(IncidentPlace, "pickup");
    setLocalincidentlat(pickupCoords.lat);
    setLocalincidentlon(pickupCoords.lon);

    //  Save Drop Coordinates to localStorage if available
    if (dropCoords?.lat && dropCoords?.lon) {
      localStorage.setItem("dropLat", dropCoords.lat);
      localStorage.setItem("dropLon", dropCoords.lon);
      // console.log("drop lat & Lon", dropCoords.lat, dropCoords.lon);
    }

    //  Save Pickup Coordinates to localStorage if already available
    if (pickupCoordinates.lat && pickupCoordinates.lon) {
      localStorage.setItem("pickupLat", pickupCoordinates.lat);
      localStorage.setItem("pickupLon", pickupCoordinates.lon);
    }

    if (pickupCoords.lat && pickupCoords.lon) {
      localStorage.setItem("pickupLat", pickupCoords.lat);
      localStorage.setItem("pickupLon", pickupCoords.lon);
    }
    //  Use already known pickup coordinates
    let pickupLat = pickupCoordinates?.lat;
    let pickupLon = pickupCoordinates?.lon;

    // Fallback to localStorage if not in state
    if (!pickupLat || !pickupLon) {
      pickupLat = parseFloat(localStorage.getItem("pickupLat"));
      pickupLon = parseFloat(localStorage.getItem("pickupLon"));
      setPickupCoordinates({ lat: pickupLat, lon: pickupLon }); // update state if needed
    }
    const incidentLats = localStorage.getItem("incident_lats");
    const incidentLans = localStorage.getItem("incident_lons");
    setLocalincidentlat(incidentLats);
    setLocalincidentlon(incidentLans);
    // CODE RM1 1264- 1287

    const latttt = parseFloat(incidentLats);
    const lonnnnn = parseFloat(incidentLans);

    setDLat(dropCoords?.lat);
    setDLon(dropCoords?.lon);
    const [distanceText, distanceValue] = await getDistance(
      incidentLats,
      incidentLans,
      dropCoords.lat,
      dropCoords.lon
    );

    // console.log("Distance:", distanceText, distanceValue);
    localStorage.setItem("distance_value", distanceValue);
    localStorage.setItem("distance_text", distanceText);
    localStorage.setItem("gtogVal1", distanceValue);
    // CODE RM2

    if (pickupLat && pickupLon && dropCoords?.lat && dropCoords?.lon) {
      // CODE RM3

      setFormIncident((prev) => ({
        ...prev,
        kiloMeter: String(distanceText),
        drop_latitude: String(dropCoords?.lat),
        drop_longitude: String(dropCoords?.lon),
      }));
    } else {
      alert(
        "Pickup or Drop coordinates missing, can't calculate distance yet."
      );
    }
    // CODE RM4
    setTimeout(() => setIsSelecting(false), 300);
  };

  // CODE RM5
  // handleSelectVendor Start
  const handleSelectVendor = async (dropPlace) => {
    console.log(dropPlace, "dropPlacekkksdjfkld");
    setIsSelectingVendor(true);
    setIsTypingVendor(false);
    setInputVendor(dropPlace?.display_name);
    setSuggestions_Vedor([]);
    const localVendorCoords = await handleCoordinatesAPI(
      dropPlace.description,
      "vendor"
    );

    if (!localVendorCoords?.lat || !localVendorCoords?.lon) {
      alert(
        "Pickup or Local Vendor coordinates missing, can't calculate distance yet."
      );
      setIsSelectingVendor(false);
      return;
    }
    const v = localVendorCoords.lat;
    const v_ = localVendorCoords.lon;

    const location_d1 = JSON.parse(localStorage.getItem("dropLat"));
    const location_d2 = JSON.parse(localStorage.getItem("dropLon"));
    setDLat(location_d1);
    setDLon(location_d2);
    const location_p1 = pickupCoordinates.lat;
    const location_p2 = pickupCoordinates.lon;
    const [Vendor_drop, Vendor_drop_v] = await getDistance(
      v,
      v_,
      location_d1,
      location_d2
    );
    const [Vendor_incident, Vendor_incident_v] = await getDistance(
      v,
      v_,
      location_p1,
      location_p2
    );

    const incident_drop = localStorage.getItem("distance_value");
    const incident_drop_v = localStorage.getItem("distance_text");
    const srn_no = localStorage.getItem("genratedSRN");
    const total_gtog = parseFloat(
      Vendor_incident_v + parseFloat(Vendor_drop_v) + parseFloat(incident_drop)
    );

    const avg_distance = total_gtog ? total_gtog / 1000 : 0;
    const validDistance = isNaN(avg_distance) ? 0 : avg_distance;
    setAverageDistance(validDistance);

    console.log("avg_distance", avg_distance);

    setFormAssignVendorsDetails((prev) => ({
      ...prev,
      srN_No: srn_no,
      vendorLocation: dropPlace?.display_name,
      vtoL_KM: Vendor_incident,
      dtoV_KM: storedServiceType === "RSR" ? "" : Vendor_drop,
      // (() => {
      //     const vendorKm = parseFloat(Vendor_incident) || 0;
      //     const incidentKm = parseFloat(incident_drop_v) || 0;
      //     const totalKm = vendorKm + incidentKm;
      //     return totalKm.toFixed(2) + " KM";
      //   })(),
      itoD_KM: storedServiceType === "RSR" ? " " : incident_drop_v,
      gtoG_KM:
        storedServiceType === "RSR" ? Vendor_incident : avg_distance + " KM",
    }));

    setTimeout(() => setIsSelectingVendor(false), 300);
  };

  const handleVendorDetailsFetch = async (
    vname,
    mobile_n,
    branch_name,
    venLat,
    venLon,
    duration,
    durvalue,
    rate,
    index,
    e
  ) => {
    const location = JSON.parse(localStorage.getItem("dropLat"));
    const location_ = JSON.parse(localStorage.getItem("dropLon"));

    const incedent_lat = pickupCoordinates.lat;
    const incedent_lon = pickupCoordinates.lon;
    localStorage.setItem("EstimatedTime", duration);
    setDLat(location);
    setDLon(location_);
    setILat(incedent_lat);
    setILon(incedent_lon);
    setVLat(venLat);
    setVLon(venLon);

    let distanceDtoV, gtog3;
    let distanceDtoI = localStorage.getItem("distance_value");
    const [distanceVtoI, gtog2] = await getDistance(
      incedent_lat,
      incedent_lon,
      venLat,
      venLon
    );
    if (
      storedServiceType === "2W-Flatbed" ||
      storedServiceType === "4W-Flatbed" ||
      storedServiceType === "3W-Flat Bed" ||
      storedServiceType === "Underlift" ||
      storedServiceType === "Zero-Degree" ||
      storedServiceType === "Mini Truck" ||
      storedServiceType === "Car to Car" ||
      storedServiceType === "Hydra"
    ) {
      [distanceDtoV, gtog3] = await getDistance(
        location,
        location_,
        venLat,
        venLon
      );
    }
    const calcultedDistanceItoD = localStorage.getItem("distance_text");
    // Save intermediate values to localStorage

    localStorage.setItem("calDistanceDtoV", JSON.stringify(distanceDtoV));
    localStorage.setItem("calDistanceVtoI", JSON.stringify(distanceVtoI));
    localStorage.setItem("gtogVal2", gtog2);
    localStorage.setItem("gtogVal3", gtog3);
    localStorage.setItem("VendorName", JSON.stringify(vname));
    localStorage.setItem("Vendormobile_n", mobile_n);

    const totaldistance1 = localStorage.getItem("distance_value");
    const totaldistance2 = gtog2;
    const totaldistance3 = gtog3;
    if (!totaldistance1 && !totaldistance2 && !totaldistance3) {
      return;
    }

    const totaldistance =
      parseFloat(totaldistance1 || 0) +
      parseFloat(totaldistance2 || 0) +
      parseFloat(totaldistance3 || 0);
    const srn_n = localStorage.getItem("genratedSRN");
    //  Set all data in form state and UI will update
    console.log(storedServiceType, "service Typedetails");
    if (
      storedServiceType === "2W-Flatbed" ||
      storedServiceType === "4W-Flatbed" ||
      storedServiceType === "3W-Flat Bed" ||
      storedServiceType === "Underlift" ||
      storedServiceType === "Zero-Degree" ||
      storedServiceType === "Mini Truck" ||
      storedServiceType === "Car to Car" ||
      storedServiceType === "Hydra"
    ) {
      setFormAssignVendorsDetails((prev) => ({
        ...prev,
        srN_No: srn_n,
        vendorName: vname,
        vtoL_KM: distanceVtoI,
        dtoV_KM: distanceDtoV,
        itoD_KM: calcultedDistanceItoD,
        gtoG_KM: (totaldistance / 1000).toFixed(2) + " KM",
        vendorContactNumber: mobile_n,
        vendorETA: duration,
        kmPerHourCharges: durvalue,
        baseRate: rate.toString(),
      }));
    }
    if (storedServiceType === "RSR") {
      setFormAssignVendorsDetails((prev) => ({
        ...prev,
        srN_No: srn_n,
        vendorName: vname,
        vtoL_KM: distanceVtoI,
        dtoV_KM: "",
        itoD_KM: "",
        gtoG_KM: distanceVtoI,
        vendorContactNumber: mobile_n,
        vendorETA: duration,
        kmPerHourCharges: durvalue,
        baseRate: rate.toString(),
      }));
    }
    // Set selection index for UI indication
    setSelected(index === selected ? null : index);
    setVLat(venLat);
    setVLon(venLon);
  };

  const getDistance = async (latOrg, longOrg, latDestn, longDestn) => {
    try {
      const url = `${baseURL}/GetDistanceBetweenCoordinates?originLat=${latOrg}&originLng=${longOrg}&destinationLat=${latDestn}&destinationLng=${longDestn}`;
      const response = await fetch(url, {
        method: "POST",
      });
      const data = await response.json();
      console.log(data.distanceText, "distanceTextskdfd");
      return [data.distanceText, data.distanceValue];
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchSuggestions_Vendor = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/GetAreaSuggestions?input=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const formattedlist = data.map((item, index) => ({
          place_id: index,
          display_name: item.description,
          description: item.description,
        }));
        setSuggestions_Vedor(formattedlist);
      } else {
        setSuggestions_Vedor([]);
      }
    } catch (error) {
      console.error("Error fetching drop suggestions:", error);
      setSuggestions_Vedor([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInput_Change = (e) => {
    const value = e.target.value;
    setInputDropValue(value);
    setFormIncident((prev) => ({
      ...prev,
      dropLocation: value,
    }));
  };

  const handleVednoLoc_Change = (e) => {
    if (isSelectingVendor) return;
    const value = e.target.value;
    setInputVendor(value);
    setIsTypingVendor(true);
  };

  const storedGtoG_KM = localStorage.getItem("gtoG_KM");
  const storedService = localStorage.getItem("serviceType");
  const cleanedGtoG_KM = storedGtoG_KM
    ? storedGtoG_KM.toLowerCase().split("km")[0].trim()
    : "";
  const serviceTypeFromGetSrnData =
    fetcdataListItems?.serviceDrop_IncidentType === "RSR"
      ? "RSR"
      : fetcdataListItems?.serviceDrop_IncidentDetails;
  useEffect(() => {
    if (
      storedSRN &&
      serviceTypeFromGetSrnData &&
      cleanedGtoG_KM &&
      vendorIdFromSrn
    ) {
      const calculateTotalAmount = async () => {
        const cleanedDistance = cleanedGtoG_KM.toString().replace(/,/g, "");
        const payload = {
          srN_No: storedSRN,
          vendor_id: vendorIdFromSrn,
          totalDistance: cleanedGtoG_KM,
          serviceType: serviceTypeFromGetSrnData,
        };

        console.log("Payload for CalculateTotalAmount:", payload);

        try {
          const response = await fetch(`${baseURL}/CalculateTotalAmount`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          if (data?.status) {
            setCalculatedAmount({
              totalAmount: data.totalAmount,
              totalAmountWithGST: data.totalAmountWithGST,
              message: data.message,
              srN_Number: data.srN_Number,
            });
          }
        } catch (error) {
          console.error("Error calling CalculateTotalAmount API:", error);
        }
      };

      calculateTotalAmount();
    }
  }, [storedSRN, cleanedGtoG_KM, serviceTypeFromGetSrnData, vendorIdFromSrn]);

  return (
    <CustomerContext.Provider
      value={{
        handleChange,
        handleChangedrop,
        getallClaimData,
        boolean,
        handleChangeclaimdata,
        handleClaimData,
        searchdata,
        handleSubmit,
        activeStep,
        completed,
        companyName,
        supportVerification,
        handleClose,
        open,
        handleFileChange,
        handleOpen,
        expanded,
        setExpanded,
        handleAccordionChange,
        setCompanyName,
        formData,
        handleswitch,
        generatedSRN,
        incidentStatus,
        handleIncidenceOpen,
        handleIncidenceClose,
        handleAssignOpen,
        handleAssignClose,
        handleAssignSubmitClose,
        handleAssignSubmitOpen,
        venderModal,
        venderAssign,
        handleSerachAssistance,
        assistData,
        handleIncidentDetails,
        formAssistance,
        setFormAssistance,
        handleAssist,
        handleDownloadHistory,
        formIncident,
        handleService,
        handleServiceDetails,
        statusmodal,
        completeDeatils,
        handleDetailsModal,
        fetcdataListItems,
        states,
        stateCode,
        cities,
        handleCoordinates,
        area,
        stepsCount,
        handleAssignvendorDetails,
        formAssignVendorsDetails,
        setFormAssignVendorsDetails,
        setStepscount,
        ToastContainer,
        handleVendordetailsSubmit,
        handleStatus,
        formSrnStatus,
        vendorFetchList,
        // userLatitude,
        // userLongitude,
        handleVendorDetailsFetch,
        handleVendorAssign,
        vendor_Name,
        vendor_Branch,
        m_no,
        selected,
        // handleAreaLocationStateCity,
        handleUploadAssist,
        formUploadAssist,
        handleCostVendor,
        // location
        loading,
        handleInputChange,
        handleInput_Change,
        suggestions,
        suggestions_drop,
        handleSelect,
        handleSelectDrop,
        setFetcdataListItems,
        setGeneratedSRN,
        pickupCoordinates,
        handleVednoLoc_Change,
        suggestions_Vedor,
        handleSelectVendor,
        dLon,
        dLat,
        iLon,
        iLat,
        vLon,
        vLat,
        setSelected,
        handleNovendorAssign,
        historySrn,
        setHistorySrn,
        setRquestData_,
        companylist,
        inputValue,
        inputdropValue,
        setInclat,
        setInclong,
        setDroplat,
        setDroplong,
        setVendor_Name,
        setActiveStep,
        setCompleted,
        setSupportVerification,
        setStatusmodal,
        setVendor_Branch,
        setM_no,
        dropCoordinates,
        localVendorCoordinates,
        fetcdataCustomerNo,
        fetchFormexcel,
        formArea,
        spinnerloading,
        handleSearchData,
        searchCompamyData,
        setUploadDetailsFrom,
        remarkLoading,
        remarkLogsData,
        setGetallClaimData,
        handleCmpanyAndSearchTearm,
        handleChangeCmpanyAndSearchTearm,
        companyAndSearchTearm,
        // filteredRecord,
        loadingTest,
        editable,
        setEditable,
        disabledFromStates,
        handleSync,
        handleSubmitAgentfeedback,
        stateList,
        citiesList,
        makeComaniesList,
        modelVarientList,
        getCitiesByState,
        calculatedAmount,
        selectedVendor,
        setSelectedVendor,
        localVendorStateCity,
        setLocalVendorStateCity,
        handleLocalVendorChange,
        selectedRsaStatus,
        setFormSrnStatus,
        selectedVendorId,
        setSelectedVendorId,
        inputVendor,
        handleRecordSelect,
        multipleRecords,
        showPopup,
        setShowPopup,
        makeComaniesList,
        service,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
