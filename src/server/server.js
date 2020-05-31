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
app.use(express.static('./dist'));

app.get('/', function (req, res) {
    res.sendFile('./dist/index.html')
})

//get route
app.get('/all', (req, res) => {res.send(projectData)
})
//post route
app.post('/add', sendInfo)
function sendInfo (req, res) {
    projectData.lat = req.body.lat;
    projectData.lng = req.body.lng;
    projectData.city = req.body.city;
    projectData.max_temp= req.body.max_temp;
    projectData.min_temp= req.body.min_temp;
    projectData.picture = req.body.picture;
   
    res.send(projectData)
}

//set up server
const port = 5507

const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)});