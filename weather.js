const COORD = "coords";

function saveCoords(coordsObj) {
    localStorage.setItem(COORD, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Cannot access geo location")
}

function askForCoord() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoord() {
    const loadedCoord = localStorage.getItem(COORD)
    if (loadedCoord === null) {
        askForCoord();
    } else {
        // getWeather
    }
}

function init() {
    loadCoord();
}

init();

//8:03