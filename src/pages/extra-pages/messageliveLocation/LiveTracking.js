import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";
import baseURL from "../../../api/autoApi"; 
import logo from "../../../assets/images/users/aaLogo.png";
import vendorImg from "../../../assets/images/users/driver.avif";
import userImg from "../../../assets/images/users/usermark.png";
import "../messageCustomer/vendorLocation.css";

const LiveTracking = () => {
  const { state } = useLocation();
  const { srnNumber, userlocationPoints, vendorlocationPoints } = state || {};

  const [distance, setDistance] = useState(null);
  const [userLoc, setUserLoc] = useState(userlocationPoints);
  const [vendorLoc, setVendorLoc] = useState(vendorlocationPoints);

  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const vendorMarkerRef = useRef(null);
  const userMarkerRef = useRef(null);

  const vendorIcon = L.icon({
  iconUrl: vendorImg,
  iconSize: [45, 45],   // adjust size
  iconAnchor: [22, 45], 
});

const userIcon = L.icon({
  iconUrl: userImg,
  iconSize: [40, 40], 
  iconAnchor: [20, 40],
});

  const fetchCoordinates = async () => {
  try {
    const res = await axios.post(`${baseURL}/GetAllCoordinates`, {
      srN_No: srnNumber,
    });

    if (res?.data?.dataItem?.length > 0) {
      const data = res.data.dataItem[0];
      const newUserLoc = {
        lat: Number(data.userLatitude),
        lng: Number(data.userLongitude),
      };
      const newVendorLoc = {
        lat: Number(data.vendorLatitude),
        lng: Number(data.vendorLongitude),
      };

      setUserLoc(newUserLoc);
      setVendorLoc(newVendorLoc);

      // ✅ Update markers dynamically
      if (vendorMarkerRef.current) {
        vendorMarkerRef.current.setLatLng([newVendorLoc.lat, newVendorLoc.lng]);
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([newUserLoc.lat, newUserLoc.lng]);
      }

      // ✅ Update route dynamically
      if (routingRef.current) {
        routingRef.current.setWaypoints([
          L.latLng(newVendorLoc.lat, newVendorLoc.lng),
          L.latLng(newUserLoc.lat, newUserLoc.lng),
        ]);
      }

      // ✅ Fit map bounds again (optional)
      if (mapRef.current) {
        const bounds = L.latLngBounds([
          [newVendorLoc.lat, newVendorLoc.lng],
          [newUserLoc.lat, newUserLoc.lng],
        ]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  } catch (err) {
    console.error("Error fetching coordinates:", err);
  }
};




  useEffect(() => {
    if (!vendorLoc?.lat || !userLoc?.lat) return;

    // Destroy old map if exists
    const existingMap = L.DomUtil.get("map");
    if (existingMap && existingMap._leaflet_id) {
      existingMap._leaflet_id = null;
    }

    const vendorLat = Number(vendorLoc.lat);
    const vendorLng = Number(vendorLoc.lng);
    const userLat = Number(userLoc.lat);
    const userLng = Number(userLoc.lng);

    const map = L.map("map").setView([vendorLat, vendorLng], 11);
    mapRef.current = map;


    

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add markers
    const vendorMarker = L.marker([vendorLat, vendorLng], { icon: vendorIcon })
      .addTo(map)
      // .bindTooltip("Vendor", { permanent: true, direction: "top" });

        vendorMarkerRef.current = vendorMarker;


    const userMarker = L.marker([userLat, userLng], { icon: userIcon })
      .addTo(map)
      // .bindTooltip("User", { permanent: true, direction: "top" });

    userMarkerRef.current = userMarker;

    // Routing Control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(vendorLat, vendorLng),
        L.latLng(userLat, userLng),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: { styles: [{ color: "blue", weight: 4, opacity: 0.8 }] },
      createMarker: () => null,
    }).addTo(map);

    routingRef.current = routingControl;

    // Calculate distance
    routingControl.on("routesfound", (e) => {
      if (!e?.routes?.[0]) return;
      const km = (e.routes[0].summary.totalDistance / 1000).toFixed(2);
      setDistance(km);
    });

    return () => {
      try {
        if (routingRef.current) {
          routingRef.current.off("routesfound");
          routingRef.current.getPlan().setWaypoints([]);
          if (map.hasLayer(routingRef.current)) map.removeControl(routingRef.current);
          routingRef.current = null;
        }
        if (map) {
          map.eachLayer((layer) => map.removeLayer(layer));
          map.remove();
        }
      } catch (err) {
        console.warn("Cleanup error:", err.message);
      }
    };
  }, []); // Run once on mount

  // ✅ Fetch coordinates every 30 seconds
  useEffect(() => {
    fetchCoordinates(); // first immediate call
    const interval = setInterval(fetchCoordinates, 30000); // every 30 sec
    return () => clearInterval(interval);
  }, [srnNumber]);

  if (!state) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "100px" }}>
        No tracking data found.
      </h3>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img src={logo} width="150px" alt="Logo" />
      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        Vendor Live Tracking
      </h3>
      <p>
        <strong>SRN Number:</strong> {srnNumber}
      </p>

      <div
        id="map"
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "8px",
        }}
      ></div>

      {distance && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          🛣️ Distance: <strong>{distance} km</strong>
        </p>
      )}
    </div>
  );
};

export default LiveTracking;
