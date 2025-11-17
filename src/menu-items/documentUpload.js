// assets
import { UserSwitchOutlined } from '@ant-design/icons';
import UploadFileIcon from '@mui/icons-material/UploadFile';
const icons = {
    UserSwitchOutlined,UploadFileIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const documentUpload = {
  id: 'documentUpload',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'documentUpload',
      title: 'Upload Documents',
      type: 'item',
      url: '/documentUpload',
      icon: icons.UploadFileIcon,
    //   breadcrumbs: false
    }
  ]
};

export default documentUpload;
