import React, { useState, useEffect } from 'react';
import WeekCards from './WeekCards';
import axios from 'axios';

export default function MainCard(props) {

    const weatherObj = {
        weather: '', 
        description: '', 
        temperature: '',
        tempMax: '',
        tempMin: ''
    };

    const [weatherData, setWeatherData] = useState(weatherObj);
    const [weatherIcon, setWeatherIcon] = useState('');
    const [savedCoordinates, setSavedCoordinates] = useState({lat: '', lon: ''})

    // console.log(savedCoordinates)
    
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

    useEffect(() => {
        
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${props.location}&appid=32f3d81b930a554de1f8f5b3e81b903f`)
        .then(function (response) {
            // console.log(response.data);
            setWeatherData({
                weather: response.data.weather[0].main,
                description: response.data.weather[0].description,
                temperature: (response.data.main.temp-273.15).toFixed(1),
                tempMax: (response.data.main.temp_max-273.15).toFixed(1),
                tempMin: (response.data.main.temp_min-273.15).toFixed(1)
            })
            setWeatherIcon(response.data.weather[0].icon)
            setSavedCoordinates({lat: response.data.coord.lat, lon: response.data.coord.lon})
        }).catch(function (error) {
            console.error(error);
        });
    }, [props.location]);

    const imageLink = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    const altImgText = `${weatherData.weather}`;

    return (
        <div>
            <div>
                <img src={imageLink} alt={altImgText}></img>
                <h1>{weatherData.weather}</h1>
                <p>{weatherData.description}</p>
                <h2>{weatherData.temperature}°C</h2>
                <p>Max {weatherData.tempMax}°C</p>
                <p>Min {weatherData.tempMin}°C</p>
            </div>
            <div>
                <WeekCards
                savedCoordinates={savedCoordinates}
                />
            </div>
        </div>
    )
}