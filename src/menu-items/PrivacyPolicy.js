// assets
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
// icons
const icons = {
    SafetyCheckIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const privacypolicy = {
  id: 'privacypolicy',
  type: 'group',
  children: [
    {
      id: 'privacypolicy',
      title: 'Privacy Policy',
      type: 'item',
      url: '/privacypolicy',
      icon: icons.SafetyCheckIcon,
      // breadcrumbs: false
    }
  ]
};

export default privacypolicy;
