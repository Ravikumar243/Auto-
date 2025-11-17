
import policy from './policies';
import travel from './Travel';
import createAgent from './Subagent';
import privacypolicy from './PrivacyPolicy';
import TermsCondition from './Terms_condition';
// import assignrole from './Assignrole';
import createInsurer from './createInsurer';

const getRoleFromStorage = () => {
  return localStorage.getItem('ROLE');
};

const useMenuItems = () => {
  const role = getRoleFromStorage();

  let menuItems;

  if (role === 'Agent') {
    menuItems = {
      items: [travel, policy,privacypolicy,TermsCondition],
    };
  } else if (role === 'Sub Agent') {
    menuItems = {
      items: [ travel,
        //  policy ,
         createAgent,createInsurer
        //  ,assignrole,
        // privacypolicy,TermsCondition
      ],
    };
  }
   else {
    menuItems = {
      items: [travel],
    };
  }

  return menuItems;
};

export default useMenuItems;
