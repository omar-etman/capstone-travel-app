let temperature;
const baseURL = 'http://localhost:8000';
const weatherBaseURL = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '84b9f88850da73d87b3bc5ddb1cd1f86';

const newDate = new Date();
new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0, 23, 59, 59);

document.getElementById('generate').addEventListener('click', handleGenerateClick);

function handleGenerateClick(e){
    let zip = document.getElementById('zip').value;
    getWeather(zip)
    .then(data=>{
        const payLoad = {
            temperature: data.main.temp,
            date: newDate,
            userInput: document.getElementById('feelings').value
        };
        postUserData(payLoad)
        .then(()=>{
            retrieveInputData()
        })
    })
    
};
function updateUi (data) {
    console.log(data);
    document.getElementById('temp').innerHTML = data.temperature;
    document.getElementById('content').innerHTML = data.userInput;
    document.getElementById('date').innerHTML = data.date;
};
const getWeather = async (zip)=>{
    const compoundURL = `${weatherBaseURL}weather?zip=${zip}&appid=${apiKey}&units=metric`;
    const res = await fetch(compoundURL);

    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error',error);
    }
}

const postUserData = async (payLoad)=>{
    const URL = `${baseURL}/user/input`;
    const res = await fetch(URL, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad), 
      });
      try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error',error);
    }
};

const retrieveInputData = async ()=>{
    const URL = `${baseURL}/all`;
    const res = await fetch(URL);

    try {
        const data = await res.json();
        updateUi(data);
    }catch(error) {
        console.log('error',error);
    }
}