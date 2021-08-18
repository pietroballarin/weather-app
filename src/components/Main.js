import React, {useState, useEffect} from 'react'
import Searchbar from './Searchbar';
import MainCard from './MainCard';

export default function Main() {

    const [location, setLocation] = useState('Berlin');

    const handleLocationChange = (event) => {
        setLocation(event)
    }
    return (
        <div>
            <Searchbar 
            location={location}
            handleLocationChange={handleLocationChange}
            />
            <MainCard
            location={location}
            />
        </div>
    )
}
