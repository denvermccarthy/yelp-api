import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './services/components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState('97214');
  const [typedZip, setTypedZip] = useState('');
  const [query, setQuery] = useState('');
  const [typedQuery, setTypedQuery] = useState('');

  // TODO -- add state for zip / search and add event listeners to the inputs

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses(zip, query);
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, [zip, query]);

  // TODO -- add event for button click to handle calling fetchBusinesses with zip / search
  const searchHandler = () => {
    setQuery(typedQuery);
    setZip(typedZip);
  };

  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input
            type="number"
            placeholder="zip"
            value={typedZip}
            onChange={(e) => setTypedZip(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input
            type="text"
            placeholder="Search..."
            value={typedQuery}
            onChange={(e) => setTypedQuery(e.target.value)}
          />
        </div>
        <button onClick={searchHandler}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses?.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}

export default App;
