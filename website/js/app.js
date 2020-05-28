/* Global Variables */



/* full API URL
http://api.openweathermap.org/data/2.5/weather?zip=60618,us&units=imperial&APPID=24e1111bc260485a37b54b9d9ca8f6e6 */


const btn = document.getElementById("generate");

// Create a new date instance dynamically with JS


//Geonames API key and base URL
const geonameBaseURL ="http://api.geonames.org/searchJSON?q="
const username = "lhsthree"

//Weatherbit API key and base URL
const weatherbitBaseURL = "https://api.weatherbit.io/v2.0/normals?"
const weatherbitApiKey = "35b55aa236754a7fbddabff894e22d91"



const performAction = (e) => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getCoordinates(`${geonameBaseURL}${zip}&maxRows=10&username=${username}`)
    .then(function (data) {
      postData('/add', {
        lat: data.geonames[0].lat,
        city: data.geonames[0].name,
        lng: data.geonames[0].lng,
      })
    })
}


const performAction2 = (e) => {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  getWeather(`${weatherbitBaseURL}lat=${lat}&lon=${lng}&start_day=
    ${startDate}&end_day=${endDate}&tp=daily&key=${weatherbitApiKey}`)
    .then(function (data) {
      postData('/add', {
        weatherbit: data
      
      }).then(updateUI);
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

//get webAPI info
const getCoordinates = async (url)=> {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    }catch (error){
        console.log("error", error);
    }
};

const getWeather = async (url)=> {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    }catch (error){
        console.log("error", error);
    }
};


//get project data
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        city.innerHTML = allData.city;
        content: feelings;
    }catch (error){
        console.log("error",error);
    }
}


//use event listener to add function
btn.addEventListener('click', performAction, performAction2);