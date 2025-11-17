// assets
// import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
// icons
const icons = {
  GroupAddIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const createInsurer = {
  id: 'createInsurer',
  type: 'group',
  children: [
    {
      id: 'createInsurer',
      title: 'Create Insurer',
      type: 'item',
      url: '/create-insurer',
      icon: icons.GroupAddIcon,
      // breadcrumbs: false
    }
  ]
};

export default createInsurer;
