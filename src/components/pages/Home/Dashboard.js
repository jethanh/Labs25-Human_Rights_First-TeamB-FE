import React, { useState, useEffect } from 'react';
import Map from '../../map/index';
import ListDb from '../../searchDb/index';
import SearchEvents from '../../searchDb/search';
import AsyncHooks from '../../searchDb/searchSubmit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <div className="header">
        <div>
          <img src="/hrf-logo.png" />
        </div>
        <div className="header-right">
          <div className="header-buttons">
            <button className="buttonA">ASYLUM</button>
            <button className="buttonB">DONATE</button>
            <button className="buttonC">TAKE ACTION</button>
          </div>
          <div className="social-icons">
            <a href="https://www.youtube.com/user/HumanRightsFirstOrg">
              <FontAwesomeIcon icon={['fab', 'youtube-square']} />
            </a>
            <a href="https://www.facebook.com/humanrightsfirst">
              <FontAwesomeIcon icon={['fab', 'facebook-square']} />
            </a>
            <a href="https://twitter.com/humanrights1st">
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
          </div>
        </div>
      </div>
      <div className="nav-bar">
        <div className="nav-contents">
          <ul className="nav-list">
            <li>ABOUT</li>
            <li>CAMPAIGNS</li>
            <li>TOPICS</li>
            <li>RESOURCES</li>
            <li>MEDIA</li>
            <li>VETS FOR AMERICAN IDEALS</li>
          </ul>
        </div>
      </div>
      <div className="main-container">
        <div className="left-cta"></div>

        <div className="map-container">
          <div>
            <h2 className="map-header">Incidents of Police Brutality</h2>
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
        </div>
      </div>
    </>
  );
};
export default Dashboard;
