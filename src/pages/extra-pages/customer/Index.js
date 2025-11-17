import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
} from '@mui/material';

// import CreateCustomerHooks from './createDetails/CreateCustomerHooks'

import Box from '@mui/material/Box';
// import { TextareaAutosize } from '@mui/base';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import CreateCustomerTicket from './createDetails/CreateCustomerTicket'
import AssistData from './assistData/AssistData';
import Paper from '@mui/material/Paper';
import Requestdetails from './requestDetails/Requestdetails';

import VendorSearch from './vendorSearch/VendorSearch'
import VendorDeatils from './vendorDetails/VendorDeatils'
import CostSearch from './costSearch/CostSearch';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import CompleteDeatils from './completeDeatils/CompleteDeatils';
import axios from 'axios';
import baseURL from 'api/autoApi';
import { useParams } from 'react-router-dom';
import { CustomerContext } from './createDetails/CreateCustomerHooks';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


const Index = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
    padding: '0px',
  };

  const steps = [
    'Search Company Data',
    'Assistance Data Entry',
    'Complete Details',
    'Service Request Details',
    'Vendor Search',
    'Vendor Details',
    'Cost Details',
  ];

  // const { formData, handleChange, handleChangedrop, handleSubmit,
  //   handleAccordionChange, open,
  //   handleFileChange, handleClose, expanded, setExpanded, generatedSRN, incidentStatus,
  //   handleIncidenceOpen, handleIncidenceClose, handleAssignClose,
  //   handleIncidentDetails, formAssistance,
  //   handleAssist, formIncident, setStepscount, handleService, formAssignVendorsDetails,
  //   handleServiceDetails, handleAssignvendorDetails, handleVendorAssign, completeDeatils, handleVendordetailsSubmit, handleDetailsModal, fetcdataListItems, cities, states, stateCode, handleCoordinates, stepsCount, assignVendorDeatls,
  //   handleStatus, formsrnStatus, vendorFetchList, userLatitude,
  //   userLongitude, formSrnStatus, vendor_Name, handleCostVendor, handleUploadAssist, formUploadAssist, 
  //   loading, handleInputChange, handleInput_Change, suggestions, suggestions_drop, handleSelect, handleSelectDrop, setFetcdataListItems, setGeneratedSRN, pickupCoordinates, handleVednoLoc_Change, suggestions_Vedor, handleSelectVendor,
  //   dLon, dLat, iLon, iLat, vLon, vLat, handleVendorDetailsFetch, inputVendor, setSelected, selected, handleNovendorAssign, historySrn, setHistorySrn, handleAssignSubmitClose, venderAssign, companylist, getallClaimData, handleChangeclaimdata, searchdata, handleClaimData, boolean, spinnerloading,
  //   handleSearchData, searchCompamyData, setUploadDetailsFrom, remarkLoading, remarkLogsData, setGetallClaimData, handleCmpanyAndSearchTearm, handleChangeCmpanyAndSearchTearm,
  //   companyAndSearchTearm, loadingTest, editable, setEditable, disabledFromStates, handleSync, handleSubmitAgentfeedback, stateList, citiesList, makeComaniesList, localVendorStateCity,handleLocalVendorChange, calculatedTotalAmount, calculatedTotalAmountWithGst, selectedRsaStatus, setFormSrnStatus, selectedVendorId,
  //   setSelectedVendorId, handleRecordSelect,multipleRecords,showPopup, setShowPopup,calculatedAmount, 
  // }
  //   = CreateCustomerHooks();

const {setUploadDetailsFrom, setExpanded, setFetcdataListItems,setHistorySrn,setGeneratedSRN, setStepscount,stepsCount, handleSubmit} = useContext(CustomerContext)
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      setUploadDetailsFrom([]);
      setExpanded("open");
      setFetcdataListItems([]);
      setHistorySrn("");
      return;
    }


    if (location.state.expandPanel) {


      setExpanded(location.state.expandPanel);
      setFetcdataListItems(location.state.ticketData);
      setGeneratedSRN(location.state.ticketData?.srN_No);
      setHistorySrn(location.state.historyStatus ?? "");
      switch (location.state.expandPanel) {
        case "open":
          setStepscount(0);
          break;
        case "open3":
          setStepscount(2);
          break;
        case "open4":
          setStepscount(3);
          break;
        case "open5":
          setStepscount(4);
          break;
        case "open6":
          setStepscount(5);
          break;
        case "open8":
          setStepscount(6);
          break;
        default:
          setStepscount(location.state.stepscounts ?? 0);
      }
    } else if (location.state.ticketData) {
      setUploadDetailsFrom([]);
      setExpanded("open");
      setFetcdataListItems(location.state.claimData);
      setHistorySrn("");
    } else if (location.state.uploadedDetails) {
      setUploadDetailsFrom(location.state.uploadedDetails);
      setGeneratedSRN("");
      setExpanded("open");
      setFetcdataListItems([]);
      setHistorySrn("");
    }
  }, [location.state]);



  return (
    <Grid className="container-fluid">
      <Box>
        <ToastContainer />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={stepsCount} alternativeLabel>

          {steps.map((count) => (
            <Step key={count}>
              <StepLabel>{count}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div className='my-3'>

        <form onSubmit={handleSubmit} className='mb-2' >

          {/* search company Data */}
          {/* <CreateCustomerTicket disabledFromStates={disabledFromStates} editable={editable} companyAndSearchTearm={companyAndSearchTearm} handleChangeCmpanyAndSearchTearm={handleChangeCmpanyAndSearchTearm} handleCmpanyAndSearchTearm={handleCmpanyAndSearchTearm} fetcdataListItems={fetcdataListItems} handleAccordionChange={handleAccordionChange} boolean={boolean} handleClaimData={handleClaimData} searchdata={searchdata} handleChangeclaimdata={handleChangeclaimdata} getallClaimData={getallClaimData} companylist={companylist} formData={formData} open={open} setStepscount={setStepscount} expanded={expanded} handleChange={handleChange} setExpanded={setExpanded} onClose={handleClose} style={style} handleSearchData={handleSearchData} searchCompamyData={searchCompamyData} setGetallClaimData={setGetallClaimData} handleRecordSelect={handleRecordSelect} multipleRecords={multipleRecords} showPopup={showPopup} setShowPopup={setShowPopup}/> */}
   <CreateCustomerTicket/>
   <AssistData/>
          {/* Assistance Data entry */}
          {/* <AssistData citiesList={citiesList} stateList={stateList} disabledFromStates={disabledFromStates} editable={editable} searchCompamyData={searchCompamyData} loadingTest={loadingTest} getallClaimData={getallClaimData} handleAccordionChange={handleAccordionChange} handleChangedrop={handleChangedrop} states={states} stateCode={stateCode}
            cities={cities} handleClaimData={handleClaimData} searchdata={searchdata} handleChangeclaimdata={handleChangeclaimdata} formData={formData} open={open} expanded={expanded} generatedSRN={generatedSRN} handleFileChange={handleFileChange} handleChange={handleChange} setExpanded={setExpanded} handleClose={handleClose} formAssistance={formAssistance} fetcdataListItems={fetcdataListItems} style={style} makeComaniesList={makeComaniesList}/> */}
        </form>


        {/* compleet details */}
        {/* <CompleteDeatils handleSync={handleSync} loadingTest={loadingTest} handleDetailsModal={handleDetailsModal} handleAccordionChange={handleAccordionChange} handleIncidenceOpen={handleIncidenceOpen} expanded={expanded} fetcdataListItems={fetcdataListItems} handleAssist={handleAssist} formAssistance={formAssistance} generatedSRN={generatedSRN} style={style} completeDeatils={completeDeatils} handleIncidentDetails={handleIncidentDetails} loading={loading} handleInputChange={handleInputChange} suggestions={suggestions} handleSelect={handleSelect} remarkLoading={remarkLoading} remarkLogsData={remarkLogsData} /> */}
       <CompleteDeatils/>

        {/*    Service Request Details  -->as per T sir     */}
        {/* <Requestdetails loadingTest={loadingTest} formData={formData} open={open} expanded={expanded} incidentStatus={incidentStatus} userLatitude={userLatitude} userLongitude={userLongitude} handleServiceDetails={handleServiceDetails} generatedSRN={generatedSRN} fetcdataListItems={fetcdataListItems} handleService={handleService} formIncident={formIncident} handleCoordinates={handleCoordinates} handleIncidenceOpen={handleIncidenceOpen} handleIncidenceClose={handleIncidenceClose} handleAccordionChange={handleAccordionChange} handleInput_Change={handleInput_Change} loading={loading} suggestions_drop={suggestions_drop} handleSelectDrop={handleSelectDrop} remarkLoading={remarkLoading} remarkLogsData={remarkLogsData} /> */}
        <Requestdetails/>

        {/* vendor search             */}
        {/* <VendorSearch handleSubmitAgentfeedback={handleSubmitAgentfeedback} loadingTest={loadingTest} spinnerloading={spinnerloading} inputVendor={inputVendor} venderAssign={venderAssign} handleAssignSubmitClose={handleAssignSubmitClose} handleNovendorAssign={handleNovendorAssign} handleVendorDetailsFetch={handleVendorDetailsFetch} setSelected={setSelected} selected={selected} dLon={dLon} dLat={dLat} iLon={iLon} iLat={iLat} vLon={vLon} vLat={vLat} handleSelectVendor={handleSelectVendor} handleVednoLoc_Change={handleVednoLoc_Change} loading={loading} suggestions_Vedor={suggestions_Vedor} pickupCoordinates={pickupCoordinates} formData={formData} formAssignVendorsDetails={formAssignVendorsDetails} userLatitude={userLatitude} handleVendorAssign={handleVendorAssign} userLongitude={userLongitude} vendorFetchList={vendorFetchList} fetcdataListItems={fetcdataListItems} open={open} generatedSRN={generatedSRN} vendor_Name={vendor_Name} expanded={expanded} incidentStatus={incidentStatus} handleAssignClose={handleAssignClose} handleAccordionChange={handleAccordionChange} style={style} assignVendorDeatls={assignVendorDeatls} handleAssignvendorDetails={handleAssignvendorDetails}  localVendorStateCity ={localVendorStateCity} handleLocalVendorChange ={handleLocalVendorChange} selectedVendorId={selectedVendorId}
    setSelectedVendorId={setSelectedVendorId}/> */}
    <VendorSearch/>


        {/* vendor Details             */}
        {/* <VendorDeatils loadingTest={loadingTest} historySrn={historySrn} formData={formData} fetcdataListItems={fetcdataListItems} formSrnStatus={formSrnStatus} open={open} expanded={expanded} handleVendordetailsSubmit={handleVendordetailsSubmit} handleStatus={handleStatus} handleAccordionChange={handleAccordionChange} handleClose={handleClose} handleService={handleService} formIncident={formIncident} generatedSRN={generatedSRN} remarkLoading={remarkLoading} remarkLogsData={remarkLogsData} selectedRsaStatus={selectedRsaStatus} setFormSrnStatus={setFormSrnStatus}/> */}
  <VendorDeatils/>

        {/* Cost Details */}
        {/* <CostSearch loadingTest={loadingTest} fetcdataListItems={fetcdataListItems} formData={formData} open={open} expanded={expanded} handleAccordionChange={handleAccordionChange} handleCostVendor={handleCostVendor} style={style} formsrnStatus={formsrnStatus} handleUploadAssist={handleUploadAssist} formUploadAssist={formUploadAssist}  calculatedAmount={calculatedAmount} calculatedTotalAmountWithGst={calculatedTotalAmountWithGst}/> */}
    <CostSearch/>

      </div>

    </Grid>
  )
}

export default Index
