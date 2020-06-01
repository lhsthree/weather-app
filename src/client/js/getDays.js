const getDays = (e) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    currentDate = new Date(currentDate);

    let startTime = document.getElementById('start-date').value;
    startTime = new Date(startTime) //converts string to date object
    
    let endTime = document.getElementById('end-date').value;
    endTime = new Date(endTime)
    
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    
    const daysTil = Math.abs((currentDate - startTime.getTime()) / (oneDay));
    
    const daysOn = Math.abs((startTime.getTime() - endTime.getTime()) / (oneDay));
    days_til.innerHTML = `${daysTil} day(s) until VACATION!!!`;
    days_on.innerHTML = `Have a great ${daysOn} day(s) away!!`
};



module.exports = {
    getDays
};