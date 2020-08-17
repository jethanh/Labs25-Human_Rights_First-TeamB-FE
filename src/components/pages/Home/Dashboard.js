import React, { useState, useEffect } from 'react';
import Map from '../../map/index';
import ListDb from '../../searchDb/index';
import SearchEvents from '../../searchDb/search';
const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <div className="header">
        {' '}
        {/* The whitespace before the blue navbar */}
        <img src="/hrf-logo.png" /> {/* header logo image */}
      </div>
      <div className="nav-bar"></div> {/* HRF Blue nav bar */}
      <div className="main-container">
        {' '}
        {/* Currently holds everything below the blue nav */}
        <div className="left-cta"></div> {/* Left side grey area */}
        <div className="map-container">
          {' '}
          {/* Holds Map + h3 header */}
          <div>
            <h3>Incidents of Police Brutality</h3>
          </div>
          <Map />
          <div className="searchBar">
            <SearchEvents
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <ListDb searchValue={searchValue} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
