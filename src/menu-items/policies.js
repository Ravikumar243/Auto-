// assets
import { UserSwitchOutlined } from '@ant-design/icons';
import PolicyIcon from '@mui/icons-material/Policy';
// icons
const icons = {
    UserSwitchOutlined,
    PolicyIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const policy = {
  id: 'policy',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'policy',
      title: 'Policy',
      type: 'item',
      url: '/policy',
      icon: icons.PolicyIcon,
    //   breadcrumbs: false
    }
  ]
};

export default policy;
