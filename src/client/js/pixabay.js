const getImage = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

const updateImage = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        picture.innerHTML = "<img src =" + allData.picture + ">";
    } catch (error) {
        console.log("error", error);
    }
}


module.exports = {
    getImage,
    updateImage,
};