// project import
// import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import ThemeRoutes from 'routes/index';
import { CustomerProvider } from 'pages/extra-pages/customer/createDetails/CreateCustomerHooks';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
     <CustomerProvider>
      <ThemeRoutes />
      </CustomerProvider>
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
