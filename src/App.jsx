import { useState } from 'react';
import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import data from './fakedata.json';
import PriceFilter from './components/PriceFilter';

const App = () => {

  const [filteredItems, setFilteredItems] = useState(data);

  const handleFilter = (min, max) => {
    // min might not be used for now, but I wanted to make this function more general
    const filtered = data.filter(item => item.price <= max && item.price >= min);
    setFilteredItems(filtered);

  }

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

        <PriceFilter text="under 100" handleFilter={handleFilter} min={0} max={100} />

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
