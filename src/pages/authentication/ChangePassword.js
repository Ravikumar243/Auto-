import React, { useState } from 'react'
import { Grid, Button, TextField } from '@mui/material'
// import { baseURLProd } from 'api/api'
import { toast,ToastContainer } from 'react-toastify'

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  // const [confirmPassword,setConfirmPassword] =useState('')

  // const handleSubmit = async () => {
  //   const req = await fetch(`${baseURLProd}ChangePassword`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       adminId: '123456', currentPassword: currentPassword
  //       , newPassword: newPassword
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   const res = await req.json();
  //   if(res.status == true){
  //     setCurrentPassword("")
  //     setNewPassword("")
  //     toast.success("password changed successfully")
  //   }
  // }
  return (
    <>
      <Grid className='changePassdiv'>
        <h4>Change Password</h4>
        <ToastContainer/>
        <Grid className='changepassinnerdiv my-4 '>
          <Grid item >
            <TextField
              // margin="dense"
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
          <Grid className='d-flex justify-content-center'>
            <Button className='btn btn-primary me-2'
              style={{ backgroundColor: '#EF9848', border: '0px' }}
              // onClick={handleSubmit}
              >Submit</Button>
          </Grid>
        </Grid >
      </Grid>
    </>
  )
}

export default ChangePassword
