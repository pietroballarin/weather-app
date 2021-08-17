import React, {useState, useEffect} from 'react'
import Searchbar from './Searchbar';
import axios from 'axios';

export default function Main() {

    const [location, setLocation] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event)
    }


    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=32f3d81b930a554de1f8f5b3e81b903f`)
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
