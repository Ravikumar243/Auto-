import React from 'react';
import { Grid, Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
// import Typography from 'themes/overrides/Typography';
// import { styled } from '@mui/material/styles';
import networkdetailsHooks from './networkdetailsHooks'
import DataTable from 'react-data-table-component';
// import DownloadIcon from '@mui/icons-material/Download';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import MainCard from 'components/MainCard';
import AddIcon from '@mui/icons-material/Add';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });


// const data = [
// 	{ id: 'AAV04724', name: 'Sumit', mobile_no: 9897234311, Company_n: 'Tow acadmey', branch: "sec 142 noida", geo_Location: 'Noida', service_type: 'w21', Latitude: '28.6562', Longi: '77.2410', distance_text: '2.9', distance_value: '2328' },
// 	{ id: 'AAV09714', name: 'Amit', mobile_no: 9823974311, Company_n: 'Tow acadmey', branch: "sec 15 noida", geo_Location: 'Delhi', service_type: 'w23', Latitude: '31.6200', Longi: '74.8765', distance_text: '11.8', distance_value: '9872' },
// 	{ id: 'RCV02342', name: 'Vishal', mobile_no: 9843972311, Company_n: 'Tow acadmey', branch: "sec 51 noida", geo_Location: 'Bhopal', service_type: 'w27', Latitude: '9.2250°', Longi: '76.6785', distance_text: '9.6', distance_value: '0983' },
// 	{ id: 'BCD09118', name: 'Rishabh', mobile_no: 9843119723, Company_n: 'Tow acadmey', branch: "sec 101 noida", geo_Location: 'Pune', service_type: 'w43', Latitude: '9.1330', Longi: '69.321', distance_text: '7.4', distance_value: '6721' },
// ];

const Networkdetails = () => {
    const { handleNetworkData, handleUploadFile, datalist, handleClick, loading ,file } = networkdetailsHooks();

    const coulmn = [
        {
            name: "S.No",
            selector: (row, index) => <>{index + 1}</>,
            width: '70px',
        },
        {
            name: "Payment",
            selector: (row) => <>{row.dealersupport}</>,
            width: '100px',
        },
        {
            name: "RSR",
            selector: (row) => <>{row.rsr}</>,
            width: '70px',
        },
        {
            name: "Vendor Name",
            selector: (row) => <>{row.vendorName}</>,
            width: '200px',
        },
        {
            name: "Geo location",
            selector: (row) => <>{row.geolocation}</>,
            width: '200px',
        },
        {
            name: "City",
            selector: (row) => <>{row.city}</>,
            width: '200px',
        },
        {
            name: "State",
            selector: (row) => <>{row.state}</>,
            width: '100px',
        },
        {
            name: "Latitudes",
            selector: (row) => <>{row.latitudes}</>,
            width: '130px',
        },
        {
            name: "longitudes",
            selector: (row) => <>{row.longitudes}</>,
            width: '130px',
        },
    ]

    return (
        <MainCard>
            <Grid>
                <Grid>
                    <Typography variant="h3"  >Upload Network Details</Typography>

                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <form onSubmit={handleNetworkData}>
                                <div className="row mt-3 g-2 align-items-center">
                                    {/* File Upload */}
                                    <div style={{ display: 'flex', justifyContent: "flex-start", gap: "1rem" }}>
                                        <label className="w-10">
                                            <input
                                                type="file"
                                                onChange={handleUploadFile}
                                                hidden
                                            />
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                startIcon={<SaveAltIcon />}
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    borderColor: "rgb(126, 0, 209)",
                                                    color: "rgb(126, 0, 209)",
                                                    textTransform: "none",
                                                    "&:hover": {
                                                        borderColor: "rgb(100, 0, 170)",
                                                        color: "rgb(100, 0, 170)",
                                                        backgroundColor: "rgba(126, 0, 209, 0.05)"
                                                    },
                                                }}
                                                style={{
                                                    border: "1px solid #7e00d1",
                                                    borderRadius: "8px",
                                                    padding: "8px 20px",
                                                    fontWeight: "500",
                                                    textTransform: "none",
                                                    transition: "all 0.3s ease"
                                                }}
                                            >
                                                {file ? file.name : "choose file" }
                                            </Button>
                                        </label>
                                      
                                      
                                        <Button

                                            type="submit"
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            size="small"
                                            sx={{
                                                background: "rgb(126, 0, 209)",
                                                textTransform: "none",
                                                "&:hover": { background: "rgb(100, 0, 170)" },
                                            }}
                                            dissabled={loading}
                                            style={{
                                                border: "1px solid #7e00d1",
                                                borderRadius: "8px",
                                                padding: "8px 20px",
                                                fontWeight: "500",
                                                textTransform: "none",
                                                transition: "all 0.3s ease"
                                            }}
                                        >
                                            {loading ? "Loading ..." : "Upload Files"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Button
                            type="button"
                            onClick={handleClick}
                            variant="outlined"
                            startIcon={<SaveAltIcon />}
                            style={{
                                color: "#7e00d1",
                                border: "1px solid #7e00d1",
                                borderRadius: "8px",
                                padding: "8px 20px",
                                fontWeight: "500",
                                textTransform: "none",
                                backgroundColor: "#faf5ff",
                                transition: "all 0.3s ease"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#7e00d1";
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "#faf5ff";
                                e.currentTarget.style.color = "#7e00d1";
                            }}
                        >
                            Download Template
                        </Button>
                    </div>



                    <div className='row'>

                        <div className='mt-5'>
                            <DataTable
                                columns={coulmn}
                                data={datalist}
                                pagination
                                defaultSortFieldId="distance"
                                defaultSortAsc={true}
                            ></DataTable>
                        </div>
                    </div>

                </Grid>
            </Grid>
        </MainCard >
    )
}

export default Networkdetails;