import React, {useState, useEffect} from 'react'
import Searchbar from './Searchbar';
import axios from 'axios';



export default function Main() {

    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState({weather: '', description: '', temperature: ''})

    const handleLocationChange = (event) => {
        setLocation(event)
    }

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=`)
        .then(function (response) {
            setWeatherData({
                weather: response.data.weather[0].main,
                description: response.data.weather[0].description,
                temperature: response.data.main.temp
            })
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    });

    return (
        <div>
            <Searchbar 
            location={location}
            handleLocationChange={handleLocationChange}
            />
            <h1>{weatherData.weather}</h1>
            <p>{weatherData.description}</p>
            <h2>{weatherData.temperature}</h2>
        </div>
    )
}
