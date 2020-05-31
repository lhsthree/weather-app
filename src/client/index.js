import './styles/styles.scss'
import { getCoordinates, updateCityName } from "./js/geoname";
import { getImage, updateImage } from "./js/pixabay";
import { getWeather, updateUI } from "./js/weatherbit";


/* Global Variables */



const btn = document.getElementById("generate");
const dlt = document.getElementById("delete");

//Geonames API key and base URL
const geonameBaseURL ="http://api.geonames.org/searchJSON?q="
const username = "lhsthree"

//Pixabay API key and base URL
const pixabayBaseURL = "https://pixabay.com/api/?key="
const pixabayApiKey = "16676243-3df4002abbfb0069dd98426e3"

//Weatherbit API key and base URL
const weatherbitBaseURL = "https://api.weatherbit.io/v2.0/normals?"
const weatherbitApiKey = "35b55aa236754a7fbddabff894e22d91"



const performAction = (e) => {
  const zip = document.getElementById("zip").value;
  let startDate = document.getElementById("start-date").value;
startDate = startDate.slice(5);
  getCoordinates(`${geonameBaseURL}${zip}&maxRows=10&username=${username}`)
    .then(function (data) {
      postData('/add', {
       lat: data.geonames[0].lat,
        city: data.geonames[0].name,
        lng: data.geonames[0].lng,
      })
      .then(data=> {

 getWeather(`${weatherbitBaseURL}lat=${data.lat}&lon=${data.lng}&start_day=${startDate}&end_day=${startDate}&units=I&tp=daily&key=${weatherbitApiKey}`)
  .then(function (data) {
      postData('/add', {
        max_temp: data.data[0].max_temp,
        min_temp: data.data[0].min_temp,
      
      })
    }).then(data=>{
      let city = document.getElementById("city").innerHTML
      getImage(`${pixabayBaseURL}${pixabayApiKey}&q=${city}`)
      .then(function(data){
        postData('/add', {
          picture: data.hits[0].imageURL,
        })
      }).then(updateImage)
    }).then(updateUI)
   
}).then(updateCityName)
    })
}



//post data

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const deleteInput = (e) => {
  city.innerHTML = "";
  max_temp.innerHTML = "";
  min_temp.innerHTML = "";
  picture.innerHTML = "";
}


//get project data


//use event listener to add function
btn.addEventListener('click', performAction);
dlt.addEventListener('click', deleteInput);



export {
  getWeather,
  getImage,
  getCoordinates,
  updateImage,
  updateUI,
  updateCityName,
}