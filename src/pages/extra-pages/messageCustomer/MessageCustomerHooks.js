import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import baseURL from "../../../api/autoApi";
import Swal from "sweetalert2";

const MessageCustomerHooks = () => {
  const [vendorCoords, setVendorCoords] = useState({ lat: null, long: null });
  const [userLatLong, setUserLatLong] = useState({ lat: null, long: null });
  const [error, setError] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [tripStarted, setTripStarted] = useState(false);
  const [tripEnded, setTripEnded] = useState(false);
  const intervalRef = useRef(null); 
  const { search, state } = useLocation();
  const params = new URLSearchParams(search);
  const requestNumber = params.get("RequestNumber");
  const srnNumber = requestNumber || state?.srn_no || "";

  // ✅ Send vendor coordinates to backend
  const callApi = useCallback(
    async (lat, long, tripType = "0") => {
      try {
        await fetch(`${baseURL}/SaveCoordinates`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            srN_No: srnNumber,
            type: "vendor",
            lat,
            long,
            tripType,
          }),
        });
        console.log(`📡 Sent coordinates (tripType=${tripType}):`, lat, long);
      } catch (error) {
        console.error("❌ Error sending coordinates:", error);
      }
    },
    [srnNumber]
  );

  // 🟡 Check trip status from backend when page loads
  useEffect(() => {
    const checkTripStatus = async () => {
      try {
        const res = await fetch(`${baseURL}/GetTripStatus`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            srN_No: srnNumber,
          }),
        });

        const data = await res.json();
        console.log("📡 Trip status response:", data);

        if (data?.tripStatus === "1" || data?.tripStatus === 1) {
          setTripStarted(true);
          setTracking(true);
          // ✅ Auto-resume tracking if backend says trip already started
          startTracking(true);
        } else if (data?.tripStatus === "2" || data?.tripStatus === 2) {
          // Trip ended
          setTripStarted(false);
          setTracking(false);
          setTripEnded(true);

          // Stop interval if running
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        } else {
          setTripStarted(false);
          setTracking(false);
        }
      } catch (error) {
        console.error("❌ Trip status check failed:", error);
      }
    };

    if (srnNumber) checkTripStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srnNumber]);

  // ✅ Fetch user coordinates once (customer’s location)
  useEffect(() => {
    if (!srnNumber) return;

    const fetchUserCoords = async () => {
      try {
        const res = await fetch(`${baseURL}/GetSRNData`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ srN_No: srnNumber }),
        });
        const data = await res.json();
        setUserLatLong({
          lat: Number(data?.dataItem[0]?.user_Latitude),
          long: Number(data?.dataItem[0]?.uSer_Longitude),
        });
      } catch (err) {
        console.error("❌ Error fetching SRN data:", err);
      }
    };

    fetchUserCoords();
  }, [srnNumber]);

  // ✅ Capture initial vendor location once
  useEffect(() => {
    if (!srnNumber) return;
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setVendorCoords({ lat: latitude, long: longitude });
        // tripType = 0 because trip not started yet
        callApi(latitude.toString(), longitude.toString(), "0");
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  }, [srnNumber, callApi]);

  const startTracking = useCallback(
    async (resume = false) => {
      if (tracking && !resume) return;

      // Only ask confirmation when user clicks "Start Trip" manually
      if (!resume) {
        const result = await Swal.fire({
          title: "Start Trip?",
          text: "Are you sure you want to start this trip now?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, Start Trip",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#28a745",
          cancelButtonColor: "#d33",
        });

        if (!result.isConfirmed) {
          console.log("❌ Trip start cancelled by user");
          return; // exit if user cancels
        }
      }

      setTracking(true);
      setTripStarted(true);

      const sendCurrent = () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setVendorCoords({ lat: latitude, long: longitude });
            callApi(latitude.toString(), longitude.toString(), "1");
          },
          (err) => console.warn("Location error:", err.message),
          { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );
      };

      sendCurrent();
      intervalRef.current = setInterval(sendCurrent, 30000);
      console.log("▶ Tracking started/resumed");
    },
    [tracking, callApi]
  );

  const stopTracking = useCallback(
    async (distance) => {
      const result = await Swal.fire({
        title: "End Trip?",
        text: "Are you sure you want to end this trip?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, End Trip",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
      });

      if (!result.isConfirmed) {
        console.log("❌ Trip end cancelled by user");
        return;
      }

      console.log(`📏 Distance to customer: ${distance} km`);
      if (distance > 0.5) {
        Swal.fire(
          "Too Far!",
          `You are too far from the customer (${distance} km away).`,
          "error"
        );
        return;
      }

      setTracking(false);
      setTripStarted(false);
      setTripEnded(true);


      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          callApi(latitude.toString(), longitude.toString(), "2");
        },
        (err) => console.warn("Location error:", err.message)
      );

      Swal.fire("Trip Ended!", "Vendor trip tracking has stopped.", "success");
      console.log("🛑 Tracking stopped");
    },
    [callApi]
  );

  // ✅ Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // ✅ Return everything to the UI
  return {
    vendorCoords,
    userLatLong,
    error,
    tracking,
    startTracking,
    stopTracking,
    tripStarted,
    tripEnded
  };
};

export default MessageCustomerHooks;
