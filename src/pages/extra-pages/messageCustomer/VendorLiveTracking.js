import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import logo from "../../../assets/images/users/aaLogo.png";
import MessageCustomerHooks from "./MessageCustomerHooks";
import vendorImg from "../../../assets/images/users/driver.avif";
import userImg from "../../../assets/images/users/usermark.png";
import "./vendorLocation.css";

const VendorLiveTracking = () => {
  // 🧩 Get live coordinates from the hook
  const {
    vendorCoords,
    userLatLong,
    tracking,
    tripStarted,
    startTracking,
    stopTracking,
    tripEnded
  } = MessageCustomerHooks();

  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const vendorMarkerRef = useRef(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (tracking) {
      startTracking();
    }
  }, [tracking]);

  useEffect(() => {
    if (!vendorCoords?.lat || !userLatLong?.lat) return;

    // 🧹 Destroy previous map (only first time)
    if (mapRef.current) return;

    const map = L.map("map").setView([vendorCoords.lat, vendorCoords.long], 13);
    mapRef.current = map;

    // 🗺️ Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const vendorIcon = L.icon({
      iconUrl: vendorImg,
      iconSize: [50, 50],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    const userIcon = L.icon({
      iconUrl: userImg,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    // 📍 Vendor marker (movable)
    // const vendorMarker = L.marker([vendorCoords.lat, vendorCoords.long])
    //   .addTo(map)
    //   .bindTooltip("🚚 Vendor", { permanent: true, direction: "top" })
    //   .openTooltip();
    // vendorMarkerRef.current = vendorMarker;

    const vendorMarker = L.marker([vendorCoords.lat, vendorCoords.long], {
      icon: vendorIcon,
    }).addTo(map);
    // .bindTooltip("🚚 Vendor", { permanent: true, direction: "top" })
    // .openTooltip();
    vendorMarkerRef.current = vendorMarker;

    // 📍 User marker
    // L.marker([userLatLong.lat, userLatLong.long])
    //   .addTo(map)
    //   .bindTooltip("📍 User", { permanent: true, direction: "top" })
    //   .openTooltip();

    L.marker([userLatLong.lat, userLatLong.long], { icon: userIcon }).addTo(
      map
    );
    // .bindTooltip("📍 User", { permanent: true, direction: "top" })
    // .openTooltip();

    // 🧭 Routing setup
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(vendorCoords.lat, vendorCoords.long),
        L.latLng(userLatLong.lat, userLatLong.long),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: { styles: [{ color: "blue", weight: 4, opacity: 0.8 }] },
      createMarker: () => null,
    });

    routingControl.addTo(map);
    routingRef.current = routingControl;

    // ✅ Distance calculation
    routingControl.on("routesfound", (e) => {
      if (!e?.routes?.[0]) return;
      const km = (e.routes[0].summary.totalDistance / 1000).toFixed(2);
      setDistance(km);
    });

    // ✅ Cleanup
    return () => {
      if (routingRef.current) {
        routingRef.current.off("routesfound");
        routingRef.current.getPlan().setWaypoints([]);
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [userLatLong]); // Initialize only once when user coords available

  // 🟢 Update vendor marker position and route when location changes (every 30s)
  useEffect(() => {
    if (
      !mapRef.current ||
      !vendorCoords?.lat ||
      !vendorCoords?.long ||
      !userLatLong?.lat
    )
      return;

    const map = mapRef.current;

    // Update vendor marker position
    if (vendorMarkerRef.current) {
      vendorMarkerRef.current.setLatLng([vendorCoords.lat, vendorCoords.long]);
    }

    // Update route line
    if (routingRef.current) {
      routingRef.current.setWaypoints([
        L.latLng(vendorCoords.lat, vendorCoords.long),
        L.latLng(userLatLong.lat, userLatLong.long),
      ]);
    }
  }, [vendorCoords]); // ← Triggered automatically every 30s

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img src={logo} width="150px" alt="Logo" />
      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        Vendor Live Tracking
      </h3>

      <div
        id="map"
        style={{ height: "500px", width: "100%", borderRadius: "8px" }}
      ></div>

      {distance && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          🛣️ Distance: <strong>{distance} km</strong>
        </p>
      )}

      {/* <div style={{ marginTop: "20px" }}>
        {tripStarted ? (
          <button
            onClick={() => stopTracking(distance)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ⏹ End Trip
          </button>
        ) : (
          <button
            onClick={async () => await startTracking(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ▶ Start Trip
          </button>
        )}
      </div> */}

      <div style={{ marginTop: "20px" }}>
        {tripEnded ? (
          <h3 style={{ color: "red" }}>✔ Trip Ended</h3>
        ) : tripStarted ? (
          <button
            onClick={() => stopTracking(distance)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ⏹ End Trip
          </button>
        ) : (
          <button
            onClick={async () => await startTracking(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ▶ Start Trip
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorLiveTracking;
