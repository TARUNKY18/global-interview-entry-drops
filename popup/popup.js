const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startDate");
const endDateElement = document.getElementById("endDate");

// Button elements
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.onclick = () => {
	const allFieldsValid = performOnStartValidations();

	if (allFieldsValid) {
		handleOnStartState();
		const prefs = {
			locationId: locationIdElement.value,
			startDate: startDateElement.value,
			endDate: endDateElement.value,
			tzData: locationIdElement.options[locationIdElement.selectedIndex].getAttribute("data-tz"),
        };
		chrome.runtime.sendMessage({ event: "onStart", prefs });
	}
};

stopButton.onclick = () => {
	handleOnStopState();
	chrome.runtime.sendMessage({ event: "onStop" });
};


chrome.storage.local.get(
	["locationId", "startDate", "endDate", "locations", "isRunning"],
	(result) => {
		const { locationId, startDate, endDate, locations, isRunning } = result;

		setLocations(locations);

		if (locationId) {
			locationIdElement.value = locationId;
		}

		if (startDate) {
			startDateElement.value = startDate;
		}

		if (endDate) {
			endDateElement.value = endDate;
		}

		if (isRunning) {
			handleOnStartState();
		} else {
			handleOnStopState();
		}
	}
);

const setLocations = (locations) => {
	locations.forEach((location) => {
		let optionElement = document.createElement("option");
		optionElement.value = location.id;
		optionElement.innerHTML = location.name;
		optionElement.setAttribute("data-tz", location.tzData);
		locationIdElement.appendChild(optionElement);
	});
};