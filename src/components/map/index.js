import React, { useState, useEffect, useRef } from 'react';
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FlyToInterpolator,
} from 'react-map-gl';

import Geocoder from 'react-map-gl-geocoder';
import DeckGL, { GeoJsonLayer } from 'deck.gl';

import * as pbdb from '../../data/846db.json';

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 41.4211,
    longitude: -74.6903,
    width: '100vw',
    height: '100vh',
    zoom: 4,
  });

  const [searchResultLayer, setSearchResultsLayer] = useState(null);
  const mapRef = useRef();

  const handleOnResult = event => {
    console.log(event.result);
    setSearchResultsLayer(
      new GeoJsonLayer({
        id: 'search-result',
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10,
      })
    );
  };
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedStation(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
  // const _goToNYC = (e) => {
  //   const viewport = {
  //     ...viewport,
  //     longitude: -74.1,
  //     latitude: 40.7,
  //     zoom: 14,
  //     transitionDuration: 5000,
  //     transitionInterpolator: new FlyToInterpolator(),
  //   };
  //   setViewport({ viewport });
  // };

  return (
    <div style={{ height: '100vh' }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        // transitionDuration={1000}
        transitionInterpolator={new FlyToInterpolator()}
      >
        {pbdb.data.map(station => (
          <Marker
            key={station.id}
            longitude={parseFloat(station.geocoding.long)}
            latitude={parseFloat(station.geocoding.lat)}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedStation(station);
              }}
            >
              <img
                src="iconmap.png"
                alt="map marker icon"
                width="20px"
                height="20px"
                backgroundColor="black"
              />
            </button>
          </Marker>
        ))}
        {selectedStation ? (
          <Popup
            latitude={parseFloat(selectedStation.geocoding.lat)}
            longitude={parseFloat(selectedStation.geocoding.long)}
            onClose={() => {
              setSelectedStation(null);
            }}
            style="color: red;"
          >
            <div>
              Incident:
              <h2>{selectedStation.title}</h2>
              <p>
                {selectedStation.city}
                <br></br> {selectedStation.state}
                <br></br>
                {selectedStation.date}
                <br></br>
                {selectedStation.links}
                <br></br>
                {selectedStation.description}
              </p>
            </div>
          </Popup>
        ) : null}
        <Geocoder
          mapRef={mapRef}
          onResult={handleOnResult}
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
      {/* <button onClick={_goToNYC}>New York City</button> */}
    </div>
  );
}
