// assets
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// icons
const icons = {
    ReceiptLongIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const TermsCondition = {
  id: 'terms&condition',
  type: 'group',
  children: [
    {
      id: 'terms&condition',
      title: 'Terms&Condition',
      type: 'item',
      url: '/terms&condition',
      icon: icons.ReceiptLongIcon,
      // breadcrumbs: false
    }
  ]
};

export default TermsCondition;
