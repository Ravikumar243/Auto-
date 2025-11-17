import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  // MenuItem,
  OutlinedInput,
  // Select,
  Stack,
  Typography,
  // FormControl
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
// import { baseURLProd } from 'api/api';
import baseURL from "../../../api/autoApi";
import { toast } from 'react-toastify';

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setForgetPassword(!forgetPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = async (values, setStatus, setSubmitting, setErrors) => {
    try {
      const { email, password } = values;

      const payload = { email, password };


      const response = await fetch(`${baseURL}/CRMLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        
        localStorage.setItem("userInfo", JSON.stringify(data));

        localStorage.setItem("userEmail", email);
        toast.success(data.message || "Login Successful");
        
        if (data.role === "Admin") {
          navigate("/dashboarddetails");
        } else if (data.role === "Agent") {
          navigate("/dashboarddetails");
        }

        setStatus({ success: true });
      } else {
        throw new Error(data.message || "Invalid credentials");
      }

      setSubmitting(false);
    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        role: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
        handleLogin(values, setStatus, setSubmitting, setErrors);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} className="formdiv">
            {!forgetPassword ? (
              <>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Email</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      className="emailInput"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password-login"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      className="emailInput"
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password-login"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* <Grid item xs={12}>
                  <Stack spacing={1}>
                  <FormControl className='selectROLEForm mt-2'>
                    <InputLabel id="select-Role">Role</InputLabel>
                    <Select
                      labelId="select-label"
                      value={values.role}
                      name="role"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className='loginselct'
                      error={Boolean(touched.role && errors.role)}
                    >
                      <MenuItem value="Agent">Admin</MenuItem>
                      <MenuItem value="Sub Agent">Super Admin</MenuItem>
                    </Select>
                    </FormControl>
                    {touched.role && errors.role && (
                      <FormHelperText error>{errors.role}</FormHelperText>
                    )}
                  </Stack>
                </Grid> */}
                <Grid item xs={12} sx={{ mt: -1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography
                      component={Link}
                      to="#"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                      color="primary"
                      onClick={toggleForm}
                    >
                      Forget Password?
                    </Typography>
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="loginBtn"
                  >
                    Login
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h4">Forget Password</Typography>
                    <p className="mt-3">
                      Enter your registered email to receive the reset password
                      link
                    </p>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Email</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      className="emailInput"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="loginBtn2"
                  >
                    Send Reset Password Link
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   Button,
//   FormHelperText,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   Stack,
//   Typography,
//   FormControl
// } from '@mui/material';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// const AuthLogin = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [forgetPassword, setForgetPassword] = useState(false);
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setForgetPassword(!forgetPassword);
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleLogin = async (values, setStatus, setSubmitting, setErrors) => {
//     try {
//       const credentials = {
//         admin: { email: 'admin@example.com', password: 'admin123' },
//         agent: { email: 'agent@example.com', password: 'agent123' },
//         // customer: { email: 'customer@example.com', password: 'customer123' },
//       };

//       const { email, password, role } = values;

//       if (credentials[role] && credentials[role].email === email && credentials[role].password === password) {
//         localStorage.setItem('userRole', role);

//         switch (role) {
//           case 'admin':
//             navigate('/travel');
//             break;
//           case 'agent':
//             navigate('/travel');
//             break;
//           // case 'customer':
//           //   navigate('/customer-detail');
//           //   break;
//           default:
//             throw new Error('Invalid role');
//         }
//         setStatus({ success: true });
//       } else {
//         throw new Error('Invalid credentials');
//       }

//       setSubmitting(false);
//     } catch (error) {
//       setStatus({ success: false });
//       setErrors({ submit: error.message });
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         email: '',
//         password: '',
//         role: '',
//         submit: null,
//       }}
//       validationSchema={Yup.object().shape({
//         email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//         password: Yup.string().max(255).required('Password is required'),
//         role: Yup.string().required('Role is required'),
//       })}
//       onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
//         handleLogin(values, setStatus, setSubmitting, setErrors);
//       }}
//     >
//       {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
//         <form noValidate onSubmit={handleSubmit}>
//           <Grid container spacing={3} className="formdiv">
//             {!forgetPassword ? (
//               <>

//                 <Grid item xs={12}>
//                   <Stack spacing={1}>
//                     <InputLabel htmlFor="email-login">Email</InputLabel>
//                     <OutlinedInput
//                       id="email-login"
//                       type="email"
//                       value={values.email}
//                       name="email"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       placeholder="Enter email address"
//                       fullWidth
//                       error={Boolean(touched.email && errors.email)}
//                       className="emailInput"
//                     />
//                     {touched.email && errors.email && (
//                       <FormHelperText error id="standard-weight-helper-text-email-login">
//                         {errors.email}
//                       </FormHelperText>
//                     )}
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Stack spacing={1}>
//                     <InputLabel htmlFor="password-login">Password</InputLabel>
//                     <OutlinedInput
//                       fullWidth
//                       error={Boolean(touched.password && errors.password)}
//                       id="password-login"
//                       type={showPassword ? 'text' : 'password'}
//                       value={values.password}
//                       name="password"
//                       onBlur={handleBlur}
//                       className="emailInput"
//                       onChange={handleChange}
//                       endAdornment={
//                         <InputAdornment position="end">
//                           <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={handleClickShowPassword}
//                             onMouseDown={handleMouseDownPassword}
//                             edge="end"
//                             size="large"
//                           >
//                             {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                       placeholder="Enter password"
//                     />
//                     {touched.password && errors.password && (
//                       <FormHelperText error id="standard-weight-helper-text-password-login">
//                         {errors.password}
//                       </FormHelperText>
//                     )}
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Stack spacing={1}>
//                   <FormControl className='selectROLEForm mt-2'>
//                     <InputLabel id="select-Role">Role</InputLabel>
//                     <Select
//                       labelId="select-label"
//                       value={values.role}
//                       name="role"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       // fullWidth
//                       className='selectDiv2'
//                       error={Boolean(touched.role && errors.role)}
//                     >
//                       <MenuItem value="admin">Admin</MenuItem>
//                       <MenuItem value="agent">Super Admin</MenuItem>
//                       {/* <MenuItem value="customer">Customer</MenuItem> */}
//                     </Select>
//                     </FormControl>
//                     {touched.role && errors.role && (
//                       <FormHelperText error>{errors.role}</FormHelperText>
//                     )}
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: -1 }}>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//                     <Typography component={Link} to="#" variant="body1" sx={{ textDecoration: 'none' }} color="primary" onClick={toggleForm}>
//                       Forget Password?
//                     </Typography>
//                   </Stack>
//                 </Grid>
//                 {errors.submit && (
//                   <Grid item xs={12}>
//                     <FormHelperText error>{errors.submit}</FormHelperText>
//                   </Grid>
//                 )}
//                 <Grid item xs={12}>
//                   <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary" className="loginBtn">
//                     Login
//                   </Button>
//                 </Grid>
//               </>
//             ) : (
//               <>
//                 <Grid item xs={12}>
//                   <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
//                     <Typography variant="h4">Forget Password</Typography>
//                     <p className="mt-3">Enter your registered email to receive the reset password link</p>
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Stack spacing={1}>
//                     <InputLabel htmlFor="email-login">Email</InputLabel>
//                     <OutlinedInput
//                       id="email-login"
//                       type="email"
//                       value={values.email}
//                       name="email"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       placeholder="Enter email address"
//                       fullWidth
//                       error={Boolean(touched.email && errors.email)}
//                       className="emailInput"
//                     />
//                     {touched.email && errors.email && (
//                       <FormHelperText error id="standard-weight-helper-text-email-login">
//                         {errors.email}
//                       </FormHelperText>
//                     )}
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary" className="loginBtn2">
//                     Send Reset Password Link
//                   </Button>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default AuthLogin;
