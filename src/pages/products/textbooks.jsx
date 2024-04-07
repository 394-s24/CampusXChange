import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';

/* Firebase */
import { DataSnapshot, onValue } from "firebase/database";

/* Components */
import PriceFilter from '../../components/PriceFilter';
import TagFilter from '../../components/TagFilter';
import ListingItem from '../../components/ListingItem';
import ItemDetails from '../../components/ItemDetails';

export default function TextBooks({ textbookCountRef }) {

    const [activePriceFilter, setActivePriceFilter] = useState(Infinity);
    const [activeTags, setActiveTags] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedItem, setSelectedItem] = useState("")
    const [data, setData] = useState([]);
    const [filteredItems, setFilteredItems] = useState(data);

    const filterprices = [10, 25, 50, 75, 100];

    useEffect(() => {
        // retrieve data from firebase realtime db
        onValue(textbookCountRef, (snapshot) => {
            setData(snapshot.val());
        });

        // min might not be used for now, but I wanted to make this function more general
        let filtered = data.filter(item => item.Price <= activePriceFilter);

        // filter by tags
        // if no tags selected do not do anything
        if (activeTags.length > 0) {
            let temp = [];
            activeTags.forEach(tag => {
                temp = [...temp, ...filtered.filter(item => item.Tags.includes(tag))];
            });

            filtered = temp;
        }
        if (searchValue.length > 0) {
            // non case-sensitive
            filtered = filtered.filter(item => item.Name.toLowerCase().includes(searchValue.toLowerCase()))
        }

        setFilteredItems(filtered);
    }, [searchValue, activePriceFilter, activeTags, data])

    const itemslist = filteredItems.map(item => {
        return <ListingItem item={item} handleSelect={setSelectedItem} />
    });

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    }

    return (
        <div className="content">
            {selectedItem && (
                <ItemDetails item={selectedItem} toggleDetails={setSelectedItem}/>
            )}

            {showFilters && (
                <div className="filters-wrapper">
                    <div id="tag-filters" className="filter-group">
                        <b>category</b>
                        <TagFilter text="ANTHRO 213" value="ANTHRO 213" activeTags={activeTags} setActiveTags={setActiveTags} />
                        <TagFilter text="ASTRO 110" value="ASTRO 110" activeTags={activeTags} setActiveTags={setActiveTags} />
                        <TagFilter text="BIO 217" value="BIO 217" activeTags={activeTags} setActiveTags={setActiveTags} />
                        <TagFilter text="CHEM 171" value="CHEM 171" activeTags={activeTags} setActiveTags={setActiveTags} />
                        <TagFilter text="EA 1" value="EA 1" activeTags={activeTags} setActiveTags={setActiveTags} />
                    </div>

                    <div id="price-filters" className="filter-group">
                        <b>price</b>
                        {filterprices.map(price => <PriceFilter text={`under $${price}`} activeFilter={activePriceFilter} setFilter={setActivePriceFilter} min={0} max={price} />)}
                    </div>
                </div>
            )}

            <div className="search-bar-wrapper">
                <div className="search-bar">
                    <input className="search-input"
                        name=""
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Search for an item"
                    />
                </div>
                <div style={{"width":"1rem"}} />
                <div className="filter-icon" onClick={handleToggleFilters}>
                    <FontAwesomeIcon icon={faFilter} size="lg" />
                </div>
            </div>

            <div className="active-tags-wrapper" style={{ "display": activeTags.length > 0 ? "" : "none" }}>
                Tag Filters:
                <div className="active-tags">
                    {activeTags.map(activeTag =>
                        <div className="active-tag">
                            {activeTag}
                            <div
                                className="cancel-tag"
                                onClick={() => setActiveTags(activeTags.filter(tag => tag !== activeTag))}
                            >
                                x
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="items-wrapper">
                {itemslist}
            </div>
        </div>

    );
}