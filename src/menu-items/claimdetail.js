// assets
import { DashboardOutlined } from '@ant-design/icons';
import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';
// icons
const icons = {
  DashboardOutlined,FilterFramesOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const claimdetail = {
  id: 'claimdetail',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'claimdetail',
      title: 'Claim Detail',
      type: 'item',
      url: '/claimdetail',
      icon: icons.FilterFramesOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default claimdetail;
