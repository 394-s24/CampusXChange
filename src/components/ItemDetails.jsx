import React, { useState } from 'react';
import "./ItemDetails.css";
import defaultImage from "../resources/images/image.png";

export default function ItemDetails({ item }) {

    return (
        <>
            <div className='item-details-wrapper'>
                <div className="item-details-image-wrapper">
                    <img className="item-details-image" src={defaultImage} />
                </div>
                <div className="item-details-info-wrapper">
                    <div className="item-details-name">{item.name}</div>
                    <div className="item-details-price">{item.price}</div>
                    <br />
                    <div className="item-details-description">{item.description}</div>
                    <br />
                    <div className="item-details-tags">
                        {
                            item.tags.map(tag =>
                                <div className="item-details-tag">{tag}</div>
                            )
                        }
                    </div>
                </div>
                <div className="item-details-footer">
                        <div className="item-details-seller-info">
                            Seller: <span>Team Orange</span> 
                            <br/>
                            Rating: <span>5.5/5.0</span>
                        </div>
                        <div className="item-details-contact">
                            Message
                        </div>
                    </div>
            </div>
        </>
    );
}