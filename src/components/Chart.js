import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function Chart(props) {

    const [hourlyData, setHourlyData] = useState([]);

    const coordinates = props.savedCoordinates;

    const APIKey = process.env.REACT_APP_WEATHER_API_KEY
    
    console.log(APIKey)

    useEffect(() => {

        axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,daily,alerts&appid=`+ APIKey)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => console.log(error))
    })

    return (
        <div>
            
        </div>
    )
}
