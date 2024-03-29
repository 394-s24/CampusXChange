import { useState } from 'react';
import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {

  // itemid -> name (string), price (number), description (string), tags(list)
  const items = {
    '1': {
      'name': 'Used pencil',
      'price': 1,
      'description': 'Oldie but goodie.',
      'tags': ['cheap']
    }
  };

  const itemslist = Object.keys(items).map(item => {
    return (
      <div className='item-wrapper'>
        <div>name: {items[item]['name']}</div>
        <div>tags: {items[item]['tags']}</div>
        <div>price: {items[item]['price']}</div>
        <div>description: {items[item]['description']}</div>
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
