// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';
import ReduceCapacityOutlinedIcon from '@mui/icons-material/ReduceCapacityOutlined';
// icons
const icons = {
  VideoCameraAddOutlined,ReduceCapacityOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const wellness = {
  id: 'wellness',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'wellness',
      title: 'Wellness',
      type: 'item',
      url: '/wellness',
      icon: icons.ReduceCapacityOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default wellness;
