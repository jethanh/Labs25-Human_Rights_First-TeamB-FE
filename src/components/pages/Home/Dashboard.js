import React, { useState, useEffect } from 'react';
import Map from '../../map/index';
import AsyncHooks from '../../searchDb/searchSubmit';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import PbTimeline from '../../timeline/timeline';
import HeaderNav from '../Home/HeaderNav';

library.add(fab);

const Dashboard = () => {
  // We should have put our API calls here and passed them down as props. This would be a good thing to refactor.
  // Currently, API calls are made in each component. Although it's likely not too much
  // of in issue, it would cause an unnecessary amount of API calls given high traffic.
  // However, on a project of this scale, I don't think is poses *too much* of a problem.

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
