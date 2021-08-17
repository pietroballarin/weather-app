import React, {useState} from 'react'
import Searchbar from './Searchbar';

export default function Main() {

    const [location, setLocation] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event)
    }

    return (
        <div>
            <Searchbar 
            location={location}
            handleLocationChange={handleLocationChange}
            />
        </div>
    )
}
