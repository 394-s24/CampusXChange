import { useState, useEffect } from 'react';
import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import data from './fakedata.json';
import PriceFilter from './components/PriceFilter';

const App = () => {

  const [filteredItems, setFilteredItems] = useState(data);
  const [activePriceFilter, setActivePriceFilter] = useState(Infinity);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    // min might not be used for now, but I wanted to make this function more general
    const filtered = data.filter(item => item.price <= activePriceFilter);
    setFilteredItems(filtered);
  }, [activePriceFilter])

  const itemslist = filteredItems.map(item => {
    return (
      <div className='item-wrapper'>
        <div>itemid: {item.itemid}</div>
        <div>name: {item.name}</div>
        <div>tags: {item.tags}</div>
        <div>price: {item.price}</div>
        <div>description: {item.description}</div>
      </div>
    )
  });

  return (
    <div className="App">
      <div className="header">
        <div className="menu-icon">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </div>
        <div className="logo-text">
          CampusXChange
        </div>
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
      </div>
      <div className="content">

        <div id="price-filters" className="filter-group">
          <PriceFilter text="under 10" activeFilter={activePriceFilter} setFilter={setActivePriceFilter} min={0} max={10} />
          <PriceFilter text="under 25" activeFilter={activePriceFilter} setFilter={setActivePriceFilter} min={0} max={25} />
          <PriceFilter text="under 50" activeFilter={activePriceFilter} setFilter={setActivePriceFilter} min={0} max={50} />
          <PriceFilter text="under 75" activeFilter={activePriceFilter} setFilter={setActivePriceFilter} min={0} max={75} />
          <PriceFilter text="under 100" activeFilter={activePriceFilter} setFilter={setActivePriceFilter} min={0} max={100} />
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
            <a href="/filter"><FontAwesomeIcon icon={faFilter} /></a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
