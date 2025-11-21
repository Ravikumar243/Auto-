import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  List,
} from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedIcon from "@mui/icons-material/Speed";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";

const NavItem = ({ level, drawerOpen }) => {
  const { pathname } = useLocation();
  const [selectedVal, setSelectedVal] = useState("dashboard");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userRole = userInfo?.role || "Agent";

  const itemHandler = (id) => setSelectedVal(id);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DirectionsCarIcon />,
      url: "/dashboarddetails",
      roles: ["Admin", "Agent"],
    },
    {
      id: "searchdashboard",
      label: "Search Support",
      icon: <SearchIcon />,
      url: "/Index",
      roles: ["Admin", "Agent"],
    },
    {
      id: "createSupport",
      label: "Create Support Ticket",
      icon: <DescriptionOutlinedIcon />,
      url: "/createTickets",
      roles: ["Admin", "Agent"],
    },
    {
      id: "uploadDetails",
      label: "Upload Details",
      icon: <UploadFileIcon />,
      url: "/UploadDetails",
      roles: ["Admin"],
    },
    {
      id: "networkDetails",
      label: "Network Details",
      icon: <NetworkCheckIcon />,
      url: "/netwokDetails",
      roles: ["Admin"],
    },
    {
      id: "createUser",
      label: "Create User",
      icon: <PersonAddAlt1Icon />,
      url: "/create-user",
      roles: ["Admin"],
    },
    {
      id: "vcrfRecord",
      label: "VCRF Record",
      icon: <DescriptionOutlinedIcon />,
      url: "/vcrf-record",
      roles: ["Admin", "Agent"],
    },
    {
      id: "feedback",
      label: "Feedback Record",
      icon: <DescriptionOutlinedIcon />,
      url: "/feedback",
      roles: ["Admin", "Agent"],
    },
    {
      id: "spinny",
      label: "Spinny Data",
      icon: <DescriptionOutlinedIcon />,
      url: "/spinny-data",
      roles: ["Admin", "Agent"],
    },
    {
      id: "misdetails",
      label: "MIS",
      icon: <SpeedIcon />,
      url: "/misreport",
      roles: ["Admin", "Agent"],
    },
    {
      id: "oldmis",
      label: "Old MIS Upload",
      icon: <SpeedIcon />,
      url: "/old-mis-upload",
      roles: ["Admin"],
    },
    {
      id: "slaReport",
      label: "SLA Report",
      icon: <SpeedIcon />,
      url: "/slnDeshboard",
      roles: ["Admin"],
    },
    {
      id: "uploadStatecity",
      label: "Upload State/ City",
      icon: <UploadFileIcon />,
      url: "/uploderstatecity",
      roles: ["Admin"],
    },
    {
      id: "uploadMakemodels",
      label: "Upload Make/ Models",
      icon: <UploadFileIcon />,
      url: "/uploderMakemodels",
      roles: ["Admin"],
    },
  ];

  return (
    <List>
      {menuItems
        .filter((menu) => menu.roles.includes(userRole))
        .map((menu) => (
          <ListItemButton
            key={menu.id}
            component={Link}
            to={menu.url}
            selected={selectedVal === menu.id}
            onClick={() => itemHandler(menu.id)}
            sx={{
              pl: drawerOpen ? `${level * 28}px` : 1.5,
              py: 1,
              "&.Mui-selected": {
                backgroundColor: "rgb(126,0,209)", 
                color: "#ffffffff", 
                "&:hover": {
                  backgroundColor: "rgb(126,0,209)", 
                  color: "#ffffffff",
                },
              },
              "&:hover": {
                bgcolor: "#f5f5f5",
                color: "#282828",
                "& .MuiListItemIcon-root": {
                  color: "#282828",
                },
              },
            }}
            
          >
            <ListItemIcon
              sx={{ color: selectedVal === menu.id ? "white" : "#282828" }}
            >
              {menu.icon}
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">{menu.label}</Typography>}
              className="ms-2"
            />
          </ListItemButton>
        ))}
    </List>
  );
};

NavItem.propTypes = {
  level: PropTypes.number,
  drawerOpen: PropTypes.bool,
};

export default NavItem;
