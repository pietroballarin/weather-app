import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeekCards(props) {

    const [weeklyData, setWeeklyData] = useState([]);

    const coor = props.savedCoordinates;

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coor.lat}&lon=${coor.lon}&exclude=current,minutely,hourly&appid=`)
        .then(function (response) {
            setWeeklyData(response.data.daily)
        }).catch(function (error) {
            console.error(error);
        });
    }, [coor]);

    return (
        <div className="weekday-box">
        {weeklyData.slice(1).map(function(day, index) {
            return (
                <div key={index} className="single-weekday-box">
                    <h2>{(new Date(day.dt * 1000)).toLocaleString("en-US", {weekday: "short", day: "numeric", month: "short"})}</h2>
                    <img 
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].main}
                    >
                    </img>
                    <h3>{day.weather[0].main}</h3>
                    <p>{(day.temp.day - 273.15).toFixed(1)}°C</p>
                </div>
            )   
        })}
        </div>
    )
}
