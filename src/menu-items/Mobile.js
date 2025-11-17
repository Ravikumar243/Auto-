// assets
import { DashboardOutlined } from '@ant-design/icons';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
// icons
const icons = {
  DashboardOutlined,DirectionsBikeOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Mobile = {
  id: 'mobile',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'mobile',
      title: 'Mobile',
      type: 'item',
      url: '/mobile',
      icon: icons.DirectionsBikeOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default Mobile;
