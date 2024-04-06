const apiGatewayEndpoint = 'https://6fseybwiwzievf5tdsztfxrdbi0vfdse.lambda-url.eu-west-2.on.aws/';

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`${apiGatewayEndpoint}?city=${city}`)
        .then(response => response.json())
        .then(data => { // 'json' changed to 'data' for clarity, not necessary
            
            if (data.error || data.statusCode === 404) {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Directly using the data from the custom response    
            const iconImg = document.querySelector('.weather-box img');
            iconImg.src = data.iconUrl;
            
            const temperature = document.querySelector('.weather-box .temperature');
            temperature.innerHTML = `${data.temperature}`;

            const description = document.querySelector('.weather-box .description');
            description.innerHTML = data.description;

            const humidity = document.querySelector('.weather-details .humidity span');
            humidity.innerHTML = `${data.humidity}`;

            const wind = document.querySelector('.weather-details .wind span');
            wind.innerHTML = `${data.windSpeed}`;

            const feelsLike = document.querySelector('.weather-details .feels-like-value');
            feelsLike.innerHTML = `${data.feels_like}`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
