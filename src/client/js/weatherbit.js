

const getWeather = async (url)=> {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    }catch (error){
        console.log("error", error);
    }
};


const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        max_temp.innerHTML = "Max: " + allData.max_temp + " Degrees Fahrenheit";
        min_temp.innerHTML = "Min: " + allData.min_temp + " Degrees Fahrenheit";
    }catch (error){
        console.log("error",error);
    }
}

module.exports = {
   getWeather,
   updateUI
};