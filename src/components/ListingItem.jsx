import React, { useState } from 'react';
import "./ListingItem.css";
import defaultImage from "../resources/images/image.png";

export default function ListingItem({ item, handleSelect }) {

    return (
        <>
            <div className='item-wrapper' onClick={() => handleSelect(item)}>
                <div className="item-image-wrapper">
                    <img className="item-image" src={defaultImage}/>
                </div>
                <div className="item-info-wrapper">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">{item.price}</div>
                    <br />
                    <div className="item-description">{item.description}</div>
                </div>
            </div>
        </>
    );
}