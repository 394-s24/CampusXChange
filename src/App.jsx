import { useState, useEffect } from 'react';
import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import data from './fakedata.json';
import PriceFilter from './components/PriceFilter';
import TagFilter from './components/TagFilter';
import ListingItem from './components/ListingItem';

const App = () => {

  const [filteredItems, setFilteredItems] = useState(data);
  const [activePriceFilter, setActivePriceFilter] = useState(Infinity);
  const [activeTags, setActiveTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filterprices = [10, 25, 50, 75, 100];

  useEffect(() => {
    // min might not be used for now, but I wanted to make this function more general
    let filtered = data.filter(item => item.price <= activePriceFilter);

    // filter by tags
    // if no tags selected do not do anything
    if (activeTags.length > 0) {
      let temp = [];
      activeTags.forEach(tag => {
        temp = [...temp, ...filtered.filter(item => item.tags.includes(tag))];
      });

      filtered = temp;
    }
    if (searchValue.length > 0) {
      // non case-sensitive
      filtered = filtered.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    }

    setFilteredItems(filtered);
  }, [searchValue, activePriceFilter, activeTags])

  const itemslist = filteredItems.map(item => {
    return <ListingItem item={item} />
  });

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="menu-icon">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </div>
        <div className="logo-text">
          CampusXChange
        </div>
        <div className="filter-icon" onClick={handleToggleFilters}>
          <FontAwesomeIcon icon={faFilter} size="lg" />
        </div>
      </div>
      <div className="content">
        {showFilters && (
          <div className="filters-wrapper">
            <div id="tag-filters" className="filter-group">
              <b>category</b>
              <TagFilter text="clothes" value="clothes" activeTags={activeTags} setActiveTags={setActiveTags} />
              <TagFilter text="textbook" value="textbook" activeTags={activeTags} setActiveTags={setActiveTags} />
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
        </div>

        <div className="active-tags-wrapper" style={{"display": activeTags.length > 0 ? "": "none"}}>
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
      <div className="footer">
        <footer>
          <div className="footer-icons">
            <a href="/messages"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="/marketplace"><FontAwesomeIcon icon={faStore} /></a>
            <a href="/user"><FontAwesomeIcon icon={faUser} /></a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
