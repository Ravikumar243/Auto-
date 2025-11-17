import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Login from 'pages/authentication/Login';
import Messagge from '../pages/extra-pages/messagges/Messagges';
import MessageCustomer from '../pages/extra-pages/messageCustomer/MessageCustomer'
import MessageliveLocation from '../pages/extra-pages/messageliveLocation/MessageliveLocation'
import LiveTracking from 'pages/extra-pages/messageliveLocation/LiveTracking';
import VendorLiveTracking from 'pages/extra-pages/messageCustomer/VendorLiveTracking';
// render - login
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Login />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
     {
      path: 'trackingLocation',
      element: <Messagge />
    },{
      path: 'trackingMapLocation',
      element: <MessageCustomer />
    },
    {
      path: 'livelocationTowingcar',
      element: <MessageliveLocation />
    },
    {
      path: 'live-tracking',
      element: <LiveTracking />
    },
    {
      path: 'vendor-live-tracking',
      element: <VendorLiveTracking />
    },
  ]
};

export default LoginRoutes;
