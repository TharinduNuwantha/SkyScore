import axios from "axios";
import cities from "../data/cities.json" with { type: "json" };

const API_KEY = process.env.WEATHER_API_KEY;

const calculateComfortScore = (temp, humidity, windSpeed) => {
    let score = 100;
    
    if (temp > 25) score -= (temp - 25) * 3;
    else if (temp < 18) score -= (18 - temp) * 2;
    
    if (humidity > 60) score -= (humidity - 60) * 0.5;
    if (windSpeed > 10) score -= (windSpeed - 10) * 2;

    return Math.max(0, Math.min(100, Math.round(score)));
};



export async function getWeatherData() {
    const finalResults = []; 
    
    for (const city of cities) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&appid=${API_KEY}&units=metric`;
            const response = await axios.get(url);
            const data = response.data; 

            const comfortScore = calculateComfortScore(data.main.temp, data.main.humidity, data.wind.speed);

            finalResults.push({
                name: city.name,
                country: city.country,
                temperature: data.main.temp,
                weatherDescription: data.weather[0].description,
                comfortScore: comfortScore, 
                icon: data.weather[0].icon
            });
        } catch (err) {
            console.error(`Failed to fetch ${city.name}: ${err.message}`);
        }
    }

    return finalResults
        .sort((a, b) => b.comfortScore - a.comfortScore)
        .map((city, index) => ({ ...city, rank: index + 1 })); 
}


export async function searchCityWeather(cityName){
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        const comfortScore = calculateComfortScore(data.main.temp, data.main.humidity, data.wind.speed);

        return{
            name: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            weatherDescription: data.weather[0].description,
            comfortScore: comfortScore,
            icon: data.weather[0].icon,
        }
    }catch(err){
        console.error(`Failed to fetch ${cityName}: ${err.message}`);
        throw new Error("City not found");
    }
}