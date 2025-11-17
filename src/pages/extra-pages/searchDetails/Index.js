import React from 'react';
import { Grid, TextField, Typography, Container, Button, Box } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DataTable from 'react-data-table-component';
import CreateCustomerHooks from './CreateCustomerHooks';
import ActiveCasesHook from '../deshboard/ActiveCasesHook';
import MainCard from 'components/MainCard';
import { ToastContainer } from 'react-toastify';

const Index = () => {
	const { handleSearchCalimChanges, searchCalimTerms, handleSearchCalimData, searchCalimAllData } = CreateCustomerHooks();
	const { handleSearchCases } = ActiveCasesHook();

	const columns = [
		{
			name: 'Search Ticket',
			cell: (row) => (
				<Box className="custom-cell">
					<SearchOutlinedIcon sx={{ cursor: 'pointer', color: '#7E00D1' }} onClick={() => handleSearchCases(row?.srN_No || '')} />
				</Box>
			),
		},
		{
			name: 'SRN No',
			selector: (row) => row?.srN_No || '',
			
		},
		{
			name: 'Company Name',
			selector: (row) => row?.companyName || '',
			
			cell: (row) => row?.companyName || 'N/A',
		},
		{
			name: 'Customer Name',
			selector: (row) => row?.customerFirstName || '',
		
		},
		{
			name: 'Customer Email',
			selector: (row) => row?.customerEmailid || '',
		
		},
		{
			name: 'Mobile Number',
			selector: (row) => row?.customerMobileNo || '',
		
		},
	];

	const tableHeaderStyle = {
		headCells: {
			style: {
				fontWeight: 'bold',
				fontSize: '14px',
				backgroundColor: '#F1F4F9',
				color: '#333',
				padding: '12px',
			},
		},
		cells: {
			style: {
				fontSize: '0.875rem',
				fontFamily: "'Public Sans', sans-serif",
				padding: '12px',
			},
		},
		rows: {
			style: {
				'&:hover': {
					backgroundColor: '#F9FAFB',
				},
			},
		},
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSearchCalimData();
		}
	};

	return (
		<MainCard sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} >
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Ticket No. / Engine No. / Vehicle Reg / Chassis / Mobile / Email Address / Battery No."
						value={searchCalimTerms}
						onChange={handleSearchCalimChanges}
						onKeyDown={handleKeyDown}
						InputProps={{
							startAdornment: (
								<SearchOutlinedIcon sx={{ color: '#7E00D1', mr: 1, fontSize: '1.2rem' }} />
							),
							sx: { fontSize: '14px', backgroundColor: '#FFF' },
						}}
						sx={{ maxWidth: { xs: '100%', md: '600px' } }}
					/>
				</Grid>
				<Grid item xs={12} md={3} py={1} >
						<Button
							variant="contained"
							onClick={handleSearchCalimData}
							sx={{
								backgroundColor: '#7E00D1',
								color: '#FFF',
								fontSize: '14px',
								width: { xs: '120px', sm: '144px' },
								height: '40px',
								'&:hover': { backgroundColor: '#6200A1' },
							}}
						>
							Search
						</Button>
				</Grid>
				<Grid item xs={12} >
					<DataTable
						columns={columns}
						data={Array.isArray(searchCalimAllData) ? searchCalimAllData : []}
						fixedHeader
						customStyles={tableHeaderStyle}
						className="data-table"
						pagination
						subHeader
						noDataComponent={<Typography sx={{ p: 2 }}>No records found</Typography>}
						responsive
					/>
				</Grid>
			</Grid>
			<ToastContainer />
		</MainCard>
	);
};

export default Index;