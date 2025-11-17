import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { TextField } from '@mui/material';
// const QueryContext = createContext();
// import CreateCustomerHooks from "./customer/createDetails/CreateCustomerHooks";

const LocationSearchInput = () => {
	// const { formAssistance, setFormAssistance } = CreateCustomerHooks();

	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const timeoutRef = useRef(null);
	// const [places, setPlaces] = useState('');
	// const [state, setState] = useState('')
	// const [country, setCountry] = useState('');
	// const [lat, setLat] = useState('');
	// const [city, setCity] = useState('');
	// const [lng, setLng] = useState('');
	// const [pincode, setPincode] = useState('');

	// useEffect(() => {
	// 	console.log("formdata", formAssistance);
	// }, [formAssistance]);
	const fetchSuggestions = async (value) => {

		setLoading(true);
		const res = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=20`
		);
		const data = await res.json();
		setSuggestions(data);
		setLoading(false);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		setQuery(value);

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		if (value.length > 2) {
			timeoutRef.current = setTimeout(() => {
				fetchSuggestions(value);
			}, 300);
		} else {
			setSuggestions([]);
		}
	};

	const handleSelect = (place) => {

		// console.log("Selected place: country", place.address.country);
		const message = place.display_name;

		const { ci_ty, pin_code } = extractCity(place.display_name, place.address.state, place.address.country);
		// console.log("Selected place: city", city);
		if (place.address.city !== '' || place.address.country !== '' || place.address.state !== '' || place.address.postcode !== '' || place.lat !== '' || place.lon !== '' || place.address.state_district !== '') {

			console.log(place.address.city, place.address.country, place.address.state, place.address.postcode, place.lat, place.lon, place.address.state_district)
			console.log(place);
		}
		setQuery(place.display_name);
		setSuggestions([]);

		// setPlaces(place);
		// setState(place.address.state)
		// setCountry(place.address.country);
		// setLat(place.lat); setLng(place.lon)
		// console.log(place.name)
		// setCity(ci_ty);
		// setPincode(pin_code);
		// setCity(place.address.city);
		// setPincode(place.address.postcode);
		// console.log(place, pincode,)
		// console.log("City:", city);
		// console.log("Pincode:", pincode);
		// console.log(country, lat, lng, state, query);
		// setFormAssistance((prev) => ({
		// 	...prev,
		// 	location: state,
		// 	// landmark: place.address.state,
		// }))
	};
	// const extractCity = (displayName, country) => {
	// 	const genericWords = [country,];
	// 	const parts = displayName.split(',').map(p => p.trim());
	// 	const frequency = {};

	// 	parts.forEach(part => {
	// 		if (!genericWords.includes(part)) {
	// 			frequency[part] = (frequency[part] || 0) + 1;
	// 		}
	// 	});

	// 	// Find the most repeated location-like word
	// 	const mostFrequent = Object.keys(frequency).reduce((a, b) =>
	// 		frequency[a] > frequency[b] ? a : b
	// 	);

	// 	return mostFrequent;
	// };
	// const extractCity = (displayName, country, state) => {
	// 	const genericWords = [country,];
	// 	const parts = displayName.split(',').map(p => p.trim()).filter(p => !genericWords.includes(p));
	// 	return (lastThree[0], pincode[0]); // or return lastThree to see all
	// };

	const extractCity = (displayName, country, state) => {
		const parts = displayName.split(',').map(p => p.trim());

		// Remove the country
		const filteredParts = parts.filter(p => p !== country);

		// Find state index
		const stateIndex = filteredParts.findIndex(part => part.toLowerCase() === state.toLowerCase());

		let city = '';
		let pincode = '';

		if (stateIndex > 0) {
			const oneBefore = filteredParts[stateIndex - 1];

			if (!isNaN(oneBefore)) {
				pincode = oneBefore;
				city = filteredParts[stateIndex - 2] || '';
			} else {
				// Try to get English city from earlier part if multiple exist
				const cityCandidates = filteredParts.slice(0, stateIndex);
				const englishCity = cityCandidates.find(c => /^[A-Za-z\s]+$/.test(c)); // contains only English letters

				city = englishCity || oneBefore; // fallback to oneBefore if no English match
			}
		} else {
			// Fallback: look at end of array
			const oneBefore = filteredParts[filteredParts.length - 2];

			if (!isNaN(oneBefore)) {
				pincode = oneBefore;
				city = filteredParts[filteredParts.length - 3] || '';
			} else {
				const cityCandidates = filteredParts.slice(0, filteredParts.length - 1);
				const englishCity = cityCandidates.find(c => /^[A-Za-z\s]+$/.test(c));
				city = englishCity || oneBefore;
			}
		}

		return { city, pincode };
	};


	return (
		// {handleInputChange, handleSelect, suggestions, loading, place}
		// <QueryContext.provider value={{}}>
		// <div className="autocomplete-wrapper" style={{ position: "relative", maxWidth: "400px" }} >
		// {/* <TextField
		// 		type="text"
		// 		className="form-control"
		// 		placeholder="Enter a location"
		// 		// value={query}
		// 		// onChange={handleInputChange}
		// 		style={{
		// 			padding: "10px",
		// 			border: "1px solid #ccc",
		// 			borderRadius: "4px",
		// 			width: "100%",
		// 		}}
		// 	/> */}
		// 	</div>

		// query,loading,handleInputChange,suggestions,handleSelect
		<div className="autocomplete-wrapper" style={{ position: "relative", maxWidth: "400px" }} >
		
			<TextField fullWidth placeholder="Enter a location" type="text" name="landmark"
				variant="outlined" value={query}
				onChange={handleInputChange} required />


			{loading && (
				<div className="loading-spinner" style={{ position: "absolute", top: 12, right: 12 }}>
					<span className="spinner-border spinner-border-sm text-primary" role="status" />
				</div>
			)
			}

			{
				suggestions.length > 0 && (
					<ul
						className="autocomplete-suggestions"
						style={{
							position: "absolute",
							top: "100%",
							left: 0,
							right: 0,
							backgroundColor: "#fff",
							boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
							borderRadius: "4px",
							zIndex: 1000,
							marginTop: "4px",
							padding: 0,
							listStyle: "none",
							maxHeight: "200px",
							overflowY: "auto",
						}}
					>
						{suggestions.map((place) => (
							<li
								key={place.place_id}
								onClick={() => handleSelect(place)}
								style={{
									padding: "10px 15px",
									cursor: "pointer",
									borderBottom: "1px solid #eee",
									display: "flex",
									alignItems: "center",
									gap: "10px",
								}}
								onMouseOver={(e) => (e.currentTarget.style.background = "#f1f1f1")}
								onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
							>
								<FontAwesomeIcon icon={faLocationDot} style={{ color: "#007bff" }} />
								<span>{place.display_name}</span>
							</li>
						))}
					</ul>
				)
			}


		</div>
		// </QueryContext.provider>

	)
};

export default LocationSearchInput;
