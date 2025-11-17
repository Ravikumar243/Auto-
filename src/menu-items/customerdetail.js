// assets
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// icons
const icons = {
    AccountCircleIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const customerdetail = {
  id: 'customer',
  type: 'group',
  children: [
    {
      id: 'customer',
      title: 'Customer Detail',
      type: 'item',
      url: '/customer-detail',
      icon: icons.AccountCircleIcon,
      // breadcrumbs: false
    }
  ]
};

export default customerdetail;
