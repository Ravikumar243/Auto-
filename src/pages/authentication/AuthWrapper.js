import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import image from 'assets/images/users/login.png'
// assets

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}className='loginBgdiv' >
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      // sx={{
      //   minHeight: '100vh'
      // }}
    >
      <Grid item xs={12} md={12} lg={12} className='d-flex'>
      <Grid item md={6} lg={6} sx={{ ml: 3, mt: 3 }} className="d-flex justify-content-center leftDiv">
      <img src={image} alt ='bg' width={380} height={475}/>

      </Grid>
      <Grid item xs={12} md={6} lg={6} className='d-flex justify-content-center'>
        <Grid
          item
          className='authwrapperDiv'
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
