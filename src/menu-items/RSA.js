// assets
import { DashboardOutlined } from '@ant-design/icons';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
// icons
const icons = {
  DashboardOutlined,MonetizationOnOutlinedIcon,PriceChangeOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const RSA = {
  id: 'rsa',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'rsa',
      title: 'RSA ',
      type: 'item',
      url: '/RSA',
      icon: icons.PriceChangeOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default RSA;
