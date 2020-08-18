import React, { useState, useEffect } from 'react';
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from 'react-twitter-embed';
import Collapsible from 'react-collapsible';
import Moment from 'react-moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Parse from 'twitter-url-parser';
function useHook(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.846policebrutality.com/api/incidents`
        );
        const json = await response.json();

        setResults(
          json.data.map(item => {
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

export default function AsyncHooks() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = useHook(query);
  const [middle, setMiddle] = useState('');
  // Middle is used to as middle layer between main state and query state.
  // This is required to prevent the component from automatically updating onChange.
  console.log(search);
  console.log(results);

  const filteredResults = results.filter(
    item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.state.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredResults);
  return (
    <div>
      <h1>Search Events </h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
          setQuery(middle);
          setSearch(middle); // set our search state/main state to reflect the middle state.
        }}
      >
        <input
          value={middle}
          onChange={
            e => {
              setMiddle(e.target.value);
            } // set our middle layer of state
          }
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
      <br />
      <div className="searchResults">
        {loading ? (
          <h1>LOADING</h1>
        ) : (
          filteredResults.map(entry => (
            <>
              <Collapsible
                trigger={entry.title}
                triggerSibling={() => (
                  <>
                    <div className="sibling">
                      {entry.city}, {entry.state}.{' '}
                      <Moment format="dddd-DD-MMMM-YYYY">{entry.date}</Moment>
                    </div>

                    <hr></hr>
                  </>
                )}
                lazyRender={true}
                transitionTime={100}
                overflowWhenOpen={'hidden'}
              >
                <h3>
                  {entry.title} -- {entry.date}
                </h3>
                <p>
                  {entry.city}, {entry.state}
                </p>
              </Collapsible>
            </>
          ))
        )}
      </div>
    </div>
  );
}
