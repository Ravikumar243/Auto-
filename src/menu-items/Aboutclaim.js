// assets
import InfoIcon from '@mui/icons-material/Info';
// icons
const icons = {
    InfoIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const ABoutclaim = {
  id: 'aboutclaim',
  type: 'group',
  children: [
    {
      id: 'aboutclaim',
      title: 'About Claim',
      type: 'item',
      url: '/aboutclaim',
      icon: icons.InfoIcon,
      // breadcrumbs: false
    }
  ]
};

export default ABoutclaim;
