import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeAuth } from "../lib/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="hero-gradient">StudentHub</span>
            </h1>
            <p className="hero-description">
              The ultimate platform for students to showcase their projects and track their academic progress. 
              Teachers can monitor student work and provide valuable feedback.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="hero-btn hero-btn-primary">
                Get Started
              </Link>
              <Link to="/signin" className="hero-btn hero-btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="features-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon feature-icon-blue">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Project Management</h3>
              <p className="feature-description">
                Upload and manage your academic projects with ease. Track progress and showcase your work.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-purple">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="feature-title">Progress Tracking</h3>
              <p className="feature-description">
                Visual progress indicators help you monitor your project completion status in real-time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-pink">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="feature-title">Teacher Feedback</h3>
              <p className="feature-description">
                Receive constructive feedback from teachers and improve your projects based on their insights.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join StudentHub today and take control of your academic portfolio.
            </p>
            <Link to="/signup" className="cta-btn">
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
