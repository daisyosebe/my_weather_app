// Array to store search history
let searchHistory = [];

document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const cityName = document.getElementById("cityInput").value;
    const apiKey = "d34366048ea05f1ea09ceab8696e4944";
    
    // TODO: current weather data API
    const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    
    fetch(currentApiUrl)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
                const city = data.name;
                const weatherIcon = data.weather[0].icon; 
                
                const currentDate = new Date();
                const formattedDate = currentDate.toDateString();
                
                
                document.getElementById("cityAndDate").innerHTML = `${city} - <b>${formattedDate}</b>`;
                document.getElementById("weatherInfo").innerHTML = `
                <p>Temp: ${temp} °F</p>
                    <p>Wind: ${windSpeed} mph</p>
                    <p>Humidity: ${humidity} %</p>
                    <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
                    `;
                })
                .catch(error => {
            console.error("Error fetching current weather data:", error);
            //Error: show message to user
            document.getElementById("weatherInfo").innerHTML = "City not found. Please try again.";
        });
        
        // Fetch 5-day forecast data
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
        
        fetch(forecastApiUrl)
        .then(response => response.json())
        .then(forecastData => {
            // Display forecast information
            const forecastDiv = document.getElementById("forecast");
            forecastDiv.innerHTML = ""; // Clear previous forecast data
            
            for (let i = 0; i < forecastData.list.length; i += 8) { 
                const forecastDateTime = new Date(forecastData.list[i].dt * 1000); 
                const forecastDate = forecastDateTime.toDateString();
                const forecastTemp = forecastData.list[i].main.temp;
                const forecastWindSpeed = forecastData.list[i].wind.speed;
                const forecastHumidity = forecastData.list[i].main.humidity;
                const forecastIcon = forecastData.list[i].weather[0].icon; 
                
                const forecastItem = document.createElement("div");
                forecastItem.classList.add("forecast-item");
                forecastItem.innerHTML = `
                    <p>Date: ${forecastDate}</p>
                    <img src="http://openweathermap.org/img/wn/${forecastIcon}.png" alt="Weather Icon">
                    <p>Temp: ${forecastTemp} °F</p>
                    <p>Wind: ${forecastWindSpeed} mph</p>
                    <p>Humidity: ${forecastHumidity} %</p>
                `;
                
                forecastDiv.appendChild(forecastItem);
            }
        })
        .catch(error => {
            console.error("Error fetching forecast data:", error);
            // Handle error: show message to user
            document.getElementById("forecast").innerHTML = "whoops, couldnt find city :( please try again).";
        });
});

        // TODO: add city to search history
       
        //ToDo: evenlisteners for search history button: when buttons are clicked they act like search bar
 
