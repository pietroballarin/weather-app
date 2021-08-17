import React, {useState, useEffect} from 'react'
import Searchbar from './Searchbar';
import axios from 'axios';

export default function Main() {

    const weatherObj = {
        weather: '', 
        description: '', 
        temperature: '',
        tempMax: '',
        tempMin: ''
    };

    const [location, setLocation] = useState('Sofia');
    const [weatherData, setWeatherData] = useState(weatherObj);
    const [weatherIcon, setWeatherIcon] = useState('')

    const handleLocationChange = (event) => {
        setLocation(event)
    }

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=`)
        .then(function (response) {
            setWeatherData({
                weather: response.data.weather[0].main,
                description: response.data.weather[0].description,
                temperature: (response.data.main.temp-273.15).toFixed(1),
                tempMax: (response.data.main.temp_max-273.15).toFixed(1),
                tempMin: (response.data.main.temp_min-273.15).toFixed(1)
            })
            setWeatherIcon(response.data.weather[0].icon)
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    const imageLink = `http://openweathermap.org/img/wn/${weatherIcon}.png`

    return (
        <div>
            <Searchbar 
            location={location}
            handleLocationChange={handleLocationChange}
            />
            <img src={imageLink} alt="cloudy"></img>
            <h1>{weatherData.weather}</h1>
            <p>{weatherData.description}</p>
            <h2>{weatherData.temperature}°C</h2>
            <p>Max {weatherData.tempMax}°C</p>
            <p>Min {weatherData.tempMin}°C</p>
        </div>
    )
}
