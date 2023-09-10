import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FilterBar from './FilterBar';

export default function SearchBar({
  onSearch,
  onLetterFilter,
  onPriceFilter,
  onDateFilter,
  dateFilter,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container className=''>
      <div className='row w-100 d-flex justify-content-center align-items-center'>
        <div className='col-md-9'>
          <div className='search'>
            <i className='fa fa-search'></i>
            <input
              type='text'
              className='form-control'
              placeholder='Search products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className='btn btn-primary search-btn'
              onClick={handleSearch}
            >
              Search
            </button>
            {/* <button className="btn btn-primary filter-btn" onClick={handleSearch}> */}
            <FilterBar
              onLetterFilter={onLetterFilter}
              onPriceFilter={onPriceFilter}
              onDateFilter={onDateFilter}
              dateFilter={dateFilter}
            />
            {/* </button> */}
          </div>
        </div>
      </div>
    </Container>
  );
}
