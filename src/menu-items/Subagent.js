// assets
// import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// icons
const icons = {
  SupportAgentIcon
};

const createAgent = {
  id: 'createAgent',
  type: 'group',
  children: [
    {
      id: 'createAgent',
      title: 'Create Agent',
      type: 'item',
      url: '/create-agent',
      icon: icons.SupportAgentIcon,
    }
  ]
};

export default createAgent;
