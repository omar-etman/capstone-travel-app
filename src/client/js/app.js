let temperature;
const userName = 'omaretman';
const baseURL = 'http://localhost:8000';
const weatherBitBaseURL="https://api.weatherbit.io/v2.0/";
const pixabayBaseURL="https://pixabay.com/api";
const geonameBaseURL = `http://api.geonames.org/searchJSON?username=${userName}`;
const weatherBitAPIKey="369817f75d864de791f3fc5ac49b2401";
const apiKey = '84b9f88850da73d87b3bc5ddb1cd1f86';
const pixabayKey="20682480-a1c42c7e1315b40f267c2b45f";
const parameters = {
    date: new Date(),
    city: '',
    lng: null,
    lat: null, 
    description: '',
    country: '',
    imageUrl: 'https://via.placeholder.com/150'
};

// Main function
function handleGenerateClick(e){
    e.preventDefault();
    getLocationInfo(parameters.city)
    .then(data=>{
        const {lat, lng, countryName, countryCode} = data.geonames[0];

        updateParams('lat', lat);
        updateParams('lng', lng);
        updateParams('countryCode', countryCode);
         
        getWeatherInfo()
        .then(data => {
            updateParams('description', data.data[0].weather.description);
            getImage()
            .then(data => {
                updateParams('imageUrl', data.hits[0].largeImageURL);
                updateUi();
            })
        })
    })
    
};

const getImage = async ()=>{
    formatCityName();
    const compoundURL = `${pixabayBaseURL}?q=${parameters.city}&key=${pixabayKey}`;
    const res = await fetch(compoundURL);
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error',error);
    }
}

function updateUi () {
    reverseFormatCityName();
    document.querySelector('.image').src = parameters.imageUrl;
    document.querySelector('.destination__name').innerHTML = `${parameters.city}, ${parameters.countryCode}`;
    document.querySelector('.destination__weather').innerHTML = parameters.description;
};
const getLocationInfo = async ()=>{
    const compoundURL = `${geonameBaseURL}&q=${parameters.city}&maxRows=1`;
    const res = await fetch(compoundURL);
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error',error);
    }
}

const getWeatherInfo = async ()=>{
    const compoundURL = `${weatherBitBaseURL}${decideInterval()}?lat=${parameters.lat}&lon=${parameters.lng}&key=${weatherBitAPIKey}`;
    const res = await fetch(compoundURL);
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error',error);
    }
}

// Helper functions
function formatCityName() {
    parameters.city = parameters.city.replace(' ', '+');
}

function reverseFormatCityName() {
    parameters.city = parameters.city.replace('+', ', ');
}

function updateUserParameters(param) {
    parameters[param] = document.getElementById(param).value;
}

function updateParams(param, value) {
    parameters[param] = value;
}
function decideInterval() {
    const date = parameters.date;
    const dateDiff = (new Date(date).getTime() - new Date().getTime())/ (1000*60*60*24);

    return dateDiff <=7 ? 'current' : 'forecast/daily';
}
export {
    handleGenerateClick, 
    updateUserParameters,
    updateUi
}