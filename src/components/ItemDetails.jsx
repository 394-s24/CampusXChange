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
                    <div className="item-details-name">{item.Name}</div>
                    <div className="item-details-price">{item.Price}</div>
                    <br />
                    <div className="item-details-description">{item.Description}</div>
                    <br />
                    <div className="item-details-tags">
                        {
                            item.Tags.map(tag =>
                                <div className="item-details-tag">{tag}</div>
                            )
                        }
                    </div>
                </div>
                <div className="item-details-footer">
                    <div className="item-details-seller-info">
                        Seller: <span>{item.Username}</span>
                        <br />
                        Rating: <span>5.5/5.0</span>
                    </div>
                    <a href="/contact">
                        <div className="item-details-contact">
                            Message
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}