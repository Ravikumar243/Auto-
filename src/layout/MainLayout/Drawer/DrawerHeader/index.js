import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import logo from 'assets/images/users/aaLogo.png'

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open} style={{paddingLeft:"0px"}}>
      <Stack spacing={1} alignItems="center" justifyContent='center'>
        <img alt='logo' src={logo} width='190px'/>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
