const searchbtn = document.getElementById('searchbtn');
const cityInput = document.getElementById('location');
const citytitle = document.getElementById('citytitle');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const wind = document.getElementById('wind');
const humi = document.getElementById('humi');
const toggle = document.getElementById('toggle');
const ico = document.getElementById('ico');
const detailsbox = document.querySelector('.detailsbox'); // Fixed reference
const body = document.body;

let isCelsius = true;
let tempCelsius = 0;

searchbtn.addEventListener('click', () => {
    const APIkey = `5d1a4ab264f0c2401641c37377086678`;
    const city = cityInput.value.trim();

    if (city === '') {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            tempCelsius = data.main.temp;
            const tempFahrenheit = (tempCelsius * 9 / 5) + 32;

            citytitle.innerText = data.name;
            temp.innerText = isCelsius ? `${tempCelsius.toFixed(1)}°C` : `${tempFahrenheit.toFixed(1)}°F`;
            weather.innerText = data.weather[0].main;
            wind.innerText = `${data.wind.speed} m/s`;
            humi.innerText = `${data.main.humidity}%`;

            let weatherCondition = data.weather[0].main.toLowerCase();
            detailsbox.classList.add('detailshow');
            detailsbox.style.display = "block"

            switch (weatherCondition) {
                case 'clear':
                    ico.src = '/imgs/ico/clear.png';
                    body.style.backgroundImage = "url('/imgs/img/clear.jpg')";
                    break;
                case 'clouds':
                    ico.src = '/imgs/ico/clouds.png';
                    body.style.backgroundImage = "url('/imgs/img/clouldy.jpg')";
                    break;
                case 'rain':
                    ico.src = '/imgs/ico/rain.png';
                    body.style.backgroundImage = "url('/imgs/img/rain.jpg')";
                    break;
                case 'drizzle':
                    ico.src = '/imgs/ico/drizzle.png';
                    body.style.backgroundImage = "url('/imgs/img/drizzel.jpg')";
                    break;
                case 'thunderstorm':
                    ico.src = '/imgs/ico/storm.png';
                    body.style.backgroundImage = "url('/imgs/img/strom.jpg')";
                    break;
                case 'snow':
                    ico.src = '/imgs/ico/snow.png';
                    body.style.backgroundImage = "url('/imgs/img/snow.jpg')";
                    break;
                case 'mist':
                case 'fog':
                    ico.src = '/imgs/ico/mist.png';
                    body.style.backgroundImage = "url('/imgs/img/mist.jpg')";
                    break;
                case 'haze':
                    ico.src = '/imgs/ico/Haze.png';
                    body.style.backgroundImage = "url('/imgs/img/haze.jpg')";
                    break;
                case 'smoke':
                    ico.src = '/imgs/ico/Haze.png';
                    body.style.backgroundImage = "url('/imgs/img/smoke.jpg')";
                    break;
                default:
                    ico.src = '/imgs/ico/unknown.png';
                    body.style.backgroundImage = "url('/imgs/img/Weather.jpg')";
                    break;
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            body.style.backgroundImage = "url('/imgs/img/error.jpg')";
           detailsbox.style.display = "none"
        });
});

// Toggle Button - Celsius to Fahrenheit
if (toggle) {
    toggle.addEventListener('click', () => {
        isCelsius = !isCelsius;
        const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
        temp.innerText = isCelsius ? `${tempCelsius.toFixed(1)}°C` : `${tempFahrenheit.toFixed(1)}°F`;
    });
}
