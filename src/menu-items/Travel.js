// assets
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
// icons
const icons = {
  TravelExploreIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const travel = {
  id: 'travel',
  type: 'group',
  children: [
    {
      id: 'travel',
      title: 'Travel',
      type: 'item',
      url: '/travel',
      icon: icons.TravelExploreIcon,
      // breadcrumbs: false
    }
  ]
};

export default travel;
