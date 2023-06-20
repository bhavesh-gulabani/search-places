import { useState } from 'react';
import './App.css';

import { SearchBox, Table } from './components';

function App() {
  const [city, setCity] = useState('');

  const handleSubmit = (searchTerm) => {
    setCity(searchTerm);
  };
  return (
    <>
      <header>
        <h2 className="header">Search Places</h2>
        <SearchBox onSubmit={handleSubmit} />
      </header>
      <main>
        <Table city={city} />
      </main>
    </>
  );
}

export default App;
