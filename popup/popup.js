const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startDate");
const endDateElement = document.getElementById("endDate");

// Button elements
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.onclick = () => {
    // Get location ID from input field
    const locationId = locationIdElement.value;
    
    // Get start and end dates from input fields
    const startDate = new Date(startDateElement.value);
    const endDate = new Date(endDateElement.value);
    
    // Validate input fields
    if (!locationId || isNaN(locationId) || locationId <= 0) {
        alert("Please enter a valid location ID");
        return;
    }
    
    if (!startDate ||!endDate || startDate > endDate) {
        alert("Please enter valid start and end dates");
        return;
    }
    
    // Start tracking location data
    startTrackingLocation(locationId, startDate, endDate);
}

stopButton.onclick = () => {
    // Stop tracking location data
    stopTrackingLocation();
}

chrome.storage.local.get(["locationId", "startDate", "endDate"], (result) => {
    const { localId, startDate, endDate } = result;

    if (localId) {
        locationIdElement.value = localId;
    }
    
    if (startDate) {
        startDateElement.valueAsDate = new Date(startDate);
    }
    
    if (endDate) {
        endDateElement.valueAsDate = new Date(endDate);
    }
})
