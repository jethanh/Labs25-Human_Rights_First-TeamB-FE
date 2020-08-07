import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';
import * as pbdb from '../../data/846db.json';

function App() {
  /////////////////////////////////////////////////////////////////////////////////// STATE
  const [viewport, setViewport] = useState({
    latitude: 41.4211,
    longitude: -74.6903,
    width: '75vw',
    height: '75vh',
    zoom: 4,
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchResultLayer, setSearchResultsLayer] = useState(null);

  ///////////////////////////////////////////////////////////////////////////////////  REF
  const mapRef = useRef();
  const geocoderContainerRef = useRef();

  /////////////////////////////////////////////////////////////////////////////////// HANDLERS
  const handleViewportChange = newViewport => {
    setViewport({ ...viewport, ...newViewport });
  };

  const handleMarkerChange = newViewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    setViewport({ ...viewport, ...newViewport, ...geocoderDefaultOverrides });
  };

  const handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 6500 };
    return handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  const handleOnResult = event => {
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

  return (
    <>
      <div>
        <div
          ref={geocoderContainerRef}
          style={{
            height: 50,
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <MapGL
          ref={mapRef}
          {...viewport}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Geocoder
            mapRef={mapRef}
            containerRef={geocoderContainerRef}
            onResult={handleOnResult}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
          <DeckGL {...viewport} layers={[searchResultLayer]}>
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
                    handleMarkerChange({
                      zoom: 11,
                      latitude: parseFloat(station.geocoding.lat),
                      longitude: parseFloat(station.geocoding.long),
                    });
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
                closeOnClick={false}
              >
                <div>
                  <h2>{selectedStation.title}</h2>
                  <h3>
                    {selectedStation.city}, {selectedStation.state}
                  </h3>
                  <p>{selectedStation.date}</p>
                  {selectedStation.links.map(link => (
                    <p>
                      Link:{' '}
                      <a href={link}>
                        <br></br>
                        {link}
                      </a>
                    </p>
                  ))}
                  <p>{selectedStation.description}</p>
                </div>
              </Popup>
            ) : null}
          </DeckGL>
        </MapGL>
      </div>
    </>
  );
}

export default App;
