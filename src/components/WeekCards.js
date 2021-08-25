import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeekCards(props) {

    const [weeklyData, setWeeklyData] = useState([])

    console.log(weeklyData.map(day=>day.temp.day))

    const coor = props.savedCoordinates

    const weekDaysArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    useEffect(() => {
        
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coor.lat}&lon=${coor.lon}&exclude=current,minutely,hourly&appid=32f3d81b930a554de1f8f5b3e81b903f`)
        .then(function (response) {
            console.log(response.data.daily);
            setWeeklyData(response.data.daily)
        }).catch(function (error) {
            console.error(error);
        });
    }, [coor]);

    return (
        <div>
            {weekDaysArr.map(function(day, index){
                return (
                    <div key={index}>
                        <h2>{day}</h2>
                    </div>
                )
            })}

            {weeklyData.map(function (day, index){
                return (
                    <div key={index}>
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
