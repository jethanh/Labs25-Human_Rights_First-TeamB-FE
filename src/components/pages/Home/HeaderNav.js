import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HeaderNav() {
  return (
    <>
      <div className="header">
        <div>
          <img src="/hrf-logo.png" />
        </div>
        <div className="header-right">
          <div className="header-buttons">
            <button className="buttonA">ASYLUM</button>
            <button className="buttonB">DONATE</button>
            <button className="buttonC">TAKE ACTION</button>
          </div>
          <div className="social-icons">
            <a href="https://www.youtube.com/user/HumanRightsFirstOrg">
              <FontAwesomeIcon icon={['fab', 'youtube-square']} />
            </a>
            <a href="https://www.facebook.com/humanrightsfirst">
              <FontAwesomeIcon icon={['fab', 'facebook-square']} />
            </a>
            <a href="https://twitter.com/humanrights1st">
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
          </div>
        </div>
      </div>
      <div className="nav-bar">
        <div className="nav-contents">
          <ul className="nav-list">
            <li>ABOUT</li>
            <li>CAMPAIGNS</li>
            <li>TOPICS</li>
            <li>RESOURCES</li>
            <li>MEDIA</li>
            <li>VETS FOR AMERICAN IDEALS</li>
          </ul>
        </div>
      </div>
    </>
  );
}
