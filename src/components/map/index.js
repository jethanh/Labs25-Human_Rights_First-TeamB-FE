import React from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from 'react-google-maps';
import * as pbdb from '../../data/846db.json';

const noise = coord => {
  const scale = 2 * 0.1;
  return parseFloat(coord) + scale * (Math.random() - 0.5);
};

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    >
      {pbdb.data.map(incident => (
        <Marker
          key={incident.id}
          position={{
            lat: noise(incident.geocoding.lat),
            lng: noise(incident.geocoding.long),
          }}
        ></Marker>
      ))}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCdgQinpBF_rWLJIJJzG9ZhiXDuHtTzz8U`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
