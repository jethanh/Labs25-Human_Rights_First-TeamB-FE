////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// IMPORTS
import React, { useState, useRef } from 'react';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import Moment from 'react-moment';
import '../../main.css';
import mapStyles from './mapStyles';
import clusterStyles from './clusterStyles';

import * as pbdb from '../../data/846db.json';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// GLOBAL TINGS
const newData = pbdb.data.map(item => {
  /////////////////////////////////////////////////////////////////////////////////////////////
  // This spreads out markers that so we don't have hundreds of markers on the same coords.  //
  // Data coming from social media doesn't always provide exact coordinates.                 //
  // coordinates are usually derived from the area mentioned in the post via geocoding.      //
  // ( i.e. Hundreds of incidents are reported in Portland via Twitter...                    //
  //     ...the coordinates are identical, we need to spread them out reasonably. )          //
  //                                                                                         //
  //                                                                                         //
  //       TODO: Explore spidering markers - a bit more technically demanding!               //
  /////////////////////////////////////////////////////////////////////////////////////////////

  return {
    ...item,
    geocoding: {
      lat: parseFloat(item.geocoding.lat) + 2 * 0.04 * (Math.random() - 0.5),
      long: parseFloat(item.geocoding.long) + 2 * 0.04 * (Math.random() - 0.5),
    },
  };
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// MAP
function Map() {
  const [selectedIncident, setSelectedIncident] = useState(null);

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 40.7188, lng: -73.9901 }}
      defaultOptions={{ styles: mapStyles }}
      yesIWantToUseGoogleMapApiInternals
    >
      <MarkerClusterer
        clusterClass="clusterClass"
        gridSize={80}
        minimumClusterSize={5}
        styles={clusterStyles}
      >
        {newData.map(incident => (
          <Marker
            markerClass="clusterClass"
            key={incident.id}
            position={{
              lat: parseFloat(incident.geocoding.lat),
              lng: parseFloat(incident.geocoding.long),
            }}
            onClick={() => {
              setSelectedIncident(incident);
            }}
          ></Marker>
        ))}
        {selectedIncident && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedIncident.geocoding.lat),
              lng: parseFloat(selectedIncident.geocoding.long),
            }}
            onCloseClick={() => {
              setSelectedIncident(null);
            }}
          >
            <div>
              <h2>Incident Information:</h2>
              <h3>{selectedIncident.title}</h3>
              <p>
                Location: {selectedIncident.city}, {selectedIncident.state}{' '}
              </p>
              <p>
                Date:
                <Moment format="dddd, MMMM DD, YYYY">
                  {selectedIncident.date}
                </Moment>
              </p>
              <div className="refLinks">
                <p>
                  {' '}
                  {selectedIncident.links.map(element => (
                    <a href={element} className="search-links" target="_blank">
                      {' '}
                      &#8226; {element} <br />{' '}
                    </a>
                  ))}
                </p>
              </div>
              <p></p>
            </div>
          </InfoWindow>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// EXPORTED MAP
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: '60vw', height: '50vh' }}>
      <WrappedMap
        googleMapURL={process.env.REACT_APP_GOOGLE_TOKEN}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// END
