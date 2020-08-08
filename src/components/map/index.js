import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import '../../main.css';
import mapStyles from './mapStyles';

import * as pbdb from '../../data/846db.json';

const newData = pbdb.data.map(item => {
  const x = item.geocoding.lat;
  const y = item.geocoding.long;
  return {
    ...item,
    geocoding: {
      lat: parseFloat(x) + 2 * 0.04 * (Math.random() - 0.5),
      long: parseFloat(y) + 2 * 0.04 * (Math.random() - 0.5),
    },
  };
});

console.log(newData);

function Map() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 40.7188, lng: -73.9901 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {newData.map(incident => (
        <div>
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
        </div>
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
            <p>Date:{selectedIncident.date}</p>
            <p></p>
            <p></p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));
export default function App() {
  return (
    <div style={{ width: '40vw', height: '40vh' }}>
      <WrappedMap
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCdgQinpBF_rWLJIJJzG9ZhiXDuHtTzz8U'
        }
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
