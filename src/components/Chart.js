import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function Chart(props) {

    const [hourlyData, setHourlyData] = useState();

    const coordinates = props.savedCoordinates;

    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
    
    console.log(hourlyData)

    useEffect(() => {

        axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,daily,alerts&appid=`)
        .then((response) => {
            const data = response.data.hourly.slice(0,23)
            console.log(data)
            setHourlyData([{
                labels: data.map((hour) => (new Date(hour.dt * 1000)).toLocaleString("en-US", {weekday: "short", day: "numeric", month: "short"})),
                datasets: [
                    {
                        label: "Hourly Weather",
                        data: data.map((temp) => temp.temp-273.15),
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                          ]
                    }
                ]

            }])
        })
        .catch((error) => console.log(error))
    }, [coordinates])

    return (
        <div>
        
        </div>
    )
}
