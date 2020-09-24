import React, { useState, useEffect } from 'react';
import Map from '../../map/index';
import AsyncHooks from '../../searchDb/searchSubmit';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import PbTimeline from '../../timeline/timeline';
import HeaderNav from '../Home/HeaderNav';
import Footer from '../Home/Footer';
import axios from 'axios';

library.add(fab);

const Dashboard = () => {
  // We should have put our API calls here and passed them down as props. This would be a good thing to refactor.
  // Currently, API calls are made in each component. Although it's likely not too much
  // of in issue, it would cause an unnecessary amount of API calls given high traffic.
  // However, on a project of this scale, I don't think is poses *too much* of a problem.
  function latest(array, n) {
    return array.slice(0, n);
  }

  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [middle, setMiddle] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function getData() {
      await axios
        .get(`https://api.846policebrutality.com/api/incidents`)
        .then(res => {
          setResults(latest(res.data.data, 10));
        })
        .catch(err => {
          console.log(err);
        });
    }

    getData();
  }, []);

  function useHook(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          const response = await fetch(
            `https://labs25-hrf-teamb-api.herokuapp.com/api`
          );
          const json = await response.json();
          setResults(
            json.map(item => {
              return item;
            })
          );
        } finally {
          setLoading(false);
        }
      }
      if (query !== '') {
        fetchData();
      }
    }, [query]);
    return [results, loading];
  }

  return (
    <>
      <HeaderNav />
      <div className="main-container">
        {/* Everything under header/nav is inside this main-container */}
        {/* left-cta is the left side grey area and anythihng inside of it */}
        <div className="map-container">
          <Map />
          <div className="below-map">
            <div className="searches">
              <AsyncHooks
                search={search}
                setSearch={setSearch}
                middle={middle}
                setMiddle={setMiddle}
                query={query}
                setQuery={setQuery}
                useHook={useHook}
              />
            </div>
            <div className="placeholder">
              placeholder for data vizualization
            </div>
          </div>
          <div className="timeline-container">
            <PbTimeline
              results={results}
              setResults={setResults}
              setMiddle={setMiddle}
              setSearch={setSearch}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
