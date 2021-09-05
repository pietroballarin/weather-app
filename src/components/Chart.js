import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';



export default function Chart(props) {

    const [hourlyData, setHourlyData] = useState();

    const coordinates = props.savedCoordinates;

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    
    console.log(hourlyData)

    useEffect(() => {

        axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}`)
        .then((response) => {
            const data = response.data.hourly.slice(1, 25)
            console.log(data)
            setHourlyData({
                labels: data.map((hour) => (new Date(hour.dt * 1000)).toLocaleString('en-GB', { timeZone: 'CET' })),
                datasets: [
                    {
                        label: "Hourly Weather",
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'black',
                        borderWidth: 2,
                        data: data.map((temp) => temp.temp-273.15)
                    }
                ]

            })
        })
        .catch((error) => console.log(error))
    }, [coordinates])

    return (
        <div>
            <Line
            data={hourlyData}
            options={{
                title:{
                  display:true,
                  text:'Hourly Weather',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
        </div>
    )
}
