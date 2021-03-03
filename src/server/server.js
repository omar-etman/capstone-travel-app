let projectData = {};

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};

app.post('/add', callBack);

function callBack(req,res){
  res.send('POST received');
};

app.post('/user/input', addUserEntry);

function addUserEntry (req,res){
    projectData = Object.assign({},req.body);
    res.send('success');
};