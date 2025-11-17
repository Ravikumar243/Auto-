// assets
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
// icons
const icons = {
    AssignmentIndOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const assignrole = {
  id: 'assignrole',
  type: 'group',
  children: [
    {
      id: 'assignrole',
      title: 'Assign Role',
      type: 'item',
      url: '/assign-role',
      icon: icons.AssignmentIndOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default assignrole;
