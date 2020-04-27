 //empty JS object
let projectData = {};

const express = require('express');
//start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* middleware */
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//initialize project folder
app.use(express.static('website'));


//callback
app.get('/', getInfo);

const getInfo = (req, res) =>{
    res.send(projectData);
}

//set up server
const port = 3000

const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)});