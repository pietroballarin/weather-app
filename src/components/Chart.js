import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';



export default function Chart(props) {

    const [hourlyData, setHourlyData] = useState();
    const [hourlyWeatherIcon, setHourlyWeatherIcon] = useState([]);

    console.log(hourlyWeatherIcon.map(function(element){
        return element.weather[0].icon
    }))

    const coordinates = props.savedCoordinates;

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    let width, height, gradient;

    function getGradient(ctx, chartArea) {

        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (gradient === null || width !== chartWidth || height !== chartHeight) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed
            width = chartWidth;
            height = chartHeight;
            gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'blue');
            gradient.addColorStop(0.4, 'green')
            gradient.addColorStop(0.7, 'yellow');
            gradient.addColorStop(1, 'red');
        }

        return gradient;
    }

    useEffect(() => {

        axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,daily,alerts&appid=`)
        .then((response) => {
            const data = response.data.hourly.slice(1, 25)
            setHourlyWeatherIcon(data.map(el => el))
            setHourlyData({
                labels: data.map((hour) => (new Date(hour.dt * 1000)).toLocaleString('en-GB', { timeZone: 'CET', hour: '2-digit' })),
                datasets: [
                    {
                        label: "Hourly Temperature",
                        fill: false,
                        lineTension: 0.8,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: function(context) {
                            const chart = context.chart;
                            const {ctx, chartArea} = chart;
                    
                            if (!chartArea) {
                              // This case happens on initial chart load
                              return null;
                            }
                            return getGradient(ctx, chartArea);
                          },
                        borderWidth: 2,
                        data: data.map((temp) => temp.temp-273.15),
                        image: 1,
                    }
                ]
            })
        })
        .catch((error) => console.log(error))
    }, [coordinates])

    

    return (
        <div classname="chart">
            <Line
            data={hourlyData}
            options={{
                title:{
                  display:true,
                  text:'Hourly Weather',
                  fontSize:20,
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
            <div className="hourly-icons">
                {hourlyWeatherIcon.map(function(el, index) {
                    return (
                        <div key={index}>
                            <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
