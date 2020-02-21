const weather = document.querySelector('.js-weather');


const API_KEY = '424d07b0e106e751eac6bac38228d24c';
const COORD = "coords";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
}
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
    getWeather(latitude, longitude);
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
        const parsedCoord = JSON.parse(loadedCoord);
        getWeather(parsedCoord.latitude, parsedCoord.longitude);
    }
}

function init() {
    loadCoord();
}

init();

//8:03