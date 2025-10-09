import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="footer-logo">
                <svg className="footer-logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="footer-title">StudentHub</span>
            </div>
            <p className="footer-description">
              Empowering students to showcase their work and track their progress.
            </p>
          </div>
          
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="footer-heading">Contact</h3>
            <p className="footer-contact">
              Email: support@studenthub.edu<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          © {new Date().getFullYear()} StudentHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
