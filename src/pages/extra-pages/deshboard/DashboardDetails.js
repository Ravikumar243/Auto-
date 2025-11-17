import MainCard from "components/MainCard";
import React from "react";
import { Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
// import { Padding } from '../../../../node_modules/@mui/icons-material/index';
import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ActiveCses from "./ActiveCses";
import ActiveCasesHook from "./ActiveCasesHook";

// import { Data } from './ActiveCses'

const DashboardDetails = () => {
  const { activeCases, escalated, mycases } = ActiveCasesHook();
  return (
    <>
      <MainCard title="All Travel Claims">
        <Grid item xs={12} md={12} lg={12}>
          <Grid>
            <ToastContainer />
          </Grid>
          <div className="d-flex  gap-5">
            <Grid container spacing={4} >
              {/* Total Cases Card */}
              <Grid item xs={12} sm={6} lg={3} >
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      background:
                        "linear-gradient(135deg, #5b79feff 0%, #c899f6ff 100%)",
                      color: "#fff",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Total Cases</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {activeCases.length}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
						 background:
                        "linear-gradient(135deg, #5b79feff 0%, #c899f6ff 100%)",
                      color: "#fff",
                      }}
                    >
                      <TrendingUpIcon sx={{ color: "green", fontSize: 30 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* My Cases Card */}
              <Grid item xs={12} sm={6}  lg={3}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
					   background:
                        "linear-gradient(135deg, #cc7bdcff 0%, #825ca8ff 100%)",
                      color: "#fff",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">My Cases</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {mycases.length}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
						 background:
                        "linear-gradient(135deg, #fea75bff 0%, #c899f6ff 100%)",
                      color: "#fff",
                      }}
                    >
                      <TrendingUpIcon sx={{ color: "green", fontSize: 30 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Escalated Cases Card */}
              <Grid item xs={12} sm={6} lg={3} >
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
					   background:
                        "linear-gradient(135deg, #fea75bff 0%, #c899f6ff 100%)",
                      color: "#fff",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Escalated </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {escalated.length}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
						
                      }}
                    >
                      <TrendingUpIcon sx={{ color: "green", fontSize: 30 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <ActiveCses />
        </Grid>
      </MainCard>
    </>
  );
};

export default DashboardDetails;
