import React, { useState } from 'react';

export default function PriceFilter({ text, handleFilter, min, max }) {
    // Component for the checkbox and text label for the price filter
    // May completely remove if we want to change how we filter 
    // (e.g. let user type min/max instead of giving them predefined min/max)
    
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);

        if (isChecked) {
            handleFilter(min, max);
        } else {
            // Show all items
            handleFilter(0, Infinity); 
        }

    };

    return (
        <div>

            <label>
                {text}
            </label>

            <input
                type="checkbox"
                checked={isChecked}
                onClick={handleChange}
            />

        </div>
    );
}