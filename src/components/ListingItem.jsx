import React, { useState } from 'react';
import "./ListingItem.css";
import defaultImage from "../resources/images/image.png";

export default function ListingItem({ item, handleSelect }) {

    return (
        <>
            <div className='item-wrapper' onClick={() => handleSelect(item)}>
                <div className="item-image-wrapper">
                    <img className="item-image" src={defaultImage} />
                </div>
                <div className="item-info-wrapper">
                    <div className="item-name">{
                        item.Name.length > 50 ? item.Name.substring(0, 50) + "..." : item.Name
                    }</div>
                    <div className="item-price">{item.Price}</div>
                    <div className="item-description">
                        {"Authors:  "}
                        {
                            item.Authors.map((author, i) =>
                                <span key={author}>{author}{i === item.Authors.length - 1 ? "" : ", "}</span>
                            )
                        }
                    </div>
                    <div className="item-condition">
                        Edition: <span>{item.Edition}</span>
                    </div>
                    <div className="item-condition">
                        Condition: <span>{item.Condition}</span>
                    </div>
                </div>
            </div>
        </>
    );
}