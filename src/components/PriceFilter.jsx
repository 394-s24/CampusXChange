import React, { useState } from 'react';

export default function PriceFilter({ text, activeFilter, setFilter, min, max }) {
    // Component for the checkbox and text label for the price filter
    // May completely remove if we want to change how we filter 
    // (e.g. let user type min/max instead of giving them predefined min/max)

    const handleChange = () => {
        if (activeFilter == max) {
            setFilter(Infinity)
        } else {
            setFilter(max)
        }
    };

    return (
        <>
            <div>
                <label>
                    {text}
                </label>
                <input
                    type="checkbox"
                    checked={activeFilter == max}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}