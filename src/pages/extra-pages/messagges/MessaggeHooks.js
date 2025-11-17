import { useState, useEffect } from "react";
import baseURL from "../../../api/autoApi";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MessaggeHooks = () => {
    const [location, setLocation] = useState({ lat: "", long: "" });
    const [error, setError] = useState(null);
 
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const requestNumber = params.get("RequestNumber");
    const srn_no = requestNumber || '';
    useEffect(() => {
        if(srn_no.trim() === ''){
            alert('Please Retry');
            setError();
            return ;
        }
        if (location.lat && location.long) {
            callApi(srn_no);
        }
    }, [location]);

    const callApi = async (srn_no) => {
        try {
            const res = await fetch(`${baseURL}/SaveCoordinates`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ srN_No: srn_no, type: "Customer", lat: location.lat, long: location.long, tripType: "0", }),
            });
            const data = res.json();
            console.log(data.status);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Enable to Track Location By your Browser.")
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude.toString(),
                    long: position.coords.longitude.toString(),
                });
            },
            (err) => {
                setError(`Error (${err.code}): ${err.message}`);
            }
        );
    }, []);

    return {
        location,
        error
    }
}
export default MessaggeHooks;