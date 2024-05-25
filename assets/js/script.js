// Search history is stored
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

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
            document.getElementById("weatherInfo").innerHTML = `<p>Temp: ${temp} °F</p><p>Wind: ${windSpeed} mph</p><p>Humidity: ${humidity} %</p>
                <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;
                 // Adds city to search history
                addToSearchHistory(city);
                // Updates search history UI
                updateSearchHistoryUI();
                // Clears input field after search
                document.getElementById("cityInput").value = '';

                })
            .catch(error => {
                console.error("Error fetching current weather data:", error);
                //Error: if citys not found
                document.getElementById("weatherInfo").innerHTML = "City not found. Please try again.";
        });
        
        // TODO: Fetch 5-day forecast data
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
                    <p>${forecastDate}</p>
                    <img src="http://openweathermap.org/img/wn/${forecastIcon}.png" alt="Weather Icon">
                    <p>Temp: ${forecastTemp} °F</p>
                    <p>Wind: ${forecastWindSpeed} mph</p>
                    <p>Humidity: ${forecastHumidity} %</p> `;
                forecastDiv.appendChild(forecastItem);
            }
        })
        .catch(error => {
            console.error("Error fetching forecast data:", error);
            // Error: show up in 5 day forecast
            document.getElementById("forecast").innerHTML = "whoops:(";
        });
});

// TODO: add city to search history
// Check if city already exists in search history
// Save to local storage

function addToSearchHistory(city) {
    // Check if city already exists in search history
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); 
    }
}
// Function to update search history
function updateSearchHistoryUI() {
    const searchHistoryDiv = document.getElementById("searchHistory");
    searchHistoryDiv.innerHTML = ""; //clears prev search history so whole list doesnt save twice
    
    // BUTTONS
    searchHistory.forEach(city => {
        const button = document.createElement("button");
        button.textContent = city;
        button.addEventListener("click", function() {
            document.getElementById("cityInput").value = city;
            document.getElementById("weatherForm").dispatchEvent(new Event("submit"));
        });
        searchHistoryDiv.appendChild(button);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    updateSearchHistoryUI();
});
//TODO: eventlisteners for search history button: when buttons are clicked they act like search bar
 
