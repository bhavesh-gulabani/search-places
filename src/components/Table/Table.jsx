import React, { useEffect, useRef, useState } from 'react';
import { fetchFromAPI } from '../../utils/fetchFromAPI';

import styles from './Table.module.css';

const Table = ({ city }) => {
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [resultsLimit, setResultsLimit] = useState(5);
  const limitInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  let indexOfLastRow = currentPage * rowsPerPage;
  let indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows = null,
    totalPages = 0;

  if (cities) {
    currentRows = cities.slice(indexOfFirstRow, indexOfLastRow);
    totalPages = Math.ceil(cities.length / rowsPerPage);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchResults = async (params) => {
      setIsLoading(true);
      const response = await fetchFromAPI(params);
      setCities(response.data);
      setIsLoading(false);
    };

    if (city) {
      fetchResults({
        namePrefix: city.slice(0, 3),
        limit: resultsLimit,
        countryIds: 'IN',
      });
    }
  }, [city, resultsLimit]);

  // Limiting the API response
  const handleSubmit = (event) => {
    event.preventDefault();
    setResultsLimit(limitInputRef.current.value);
  };

  return (
    <div className={styles.container}>
      {/* Search Results */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            currentRows &&
            currentRows.map((row, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * 3 + (index + 1)}</td>
                <td>{row.city}</td>
                <td className={styles.country}>
                  {row.country}
                  <img
                    src={`https://flagsapi.com/${row.countryCode}/flat/32.png`}
                    alt="country flag"
                  />
                </td>
              </tr>
            ))}

          {isLoading && (
            <tr className={styles.helperText}>
              <td colSpan={3}>
                <div className={styles.loader}></div>
              </td>
            </tr>
          )}
          {city.length === 0 && currentRows.length === 0 && (
            <tr className={styles.helperText}>
              <td colSpan={3}>Start Searching.</td>
            </tr>
          )}
          {!isLoading &&
            city.length > 0 &&
            currentRows &&
            currentRows.length === 0 && (
              <tr className={styles.helperText}>
                <td colSpan={3}>No results found.</td>
              </tr>
            )}
        </tbody>
      </table>

      {/* Pagination */}
      {currentRows && currentRows.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>

          {/* Search Limit */}
          <form onSubmit={handleSubmit} className={styles.limitForm}>
            <input
              type="number"
              min="1"
              max="10"
              ref={limitInputRef}
              placeholder="Limit"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Table;
