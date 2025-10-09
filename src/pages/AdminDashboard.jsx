import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/auth";
import { getProjects, updateProject } from "../lib/projects";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/signin");
      return;
    }
    loadProjects();
  }, [user, navigate]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.technology.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  const loadProjects = () => {
    const allProjects = getProjects();
    setProjects(allProjects);
    setFilteredProjects(allProjects);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFeedback(project.feedback || "");
    setProgress(project.progress);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (selectedProject) {
      updateProject(selectedProject.id, {
        feedback,
        progress: parseInt(progress),
      });
      setSelectedProject(null);
      setFeedback("");
      setProgress(0);
      loadProjects();
    }
  };

  const handleCancel = () => {
    setSelectedProject(null);
    setFeedback("");
    setProgress(0);
  };

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">All Student Projects</h1>
              <p className="dashboard-subtitle">Review and provide feedback on student work</p>
            </div>
          </div>

          <div className="search-section">
            <div className="search-box">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name, project title, or technology..."
                className="search-input"
              />
            </div>
          </div>

          {selectedProject && (
            <div className="feedback-form-card">
              <h2 className="form-title">Provide Feedback for "{selectedProject.title}"</h2>
              <form onSubmit={handleSubmitFeedback} className="feedback-form">
                <div className="form-group">
                  <label htmlFor="feedback" className="form-label">Feedback</label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="form-textarea"
                    rows="4"
                    placeholder="Provide constructive feedback..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="progress" className="form-label">
                    Update Progress: {progress}%
                  </label>
                  <input
                    id="progress"
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    className="form-slider"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleCancel} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon stat-icon-blue">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="stat-label">Total Projects</p>
                <p className="stat-value">{filteredProjects.length}</p>
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="empty-title">No projects found</h3>
              <p className="empty-description">
                {searchTerm ? "Try adjusting your search" : "Students haven't added any projects yet"}
              </p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEdit}
                  showStudentInfo={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
