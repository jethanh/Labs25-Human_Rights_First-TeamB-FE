import React, { useState } from 'react';
import * as pbdb from '../../data/846db.json';
import Collapsible from 'react-collapsible';
import Moment from 'react-moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
import Parse from 'twitter-url-parser';

export default function ListDb({ searchValue }) {
  const [selectedEntry, setSelectedEntry] = useState('');
  const filteredEvents = pbdb.data.filter(
    entry =>
      entry.city.toLowerCase().includes(searchValue.toLowerCase()) ||
      entry.state.toLowerCase().includes(searchValue.toLowerCase()) ||
      entry.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  console.log(selectedEntry);

  return (
    <div className="searchList">
      {filteredEvents.map(entry => (
        <Collapsible
          onTriggerOpening={() => {
            setSelectedEntry(entry);

            console.log('hello');
          }}
          // onTriggerClosing={() => {
          //   setSelectedEntry('');
          // }}
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
          lazyRender={'true'}
          transitionTime={100}
          overflowWhenOpen={'hidden'}
        >
          <Tabs>
            <TabList>
              <Tab>Embedded</Tab>
              <Tab>Links</Tab>
            </TabList>
            <TabPanel>
              <TwitterVideoEmbed id={'1287828370995081217'} />
            </TabPanel>
            <TabPanel>
              <div className="colContent">
                <p>Links:</p>
                {entry.links.map(link => (
                  <p>
                    <a href={link} target="_blank">
                      {link}
                    </a>
                  </p>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </Collapsible>
      ))}
    </div>
  );
}
