const getCoordinates = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

const updateCityName = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        city.innerHTML = allData.city;
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = {
    getCoordinates,
    updateCityName
};