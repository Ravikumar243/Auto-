import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import avatar1 from 'assets/images/users/demo.jpg';
import { LogoutOutlined } from '@ant-design/icons';
import SyncLockOutlinedIcon from '@mui/icons-material/SyncLockOutlined';
// import { baseURLProd } from 'api/api';
import {
  // toast, 
  ToastContainer
} from 'react-toastify';
// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};


// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();

  const handleLogout = async () => {
    window.location.assign('/')
  };
  const [passwordopen, setpasswordOpen] = useState(false)

  const handleChangePassword = async () => {
    // window.location.assign('/changepassword')
    setpasswordOpen(true)

  };

  const handlepasswordclose = () => {
    setpasswordOpen(false)
  }
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };


  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setCurrentPassword("")
    setNewPassword("")

  };
 
  const userEmail = localStorage.getItem("userEmail");


  const iconBackColorOpen = 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">{userEmail} </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <ToastContainer />
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />

                            <Stack>
                              <Typography variant="h6">{userEmail}</Typography>
                              {/* <Typography variant="body2" color="textSecondary">
                                UI/UX Designer
                              </Typography> */}
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton size="large" color="secondary" onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Typography variant="h6">Change Password</Typography>
                        </Grid>
                        <Grid item>
                          <IconButton size="large" color="secondary" onClick={handleChangePassword}>
                            <SyncLockOutlinedIcon />
                          </IconButton>
                          <Dialog open={passwordopen} onClose={handlepasswordclose}>
                            <DialogTitle className='editTitle'>Change Password</DialogTitle>
                            <DialogContent>
                              <Grid className='changepassinnerdiv my-4 '>
                                <Grid item >
                                  <TextField
                                    margin="dense"
                                    label="Current Password"
                                    type="text"
                                    name="currentPassword"
                                    fullWidth
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className='editInputField'
                                  />
                                  <TextField
                                    margin="dense"
                                    label="New Password"
                                    type="text"
                                    name="newPassword"
                                    fullWidth
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className='editInputField'
                                  />
                                </Grid>
                              </Grid >
                            </DialogContent>
                            <DialogActions className='editButtonDiv'>
                              <Button onClick={handleClose} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
                                Cancel
                              </Button>
                              <Button
                                // onClick={handleSubmit} 
                                className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
                                Submit
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
