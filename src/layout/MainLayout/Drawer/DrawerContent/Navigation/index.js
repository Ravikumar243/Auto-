// // material-ui
// import { Box, Typography } from '@mui/material';

// // project import
// import NavGroup from './NavGroup';
// import menuItem from 'menu-items';

// // ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

// const Navigation = () => {
//   const navGroups = menuItem?.items?.map((item) => {
//     switch (item.type) {
//       case 'group':
//         return <NavGroup key={item.id} item={item} />;
//       default:
//         return (
//           <Typography key={item.id} variant="h6" color="error" align="center">
//             {/* Fix - Navigation Group */}
//           </Typography>
//         );
//     }
//   });

//   return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
// };

// export default Navigation;


// Navigation.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import NavGroup from './NavGroup';
import useMenuItems from 'menu-items'; // Import the custom hook

const Navigation = () => {
  const { items } = useMenuItems(); // Use the custom hook to get menu items

  if (!items || !Array.isArray(items)) {
    console.error('items is not defined or is not an array');
    return <Typography variant="h6" color="error" align="center">No menu items available</Typography>;
  }

  const navGroups = items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            {/* Fix - Navigation Group */}
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
