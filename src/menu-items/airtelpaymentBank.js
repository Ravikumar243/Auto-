// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  VideoCameraAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const airtelPayementBank = {
  id: 'airtelPayementBank',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'airtelPayementBank',
      title: 'Airtel Payement Bank',
      type: 'item',
      url: '/airtelPayementBank',
      icon: icons.VideoCameraAddOutlined,
      // breadcrumbs: false
    }
  ]
};

export default airtelPayementBank;
