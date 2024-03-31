import React, { useState } from 'react';

export default function TagFilter({ text, value, activeTags, setActiveTags }) {
    // Component for the checkbox and text label for the price filter
    // May completely remove if we want to change how we filter 
    // (e.g. let user type min/max instead of giving them predefined min/max)

    const handleChange = () => {
        if (activeTags.includes(value)) {
            setActiveTags(activeTags.filter(tag => tag !== value));
        } else {
            setActiveTags([...activeTags, value]);
        }
        activeTags.map(tag => console.log(tag));
    };

    return (
        <>
            <div>
                <label>
                    {text}
                </label>
                <input
                    type="checkbox"
                    checked={activeTags.includes(value)}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}