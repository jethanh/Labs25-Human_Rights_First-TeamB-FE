import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

import * as pbdb from '../../data/846db.json';

const noise = coord => {
  const scale = 2 * 0.1;
  return parseFloat(coord) + scale * (Math.random() - 0.5);
};

const newData = pbdb.data.map(item => {
  const x = item.geocoding.lat;
  const y = item.geocoding.long;
  return {
    ...item,
    geocoding: {
      lat: parseFloat(x) + 2 * 0.05 * (Math.random() - 0.5),
      long: parseFloat(y) + 2 * 0.05 * (Math.random() - 0.5),
    },
  };
});

console.log(newData);

function Map() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  return (
    <GoogleMap
      defaultZoom={4.5}
      defaultCenter={{ lat: 40.98832580000001, lng: -102.26435190000001 }}
    >
      {newData.map(incident => (
        <Marker
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
        // <InfoWindow
        //   position={{
        //     lat: parseFloat(selectedIncident.geocoding.lat),
        //     lng: parseFloat(selectedIncident.geocoding.long),
        //   }}
        //   onCloseClick={() => {
        //     setSelectedIncident(null);
        //   }}
        // >
        <div>
          <h2>Incident Information:</h2>
          <h3>{selectedIncident.title}</h3>
          <p>
            Location: {selectedIncident.city}, {selectedIncident.state}{' '}
          </p>
          <p>Date:{selectedIncident.date}</p>
          <p></p>
          <p></p>
        </div>
        // </InfoWindow>
      )}
    </GoogleMap>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));
export default function App() {
  return (
    <div style={{ width: '75vw', height: '75vh' }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCdgQinpBF_rWLJIJJzG9ZhiXDuHtTzz8U`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
