import { useEffect, useState, } from 'react'
import baseURL from '../../../api/autoApi'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
dayjs.extend(customParseFormat);

const ActiveCasesHook = () => {
  const [activeCases, setActiveCases] = useState([]);
  const [todayCases, setTodayCases] = useState([])
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState(todayCases)
  const [assigned, setAssigned] = useState([]);
  const [cancelledCases, setCancelledCases] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [escalated, setEscalated] = useState([]);
  const [mycases, setMycases] = useState([]);
  //Search inputs
  const [search, setSearch] = useState('')
  const [followsearch, setFollowsearch] = useState('');
  const [mysearch, setMysearch] = useState('');
  const [comSearch, setComSearch] = useState('')
  const [recallCancelledSearch, setRecallCancelledSearch] = useState('');
  const [escSearch, setEscSearch] = useState('');
  const [filterCancelledCases, setFilterCancelledCases] = useState(cancelledCases)
  const agent = localStorage.getItem("userEmail");
  const [casesTime, setCasesTime] = useState('');
  const [rsaStatus, setRsaStatus] = useState('');
  const [count, setcount] = useState(0)
  const [formSRN, setFormSRN] = useState('');
  const navigate = useNavigate();

  // const getMinutesDiff = (dateString) => {
  //   const caseTime = dayjs(dateString, 'DD-MM-YYYY HH:mm:ss');
  //   const now = dayjs();
  //   return now.diff(caseTime, 'minute');
  // };

  const fetchData = async () => {
    // console.log("hiii");
    try {
      const req = await fetch(`${baseURL}/GetSRNList`);
      const response = await req.json();
      const data = response.dataItem;
      // console.log(data)
      setCasesTime(data.tat);
      setRsaStatus(data.rsaStatus)
      setActiveCases(data);
      const today = dayjs().format('DD-MM-YYYY');
      const filtered = data.filter(row =>
        dayjs(row.caseCreated_Date, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY') === today ||
        dayjs(row.caseCreated_Date, 'DD-MM-YYYY').format('DD-MM-YYYY') === today
      );
      setTodayCases(filtered);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleReload = () => {
    setcount(prev => prev + 1);
    toast.success("Data Reloading ")
  }

  useEffect(() => {
    // console.log(count)
    fetchData();
  }, [count]);

  useEffect(() => {
    if (search !== '' || todayCases !== '') {
      const result = todayCases.filter((row) =>
        row.srN_No?.toLowerCase().includes(search.toLowerCase()) ||
        row.customerMobileNo?.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(result);
    } else {
      setFilterData([]);
    }
  }, [search, todayCases]);

  useEffect(() => {
    // search cancelled cases SRN
    if (recallCancelledSearch !== '') {
      const cancelledCasesList = data
        .filter(row => row.srN_Remark === "Case Cancelled" || row.srN_Remark === "Service Recalled")
        .filter((row) =>
          row.srN_No?.toLowerCase().includes(recallCancelledSearch.toLowerCase()) ||
          row.customerMobileNo?.toLowerCase().includes(recallCancelledSearch.toLowerCase())
        );

      setFilterCancelledCases(cancelledCasesList);
    } else {
      const cancelledCasesList = data.filter(row => row.srN_Remark === "Case Cancelled" || row.srN_Remark === "Service Recalled");
      setFilterCancelledCases(cancelledCasesList);
    }
    // search Completed or recalled cases SRN
    if (comSearch !== '') {
      setCompleted(data.filter(row => row.srN_Remark === "Ongoing" && row.rsaStatus === "Case Completed")
        .filter((row) =>
          row.srN_No?.toLowerCase().includes(comSearch.toLowerCase()) ||
          row.customerMobileNo?.toLowerCase().includes(comSearch.toLowerCase())
        ));
    } else {
      setCompleted(data.filter(row => row.srN_Remark === "Ongoing" && row.rsaStatus === "Case Completed"));
    }

    // search Escalated  cases SRN
    // setEscalated(data.filter(row => row.vendorName !== '' && row.rsaStatus !== "Case Completed" && row.srN_Remark === "Ongoing" && row.tat >= 8)
    //   .filter(row => row.srN_No?.toLowerCase().includes(escSearch.toLowerCase()) ||
    //     row.customerMobileNo?.toLowerCase().includes(escSearch.toLowerCase())
    //   )
    // );
    if (escSearch !== '') {
      const searchFilteredData = data.filter(row => {
        const tat = Number(row.tat ?? 0);
        const reachedTAT = Number(row.reachTAT ?? 0);
        const reachComTAT = Number(row.reachCompleteTAT ?? 0);
        const drop_TAT = Number(row.dropTAT ?? 0);
        const drop_Com_TAT = Number(row.dropCompleteTAT ?? 0);

        const condition_esc1 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && row.rsaStatus !== 'Case Completed' && row.srN_Remark === "Ongoing" && tat > 7;
        const condition_esc2 = row.serviceDrop_IncidentType === "TOWING" && row.srN_Remark === "Ongoing" && row.rsaStatus === 'On the way to Incident' && (reachedTAT >= 60);
        const condition_esc3 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && (reachComTAT >= 60);
        const condition_esc4 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "On the way to drop" && row.srN_Remark === "Ongoing" && (drop_TAT >= 60);
        const condition_esc5 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus !== "Drop Completed" && row.srN_Remark === "Ongoing" && (drop_Com_TAT >= 60);
        const condition_esc6 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && (!row.rsaStatus || row.rsaStatus.trim() === "") && row.srN_Remark === "Ongoing" && (tat > 7 || reachedTAT >= 60);

        const condition_esc8 = row.serviceDrop_IncidentType === "RSR" && row.vendorName !== '' && ((!row.rsaStatus || row.rsaStatus.trim() === "") && row.rsaStatus !== 'Case Completed') && row.srN_Remark === "Ongoing" && (tat > 7);
        const condition_esc7 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "On the way to Incident" && row.srN_Remark === "Ongoing" && reachedTAT >= 45;
        const condition_esc9 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && reachComTAT >= 45;

        return (
          (condition_esc1 && (condition_esc2 || condition_esc3 || condition_esc4 || condition_esc5 || condition_esc6) || condition_esc7 || condition_esc8 || condition_esc9) &&

          (row.srN_No?.toLowerCase().includes(escSearch.toLowerCase()) || row.customerMobileNo?.toLowerCase().includes(escSearch.toLowerCase()))
        );
      });

      setEscalated(searchFilteredData);
    } else {
      let filteredData = data.filter(row => {
        const tat = Number(row.tat ?? 0);
        const reachedTAT = Number(row.reachTAT ?? 0);
        const reachComTAT = Number(row.reachCompleteTAT ?? 0);
        const drop_TAT = Number(row.dropTAT ?? 0);
        const drop_Com_TAT = Number(row.dropCompleteTAT ?? 0);

        const condition_esc1 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && row.rsaStatus !== 'Case Completed' && row.srN_Remark === "Ongoing" && tat > 0;
        const condition_esc2 = row.serviceDrop_IncidentType === "TOWING" && row.srN_Remark === "Ongoing" && row.rsaStatus === 'On the way to Incident' && (reachedTAT >= 60);
        const condition_esc3 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && (reachComTAT >= 60);
        const condition_esc4 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "On the way to drop" && row.srN_Remark === "Ongoing" && (drop_TAT >= 60);
        const condition_esc5 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus !== "Drop Completed" && row.srN_Remark === "Ongoing" && (drop_Com_TAT >= 60);
        const condition_esc6 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && (!row.rsaStatus || row.rsaStatus.trim() === "") && row.srN_Remark === "Ongoing" && (tat > 7 || reachedTAT >= 60);

        const condition_esc8 = row.serviceDrop_IncidentType === "RSR" && row.vendorName !== '' && (!row.rsaStatus || row.rsaStatus.trim() === "") && row.srN_Remark === "Ongoing" && (tat > 7);
        const condition_esc7 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "On the way to Incident" && row.srN_Remark === "Ongoing" && reachedTAT >= 45;
        const condition_esc9 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && reachComTAT >= 45;

        // return condition_esc7 || condition_esc8 || condition_esc9;
        return (condition_esc1 && (condition_esc2 || condition_esc3 || condition_esc4 || condition_esc5 || condition_esc6) || condition_esc8 || condition_esc7 || condition_esc9);
      });
      setEscalated(filteredData);
    }

    // search Follow-up  cases SRN
    // setAssigned(data.filter(row => row.vendorName !== '' && row.srN_Remark === "Ongoing" && row.rsaStatus !== "Case Completed")
    //   .filter(row => row.srN_No?.toLowerCase().includes(followsearch.toLowerCase()) ||
    //     row.customerMobileNo?.toLowerCase().includes(followsearch.toLowerCase())
    //   ));

    if (followsearch !== '') {
      const followFilteredData = data.filter(row => {
        const tat = Number(row.tat ?? 0);
        const reachTAT = Number(row.reachTAT ?? 0);
        const reachComTAT = Number(row.reachCompleteTAT ?? 0);
        // const dropTAT__ = Number(row.dropTAT ?? 0);
        const dropCom_TAT = Number(row.dropCompleteTAT ?? 0);

        const condition1 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && tat <= 8 && row.rsaStatus !== 'Case Completed' && row.srN_Remark === "Ongoing";
        const condition2 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && ((tat < 8 && isNaN(reachTAT)) || (tat < 8 && reachTAT <= 60));
        const condition3 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "on the way to incident" && row.srN_Remark === "Ongoing" && (reachTAT <= 60 && isNaN(reachComTAT));
        const condition4 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "On the way to drop" && row.srN_Remark === "Ongoing" && (reachComTAT <= 60);
        const condition5 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Drop Completed" && row.srN_Remark === "Ongoing" && (dropCom_TAT <= 60);

        const condition6 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "On the way to Incident" && row.srN_Remark === "Ongoing" && (reachTAT <= 45);
        const condition7 = row.serviceDrop_IncidentType === "RSR" && row.vendorName !== '' && ((!row.rsaStatus || row.rsaStatus.trim() === "") && row.rsaStatus !== 'Case Completed') && row.srN_Remark === "Ongoing" && (tat <= 7);
        const condition8 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && (reachComTAT <= 45);

        return (
          (condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8) &&
          (
            row.srN_No?.toLowerCase().includes(followsearch.toLowerCase()) ||
            row.customerMobileNo?.toLowerCase().includes(followsearch.toLowerCase())
          )
        );
      });

      setAssigned(followFilteredData);
    } else {
      const filteredData2 = data.filter(row => {
        const tat = Number(row.tat ?? 0);
        const reachTAT = Number(row.reachTAT ?? 0);
        const reachComTAT = Number(row.reachCompleteTAT ?? 0);
        const dropTAT = Number(row.dropTAT ?? 0);
        const dropCom_TAT = Number(row.dropCompleteTAT ?? 0);

        const condition1 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && row.rsaStatus !== 'Case Completed' && row.srN_Remark === "Ongoing" && (tat <= 8 && isNaN(reachTAT));
        // const condition_esc6 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && (!row.rsaStatus || row.rsaStatus.trim() === "") && row.srN_Remark === "Ongoing" && (tat > 7 || reachedTAT >= 60);

        const condition2 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && (!row.rsaStatus || row.rsaStatus.trim() === "") && row.srN_Remark === "Ongoing" && (tat <= 7);
        const condition3 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "On the way to Incident" && row.srN_Remark === "Ongoing" && (reachTAT <= 60);
        const condition4 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && (reachComTAT <= 60);
        const condition5 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "On the way to drop" && row.srN_Remark === "Ongoing" && (dropTAT <= 60);
        const condition6 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Drop Completed" && row.srN_Remark === "Ongoing" && (dropCom_TAT <= 60);

        const condition7 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "On the way to Incident" && row.srN_Remark === "Ongoing" && (reachTAT <= 45);
        const condition8 = row.serviceDrop_IncidentType === "RSR" && row.vendorName !== '' && (!row.rsaStatus || row.rsaStatus.trim() === "") && row.srN_Remark === "Ongoing" && (tat <= 7);
        const condition9 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && (reachComTAT <= 45);

        return condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8 || condition9;
      });

      setAssigned(filteredData2);
    }
    // follow up backup
    // if (followsearch !== '') {
    //   const followFilteredData = data.filter(row => {
    //     const tat = Number(row.tat);
    //     const reachTAT = Number(row.reachTAT);
    //     const reachComTAT = Number(row.reachCompleteTAT);
    //     const dropsTAT = Number(row.dropTAT);
    //     const dropCom_TAT = Number(row.dropCompleteTAT);

    //     const condition1 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && tat <= 8 && row.rsaStatus !== 'Case Completed' && row.srN_Remark === "Ongoing";

    //     const condition2 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && ((tat < 8 && reachTAT == '') || (tat < 8 && reachTAT <= 60));

    //     const condition3 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "on the way to incident" && row.srN_Remark === "Ongoing" && (reachTAT <= 60 && reachComTAT == '');

    //     const condition4 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "On the way to drop" && row.srN_Remark === "Ongoing" && (reachComTAT <= 60);

    //     const condition5 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Drop Completed" && row.srN_Remark === "Ongoing" && (dropCom_TAT <= 60);

    //     // const condition4 = row.serviceDrop_IncidentType === "RSR" && row.vendorName !== '' && tat <= 7 && row.rsaStatus !== 'Case Completed' && row.srN_Remark === "Ongoing";

    //     // const condition5 = row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "Reached at Incident location" && reachTAT <= 45 && row.srN_Remark === "Ongoing";

    //     return condition1 || condition2 || condition3 || condition4;
    //     // || condition4 || condition5;
    //   }).filter(row => row.srN_No?.toLowerCase().includes(followsearch.toLowerCase()) ||
    //     row.customerMobileNo?.toLowerCase().includes(followsearch.toLowerCase())
    //   );
    //   setAssigned(followFilteredData);
    // } else {
    //   const filteredData2 = data.filter(row => {
    //     const tat = Number(row.tat);
    //     const reachTAT = Number(row.reachTAT);
    //     const reachComTAT = Number(row.reachCompleteTAT);
    //     const dropTAT = Number(row.dropTAT);
    //     const dropCom_TAT = Number(row.dropCompleteTAT);

    //     const condition1 = (row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && row.rsaStatus !== 'Case Completed' && row.srN_Remark === "Ongoing") && (tat <= 8 && reachTAT == '');
    //     // const condition2 = row.serviceDrop_IncidentType === "TOWING" && row.srN_Remark === "Ongoing" && row.rsaStatus === '' && (tat < 8);

    //     const condition3 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && row.rsaStatus === "On the way to Incident" && row.srN_Remark === "Ongoing" && (reachTAT <= 60 && reachComTAT == '');

    //     const condition4 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing" && (reachComTAT <= 60 && dropTAT == '');

    //     const condition5 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && row.rsaStatus === "On the way to drop" && row.srN_Remark === "Ongoing" && (dropTAT <= 60 && dropCom_TAT == '');

    //     const condition6 = row.serviceDrop_IncidentType === "TOWING" && row.vendorName !== '' && row.rsaStatus === "Drop Completed" && row.srN_Remark === "Ongoing" && (dropCom_TAT <= 60);
    //     return condition1 || condition3 || condition4 || condition5 || condition6;

    //     // const condition3 = row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "on the way to incident" && row.srN_Remark === "Ongoing" && (reachTAT <= 45 && reachComTAT == '');
    //     // const condition3 = (row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing") && ((tat <= 8 && reachTAT == '') || (tat <= 8 && reachTAT <= 60));

    //     // const condition4 = (row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "On the way to drop" && row.srN_Remark === "Ongoing") && ((tat <= 8 && reachTAT == '') || (tat <= 8 && reachTAT <= 60));

    //     // const condition5 = (row.serviceDrop_IncidentType === "TOWING" && row.rsaStatus === "Drop Completed" && row.srN_Remark === "Ongoing") && dropTAT < 60;

    //     // const condition6 = (row.serviceDrop_IncidentType === "RSR" && row.vendorName !== '' && row.rsaStatus !== 'Case Completed' && row.srN_Remark === "Ongoing") && tat <= 7;

    //     // const condition7 = (row.serviceDrop_IncidentType === "RSR" && row.rsaStatus === "Reached at Incident location" && row.srN_Remark === "Ongoing") && reachTAT <= 45;

    //     // || condition2
    //     // condition4 || condition5 || condition6 || condition7;
    //   });
    //   setAssigned(filteredData2);
    // }

    if (mysearch !== '') {
      setMycases(data.filter(row => row.assigned_AgentId === agent)
        .filter(row => row.srN_No?.toLowerCase().includes(mysearch.toLowerCase()) ||
          row.customerMobileNo?.toLowerCase().includes(mysearch.toLowerCase())
        ));
    } else {
      setMycases(data.filter(row => row.assigned_AgentId === agent))
    }
  }, [recallCancelledSearch, comSearch, escSearch, followsearch, mysearch, data, casesTime, rsaStatus]);

  useEffect(() => {
    fetchSRNData();
  }, [formSRN])

  useEffect(() => {
  }, [escSearch]);

  const handleSearchCases = (srn) => {
    console.log(srn,"srnNumberformsearch")
    // navigate(`/createTickets/:${srn}` );
    setFormSRN(srn)
  }

    const storedServiceType = localStorage.getItem("serviceType");


  const fetchSRNData = async () => {
    if (!formSRN) {
      return;
    }
    try {
      let url = ``;
      let hUrl = ``;
      if (formSRN !== '') {
        url = `${baseURL}/GetSRNData`;
        hUrl = `${baseURL}/GetSRN_History`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ srN_No: formSRN }),
        });

        const response_h = await fetch(hUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ srN_No: formSRN }),
        });

        const result = await response.json();
        const hResult = await response_h.json();

        if (result.status && result.dataItem && result.dataItem.length > 0) {
          const data = result.dataItem[0];
          const summaryData = (hResult.dataItems && hResult.dataItems.length > 0) ? hResult.dataItems[0] : '';
          const count = 0;
          let expandPanel = null;
          if (!data.incident_Location?.trim()) {
            expandPanel = 'open3';
            // count = 'Complete Details';
          } else if (!data.serviceDrop_IncidentType?.trim()) {
            expandPanel = 'open4';
            // count = 'Complete Details';
          }
         else if (
            data?.caseType === "Complete-Enquiry" ||
            data?.caseType === "Case Denied" ||
            data?.caseType === "Case Cancelled"
          ) {
            expandPanel = "open4";
          }
           else if (!data.vtoL_KM?.trim()) {
            expandPanel = "open5";
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
            // expandPanel = 'open8';
            // count = '6';
          }
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
    } catch (error) {
      console.log('error fetching data', error);
    }
  };

  return {
    activeCases,
    // todayCases,
    search,
    setSearch,
    mysearch, setMysearch,
    filterData,
    mycases,
    assigned,
    cancelledCases,
    completed,
    escalated,
    followsearch,
    setFollowsearch,
    setRecallCancelledSearch,
    recallCancelledSearch,
    comSearch, setComSearch,
    escSearch, setEscSearch,
    filterCancelledCases,
    handleReload,
    handleSearchCases,
    setCancelledCases,
  };
}

export default ActiveCasesHook
