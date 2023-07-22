// variables

let body = document.querySelector('body');
let locationText = document.querySelector('.location');
let tempText = document.querySelector('.temp');
let typeText = document.querySelector('.type');
let weatherText = document.querySelector('.weather');
let image;
let screenHeight;
let screenWidth;

// Geolocator function

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendPosition);
    } else {
      locationText.innerHTML = "Geolocation is not supported by this browser.";
    }
}

 async function sendPosition(position) { 
    return await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then((response) => response.json())
        .then((data) => {
            locationText.innerHTML = `${data.name}, ${data.sys.country}`;
            tempText.innerHTML = `${data.main.temp.toFixed(1)} `;
            typeText.innerHTML = "° C"
            weatherText.innerHTML = `${data.weather[0].main}`;
            image = data.weather[0].icon

            if(data.main.temp >= 37.7 ) {
                body.style.backgroundColor = '#FF4500';
            } else if(data.main.temp >= 29.4) {
                body.style.backgroundColor = '#FFA500';
            } else if(data.main.temp >= 12.7) {
                body.style.backgroundColor = '#90EE90';
            } else if(data.main.temp >= 4.4) {
                body.style.backgroundColor = '#66CDAA';
            }else if(data.main.temp >= -1.1) {
                body.style.backgroundColor = '#4682B4';
            } else if(data.main.temp >= -9.4) {
                body.style.backgroundColor = '#B0E0E6';
            } else {
                body.style.backgroundColor = '#E0FFFF';
            }

            for(let i = 0; i < 25; i++){
                createIcons();
            }
        })
}

// Call Geolocation upon load 

document.addEventListener('DOMContentLoaded', async function() {
    getLocation();


    screenWidth = document.body.clientWidth;
    screenHeight = document.body.clientHeight;

    window.addEventListener('resize', function(){
        screenWidth = document.body.clientWidth;
        screenHeight = document.body.clientHeight;
    });
})

// Switch between C and F 

typeText.addEventListener('click', function() {
    if(typeText.innerHTML == '° C'){
        typeText.innerHTML = "° F";
        let fahr = (Number(tempText.innerHTML) * (9/5)) + 32;
        tempText.innerHTML = `${fahr.toFixed(1)}`
    } else {
        typeText.innerHTML = "° C";
        let cel = (Number(tempText.innerHTML) - 32) * (5/9);
        tempText.innerHTML = `${cel.toFixed(1)}`
    }
});

// Creating icons 
function createIcons(){
    let xCord = (Math.random() * ((screenWidth - 50)) - 50) + 50;
    let yCord = (Math.random() * (screenHeight - 50) - 50) + 50;

    let icon = document.createElement("img")
    icon.src = `${image}`;
    icon.classList.add('icon');
    icon.style.left = `${xCord}px`;
    icon.style.top = `${yCord * 2}px`;
    body.appendChild(icon);
}

