let projectData = {
  lat: '', 
  lon: '',
  city: '',
};

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('../../dist'));

const port = 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

app.post('/getWeather', callBack);

function callBack(req,res){
  res.send('POST received');
};