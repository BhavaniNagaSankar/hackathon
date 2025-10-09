import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="notfound-main">
        <div className="notfound-content">
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Page Not Found</h2>
          <p className="notfound-description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="notfound-btn">
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
