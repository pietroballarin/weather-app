import React, {useState, useEffect} from 'react'
import Searchbar from './Searchbar';
import axios from 'axios';
console.log(process.env.REACT_APP_WEATHER_KEY)
export default function Main() {

    const [location, setLocation] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event)
    }

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=`)
        .then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    })

    return (
        <div>
            <Searchbar 
            location={location}
            handleLocationChange={handleLocationChange}
            />
        </div>
    )
}
