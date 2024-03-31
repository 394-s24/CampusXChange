import { useState, useEffect } from 'react';
import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faLessThan } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import data from './fakedata.json';
import PriceFilter from './components/PriceFilter';
import TagFilter from './components/TagFilter';

const App = () => {

  const [filteredItems, setFilteredItems] = useState(data);
  const [activePriceFilter, setActivePriceFilter] = useState(Infinity);
  const [activeTags, setActiveTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
      filtered = filtered.filter(item => item.name.includes(searchValue))
    }

    setFilteredItems(filtered);
  }, [searchValue, activePriceFilter, activeTags])

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


  const handleSearch = () => {
    setSearchValue(searchValue);
    if (searchValue.length >= 1) {


      setActiveTags(activeTags.filter(tag => tag !== value));
      } else {
        setActiveTags([...activeTags, value]);
      }
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
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
      </div>
      <div className="content">
        <div className="filters-wrapper">
          <div id="tag-filters" className="filter-group">
            <TagFilter text="clothes" value="clothes" activeTags={activeTags} setActiveTags={setActiveTags} />
            <TagFilter text="textbook" value="textbook" activeTags={activeTags} setActiveTags={setActiveTags} />
          </div>

          <div id="price-filters" className="filter-group">
            {filterprices.map(price => <PriceFilter text={`under ${price}`} activeFilter={activePriceFilter} setFilter={setActivePriceFilter} min={0} max={price} />)}
          </div>
        </div>
        <div className="search-bar">
          <input name="" onChange={(event) => setSearchValue(event.target.value)}/>
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
