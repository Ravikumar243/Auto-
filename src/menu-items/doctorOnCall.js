// assets
import { DashboardOutlined } from '@ant-design/icons';
import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';
// icons
const icons = {
  DashboardOutlined,FilterFramesOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const doctorOnCall = {
  id: 'doctorOnCall',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'doctorOnCall',
      title: 'Doctor On Call',
      type: 'item',
      url: '/doctorOnCall',
      icon: icons.FilterFramesOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default doctorOnCall;
