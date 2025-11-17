// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
// ================================|| LOGIN ||================================ //
import image from 'assets/images/users/aaLogo.png'

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
    <img src={image} alt='logo' style={{width:"135px",display:"block",marginLeft:"auto",marginRight:"auto"}}/>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h2">Welcome to Across Assist</Typography>
          {/* <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            Don&apos;t have an account?
          </Typography> */}
        
        </Stack>
      </Grid>
      <Grid item xs={12} className='authLoginDiv'>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;
