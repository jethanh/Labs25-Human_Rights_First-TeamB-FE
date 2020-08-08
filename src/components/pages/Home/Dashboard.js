import React, { useState, useEffect } from 'react';
import Map from '../../map/index';

const Dashboard = () => {
  return (
    <>
      <div className="header">
        <img src="/hrf-logo.png" />
      </div>
      <div className="nav-bar"></div>

      <div className="main-container">
        <div className="left-cta"></div>
        <div className="map-container">
          <div>
            <h3>Incidents of Police Brutality</h3>
          </div>
          <Map />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
