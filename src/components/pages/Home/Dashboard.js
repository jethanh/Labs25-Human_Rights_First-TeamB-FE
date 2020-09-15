import React, { useState, useEffect } from 'react';
import Map from '../../map/index';
import ListDb from '../../searchDb/index';
import SearchEvents from '../../searchDb/search';
import AsyncHooks from '../../searchDb/searchSubmit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import PbTimeline from '../../timeline/timeline';
import HeaderNav from '../Home/HeaderNav';

library.add(fab);

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <HeaderNav />
      <div className="main-container">
        {' '}
        {/* Everything under header/nav is inside this main-container */}
        <div className="left-cta"></div>{' '}
        {/* left-cta is the left side grey area and anythihng inside of it */}
        <div className="map-container">
          <div>
            <h2>Incidents of Police Brutality</h2>
          </div>
          <Map />
          <div className="below-map">
            <div className="searches">
              <AsyncHooks />
            </div>
            <div className="placeholder">
              <img src="/placeholder.png" alt="placeholder" />
            </div>
          </div>
          <div className="timeline-container">
            <PbTimeline />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
