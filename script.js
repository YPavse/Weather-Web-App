const apiKey = "ed0364763e04c9b5d2289e516c703b34";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
let currentUnit = "metric";

const searchBox = document.querySelector("#search input");
const searchBtn = document.querySelector("#search button");
const weatherIcon = document.querySelector("#weatherIcon");
const errorElement = document.querySelector("#err");
const tempElement = document.querySelector("#temp");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();

            document.querySelector("#city").innerHTML = data.name;

            tempElement.innerHTML = `${convertTemperature(data.main.temp)}&deg;${currentUnit === "metric" ? "C" : "F"}`;

            document.querySelector("#humidity").innerHTML = `${data.main.humidity}%`;
            document.querySelector("#wind").innerHTML = `${data.wind.speed} km/hr`;

            console.log("Weather Condition:", data.weather[0].main);

            if (data.weather[0].main.toLowerCase() === "clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main.toLowerCase() === "clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main.toLowerCase() === "rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main.toLowerCase() === "drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main.toLowerCase() === "mist") {
                weatherIcon.src = "images/mist.png";
            }

            errorElement.style.display = "none";
            document.querySelector("#weather").style.display = "block";
        } else {
            console.error("Failed to fetch weather data:", response.status, response.statusText);

            errorElement.style.display = "block";
            document.querySelector("#weather").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);

        errorElement.style.display = "block";
        document.querySelector("#weather").style.display = "none";
    }
}

function convertTemperature(temp) {
    if (currentUnit === "metric") {
        return temp;
    } else {
        return (temp * 9/5) + 32;
    }
}

const celButton = document.querySelector("#cel");
const fahButton = document.querySelector("#fah");

celButton.addEventListener("click", () => {
    currentUnit = "metric";
    checkWeather(searchBox.value);
});

fahButton.addEventListener("click", () => {
    currentUnit = "imperial";
    checkWeather(searchBox.value);
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
