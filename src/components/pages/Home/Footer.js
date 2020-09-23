import React from 'react';

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-left">
          <div className="menu-links">
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Press</li>
              <li>Terms {'&'} Privacy</li>
              <li>Sign Up</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="contact-info">
            <div className="cities">
              <ul>
                <li>New York</li>
                <li>Washington</li>
                <li>Houston</li>
                <li>Los Angeles</li>
              </ul>
            </div>
            <div className="contact-details">
              <p>
                Human Rights First, 75 Broad St, 31st Floor, New York, NY 10004
              </p>
              <p>For Media Inquiries call 202-370-3323</p>
              <p>
                Human Rights First is a nonpartisan, 501(c)(3), international
                human rights organization based in New York and Washington, DC.
                We do not favor or oppose any candidate for public office.
              </p>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-logo">
            <img src="/hrf-footer-logo.png" alt="Human Rights First Logo" />
          </div>
          <div className="footer-buttons">
            <button className="buttonA">ASYLUM</button>
            <button className="buttonB">DONATE</button>
            <button className="buttonC">SIGN UP</button>
          </div>
        </div>
      </div>
    </>
  );
}
