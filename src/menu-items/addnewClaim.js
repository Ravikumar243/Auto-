// assets
import AddModeratorIcon from '@mui/icons-material/AddModerator';
// icons
const icons = {
    AddModeratorIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Addnewclaim = {
  id: 'addnewclaim',
  type: 'group',
  children: [
    {
      id: 'addnewclaim',
      title: 'Addnew Claim',
      type: 'item',
      url: '/addnewclaim',
      icon: icons.AddModeratorIcon,
      // breadcrumbs: false
    }
  ]
};

export default Addnewclaim;
