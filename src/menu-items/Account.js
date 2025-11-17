// assets
import { UserSwitchOutlined } from '@ant-design/icons';
// icons
const icons = {
    UserSwitchOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Account = {
  id: 'app-user',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'app-user-details',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: icons.UserSwitchOutlined,
    //   breadcrumbs: false
    }
  ]
};

export default Account;
