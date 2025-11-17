import React from 'react'
import MainCard from 'components/MainCard';
import {
    Grid ,Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button
   ,Typography
} from '@mui/material';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Hook from '../travel/Hook';

const CustomerDetail = () => {
    const {  handleFileChange, preview,
      // , handlePreview, handleUpload,
        upload, handleCloseUpload, handleClosePreview,selectedRow } = Hook()
    const data = [
        {
          userId: 'U001',
          name: 'Travel',
          mobile: 'John Doe',
          email: 'john.doe@example.com',
          password: 'Completed',
          dob: 'Accident / 2023-01-15',
          agency: 'Policy123',
          photo: 'demo.jpg',
          adhar: 'demo.jpg',
          signature: 'demo.jpg',
          receipt: 'demo.jpg',
        },
        {
          userId: 'U002',
          name: 'Medical',
          mobile: 'Jane Smith',
          email: 'jane.smith@example.com',
          password: 'Closed',
          dob: 'Fire / 2023-02-20',
          agency: 'Policy456',
          photo: 'demo.jpg',
          adhar: 'demo.jpg',
          signature: 'demo.jpg',
          receipt: 'demo.jpg',
    
        },
        {
          userId: 'U003',
          name: 'Travel',
          mobile: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          password: 'Open',
          dob: 'Theft / 2023-03-10',
          agency: 'Policy789',
          photo: 'demo.jpg',
          adhar: 'demo.jpg',
          signature: 'demo.jpg',
          receipt: 'demo.jpg',
    
        },
        {
          userId: 'U004',
          name: 'Travel',
          mobile: 'Bob Brown',
          email: 'bob.brown@example.com',
          password: 'Completed',
          dob: 'Natural Causes / 2023-04-05',
          agency: 'Policy101',
          photo: 'demo.jpg',
          adhar: 'demo.jpg',
          signature: 'demo.jpg',
          receipt: 'demo.jpg',
    
        },
        {
          userId: 'U005',
          name: 'Medical',
          mobile: 'Charlie Davis',
          email: 'charlie.davis@example.com',
          password: 'Cancelled',
          dob: 'Medical / 2023-05-25',
          agency: 'Policy112',
          photo: 'demo.jpg',
          adhar: 'demo.jpg',
          signature: 'demo.jpg',
          receipt: 'demo.jpg',
    
        }
      ];
    
    
      const column = [
        {
          name: 'Claim',
          selector: row => row.userId,
    
        },
        {
          name: "Claim Type",
          selector: row => row.name,
          //   width: '190px'
        },
        // {
        //   name: 'Name',
        //   selector: row => row.mobile,
        //   //   width: '150px'
        // },
        // {
        //   name: 'Client Name',
        //   selector: row => row.email,
        //   width: "240px"
        // },
        {
          name: 'Status',
          selector: row => row.password,
          //   width: "150px"
        },
        {
          name: 'Incident Type/Incident Date',
          selector: row => row.dob,
          width: "300px"
          
        },
        {
          name: 'Policy',
          selector: row => row.agency,
        },
        // {
        //   name: "Action",
        //   selector: row => {
        //     const status = row.password;
        //     return (
        //       <>
        //         {status == 'Completed' || status == 'Closed' ?
        //           <div className='py-4'>
        //             <span className='editIcon'>
        //               <VisibilityIcon 
        //               onClick={() => {
        //                 handlePreview(row);
        //               }} 
        //               style={{ color: 'orange', cursor: "pointer" }} />
        //             </span>
        //           </div>
        //           :
        //           <div className='py-4'>
        //             <span className='editIcon'>
        //               <DriveFolderUploadIcon 
        //               onClick={() => {
        //                 handleUpload();
        //               }} 
        //               style={{ color: 'orange', cursor: "pointer" }} />
        //             </span>
    
        //           </div>
        //         }
    
        //       </>
        //     )
        //   }
        // }
      ];
    const tableHeaderStyle = {
        headCells: {
          style: {
            fontWeight: "bold",
            fontSize: "17px",
            backgroundColor: "rgba(241,244,249,255)",
          },
          head: {
            style: {
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }
          },
          cells: {
            style: {
              fontSize: "0.875rem",
              fontFamily: "'Public Sans',sans-serif",
            }
          }
        }
      }
    return (
        <MainCard title="All Travel Claims">
            <Grid item xs={12} md={12} lg={12}>
                <Grid >
                    <ToastContainer />
                </Grid>
                <div className='text-end'>
          {/* <div>
            <button className='btn btn-primary me-4' 
              style={{ backgroundColor: '#EF9848', border: '0px' }}> + New Claim</button>
          </div> */}
          <DataTable
            columns={column}
            data={data}
            fixedHeader
            customStyles={tableHeaderStyle}
            className='data-table'
            pagination
            subHeader
            subHeaderComponent={
              <>
                <div className='row'>
                  <div className=' d-flex' style={{width:"20%"}}>
                    <input
                      type='text'
                      className='form-control searchInput'
                      placeholder='Search claim Id'
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='searchIcon'>
                      <SearchOutlinedIcon
                        // onClick={handleSearch}
                        style={{ cursor: "pointer" }} />
                    </div>
                    <div className='d-flex'>
                    </div>
                  </div>
                </div>
              </>
            }
          />
        </div>
            </Grid>
            <Dialog open={upload} onClose={handleCloseUpload} >
        <DialogTitle className='editTitle'>Upload Documents</DialogTitle>
        <DialogContent>
          <div className='row'>
            <TextField
              // autoFocus
              margin="dense"
              label="User ID"
              type="text"
              name="userId"
              // value={userId}
              // onChange={(e) => setUserId(e.target.value)}
              style={{ display: 'none' }} // Hidden field
            />
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>

              <TextField
                margin="dense"
                label="Photo"
                type="file"
                name="mobile"
                fullWidth
                InputLabelProps={{ shrink: true }}
                // value={mobile}
                onChange={handleFileChange}
                className='editInputField'
              />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <TextField
                margin="dense"
                label="Signature"
                type="file"
                name="dob"
                InputLabelProps={{ shrink: true }}
                fullWidth
                // value={dob}
                onChange={handleFileChange}
                className='editInputField'
              />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <TextField
                margin="dense"
                label="Adhar Card"
                type="file"
                name="password"
                InputLabelProps={{ shrink: true }}
                fullWidth
                // value={password}
                onChange={handleFileChange}
                className='editInputField'
              />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <TextField
                margin="dense"
                label="Receipt"
                type="file"
                name="password"
                InputLabelProps={{ shrink: true }}
                fullWidth
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className='editInputField'
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className='editButtonDiv'>
          <Button onClick={handleCloseUpload} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Cancel
          </Button>
          <Button
            // onClick={handleSubmit}
            className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={preview} onClose={handleClosePreview} className='newClaimDiv2'>
        <DialogTitle className='editTitle'>Preview Documents</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <div className='imgPreviewDiv'>
                <Typography className='text-preview'>User Photo</Typography>
                <img height={170} width={170} src={selectedRow.photo} alt='User' />
              </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <div className='imgPreviewDiv'>
              <Typography className='text-preview' >User Signature</Typography>
                <img height={170} width={170} src={selectedRow.signature} alt='Signature' />
              </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <div className='imgPreviewDiv'>
              <Typography className='text-preview' >User Adhar</Typography>
                <img height={170} width={170} src={selectedRow.adhar} alt='Adhar' />
              </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <div className='imgPreviewDiv'>
              <Typography className='text-preview' >Policy Receipt</Typography>
                <img height={170} width={170} src={selectedRow.receipt} alt='Receipt' />
              </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className='editButtonDiv'>
          <Button onClick={handleClosePreview} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </MainCard>
    )
}

export default CustomerDetail
