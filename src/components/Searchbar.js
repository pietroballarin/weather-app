import React from 'react';

export default function Searchbar(props) {


    const handleChange = (e) => {
        props.handleLocationChange(e)
    }
    
    return (
        <div>
            <label>Your Location </label>
            <input
                type="text"
                placeholder="Location"
                onChange={e => handleChange(e.target.value)}
                value={props.location}
            />
        </div>
    )
}
