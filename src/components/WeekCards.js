import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeekCards(props) {

    const [weeklyData, setWeeklyData] = useState([])

    const coor = props.savedCoordinates

    useEffect(() => {
        
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coor.lat}&lon=${coor.lon}&exclude=current,minutely,hourly&appid=`)
        .then(function (response) {
            console.log(response.data.daily);
            setWeeklyData({weather: response.data})
        }).catch(function (error) {
            console.error(error);
        });
    }, [coor]);

    return (
        <div>
            <h2></h2>
            <img></img>
            <p></p>
            <p></p>
        </div>
    )
}
