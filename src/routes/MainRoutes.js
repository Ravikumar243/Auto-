
// project import
import MainLayout from 'layout/MainLayout';
// import Login from 'pages/authentication/Login';
import DashboardDetails from 'pages/extra-pages/deshboard/DashboardDetails'
import CreateCustomerTicket from 'pages/extra-pages/customer/Index'
import UploadDetails from 'pages/extra-pages/upload-details/UploadDetails'
// import SearchCustomerTickets from 'pages/extra-pages/searchDetails/index'
//import RSAdetail from 'pages/extra-pages/RSA/RSAdetail';
// import AssignRole from 'pages/extra-pages/subAgent/AssignRole';
// import PoliciesSold from 'pages/extra-pages/sold_policies/PoliciesSold';
// import Claimdetail from 'pages/extra-pages/subAgent/claimDetail';
// import CreateAgent from 'pages/extra-pages/subAgent/createAgent';
// import CreateInsurer from 'pages/extra-pages/subAgent/createInsurer';
// import ClaimDetailpage from 'pages/extra-pages/travel/claimdetailpage';
// import Traveldetail from 'pages/extra-pages/travel/Traveldetail';
// import { element } from 'prop-types';
import ReportMis from '../pages/extra-pages/misDeshboard/ReportMis'
import Index from '../pages/extra-pages/searchDetails/Index'
import SlnDeshboard from '../pages/extra-pages/slnDeshboard/SlnDeshboard';
import Networkdetails from './../pages/extra-pages/networkdetails/networkdetails'
import VcrfRecord from '../pages/extra-pages/Vcrf/VcrfRecord';
import FeedbackRecord from '../pages/extra-pages/Vcrf/FeedbackRecord';
import UploadCItys from 'pages/extra-pages/upload-city/Upload-Citys';
import UploadMakes from 'pages/extra-pages/upload-Make/UploadMakes';
import UploadCItysHooks from 'pages/extra-pages/upload-city/UploadCItysHooks';
import CreateUser from 'pages/extra-pages/create-user/CreateUser';
import SpinneyData from 'pages/extra-pages/Vcrf/SpinneyData';
import { element } from 'prop-types';
import { OldMisUpload } from 'pages/extra-pages/misDeshboard/OldMisUpload';
import ViewPage from 'pages/extra-pages/Viewpage/ViewPage';
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // {
    //   path: '/',
    //   element: <Login />
    // },
    {
      path: 'dashboarddetails',
      element: <DashboardDetails />
    },
    {
      path: 'createTickets',
      element: <CreateCustomerTicket />
    },
    {
      path: 'createTickets/:srnId',
      element: <CreateCustomerTicket />
    },
    {
      path: 'UploadDetails',
      element: <UploadDetails />
    },
    {
      path: 'Index',
      element: <Index />
    },
    // {
    //   path: 'searchTickets',
    //   element: <SearchCustomerTickets />
    // },
    {
      path: 'account',
      element: '',
    },
    // {
    //   path: 'RSA',
    //   element: <RSAdetail />
    // },
    {
      path: 'mobile',
      element: '',
    },

    {
      path: 'wellness',
      element: '',
    },
    {
      path: 'misreport',
      element: <ReportMis />,
    },
    {
      path: 'slnDeshboard',
      element: <SlnDeshboard />,
    },
    {
      path: 'netwokDetails',
      element: <Networkdetails />,
    },
    {
      path: 'create-user',
      element: <CreateUser />,
    },
    {
      path: 'vcrf-record',
      element: <VcrfRecord />,
    },
    {
      path: 'old-mis-upload',
      element : <OldMisUpload/>
    },
    {
      path: "view-page",
      element: <ViewPage/>
    },
    {
      path: 'Feedback',
      element: <FeedbackRecord />,
    },
    {
      path: 'spinny-data',
      element: <SpinneyData />,
    },
    {
      path: 'uploderstatecity',
      element: <UploadCItys />,
    },
     {
      path: 'uploderMakemodels',
      element: <UploadMakes />,
    },
    // {
    //   path: 'doctorOnCall',
    //   element: <DoctoronCalldetail />
    // },
    // {
    //   path: 'travel',
    //   element: <Traveldetail />
    // },
    // {
    //   path: 'airtelPayementBank',
    //   element: '',
    // },
    // {
    //   path: 'policy',
    //   element: <PoliciesSold />
    // },
    // {
    //   path: 'claimdetail/:userId',
    //   element: <ClaimDetailpage />
    // },
    // {
    //   path: 'customer-detail',
    //   element: < CustomerDetail />
    // },
    // {
    //   path: 'create-agent',
    //   element: <CreateAgent />
    // },
    // {
    //   path: 'create-insurer',
    //   element: <CreateInsurer />
    // },

    // {
    //   path: 'assign-role',
    //   element: <AssignRole />
    // },
    // {
    //   path: 'claimList',
    //   element: <Claimdetail />
    // },
  ]
};

export default MainRoutes;
