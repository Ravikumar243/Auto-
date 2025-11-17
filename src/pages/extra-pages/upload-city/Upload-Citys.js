import React, { useMemo } from 'react';
import MainCard from "components/MainCard";
import {
    Grid, Box, Typography, Button, Select, Modal
} from "@mui/material";

import { ToastContainer } from "react-toastify";
import { MenuItem, TextField } from '../../../../node_modules/@mui/material/index';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddIcon from '@mui/icons-material/Add';
import UploadCItysHooks from './UploadCItysHooks'

import DataTable from "react-data-table-component";

const UploadCItys = () => {
    const { handleUploadStateCity, loading, setUploadFile, dataitems, downloadExcelFile,uploadFile,search,setSearch,filterData} = UploadCItysHooks();
    const column = useMemo(() => [
        // {
        //     name: "ID",
        //     selector: (row) => row.id
        //     ,
        // },
        {
            name: "State",
            selector: (row) => row.state
            ,
        },
        {
            name: "City",
            selector: (row) => row.city,
        },
        {
            name: "Pincode",
            selector: (row) => row.pincode,
        },
    ]);

    const tableHeaderStyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "rgba(241,244,249,255)",
            },
            head: {
                style: {
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                },
            },
            cells: {
                style: {
                    fontSize: "0.875rem",
                    fontFamily: "'Public Sans',sans-serif",
                },
            },
        },
    };
    return (
        <div className='mt-0'>
            <MainCard>
                <Box>
                    <ToastContainer />
                </Box>
                <Grid items xs={12} md={12} lg={12}>
                    <Typography variant="h3"  >Upload State / City Details</Typography>
                    <div className="d-flex flex-row justify-content-start align-align-items-start my-3 " >
                        <div className='my-2'>
                            <input type="file" name="uploadFile" onChange={(e) => setUploadFile(e.target.files[0])} />
                        </div>
                        <div className=''>
                            <Button type="Submit" onClick={handleUploadStateCity} startIcon={<AddIcon />} style={{ backgroundColor: "rgb(126, 0, 209)", color: "#f5f5f5", border: "0px solid rgb(126, 0, 209)", width: '150px', borderRadius: "5px", padding: '5px', height: "40px", marginLeft: "0.9rem" }}>{loading === true ? "Upload..." : "Upload Files"}</Button>
                        </div>
                        <div className='mx-3'>
                            <Button
                                type="button"
                                onClick={downloadExcelFile}
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
                                    transition: "all 0.3s ease",

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
                    </div>

                </Grid>

                <DataTable
                    columns={column}
                    data={ search === "" ? dataitems : filterData}
                    // data={search === "" ? dataitems : getCompanyData}
                    fixedHeader
                    customStyles={tableHeaderStyle}
                    className="data-table"
                    pagination
                    subHeader
                    subHeaderComponent={
                        <>
                             {(dataitems.length  > 0) && (
                                <div className="row">
                                    <div className="mt-1" style={{ width: "35%" }}>
                                        <input
                                            type="text"
                                            className="form-control searchInput"
                                            placeholder="Search... "
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )} 
                        </>
                    }
                />
            </MainCard>
        </div>
    )
}
export default UploadCItys;