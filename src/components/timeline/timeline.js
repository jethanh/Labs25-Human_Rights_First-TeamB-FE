import React from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import Moment from 'react-moment';
import axios from 'axios';
import { useState, useEffect } from 'react';

function latest(array, n) {
  return array.slice(0, n);
}

export default function PbTimeline() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get(`https://api.846policebrutality.com/api/incidents`)
        .then(res => {
          setResults(latest(res.data.data, 20));
        })
        .catch(err => {
          console.log(err);
        });
    }

    getData();
  }, []);

  console.log(results);

  return (
    <>
      <div className="tl-header">
        <h2>Timeline of Recent Events</h2>
      </div>
      {results.map(item => (
        <Timeline lineColor={'#ddd'} className="pbTimeline">
          <TimelineItem
            key={item.id}
            dateText={<Moment format="MM-DD-YYYY">{item.date}</Moment>}
            style={{ color: '#bc541e' }}
          >
            <h3>
              <a href={item.links[0]}>{item.title}</a>
            </h3>
            <h4>
              {item.city}, {item.state}
            </h4>
            {item.tags.map(element => (
              <span className="timeline-tags">{element}</span>
            ))}
            {/* <p>
              Sources: <br />
              {item.links.map(element => (
                <a href={element}>
                  {' '}
                  Link {item.links.indexOf(`${element}`) + 1} <br />{' '}
                </a>
              ))}
            </p> */}
          </TimelineItem>
        </Timeline>
      ))}
    </>
  );
}
