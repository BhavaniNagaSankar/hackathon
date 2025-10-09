import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/auth";
import { getProjectsByStudent, addProject, updateProject, deleteProject } from "../lib/projects";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technology: "",
    progress: 0,
    imageUrl: "",
  });

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/signin");
      return;
    }
    loadProjects();
  }, [user, navigate]);

  const loadProjects = () => {
    if (user) {
      const userProjects = getProjectsByStudent(user.id);
      setProjects(userProjects);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.technology) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingProject) {
      updateProject(editingProject.id, formData);
      setEditingProject(null);
    } else {
      addProject({
        ...formData,
        studentId: user.id,
        studentName: user.name,
      });
    }

    setFormData({
      title: "",
      description: "",
      technology: "",
      progress: 0,
      imageUrl: "",
    });
    setShowForm(false);
    loadProjects();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technology: project.technology,
      progress: project.progress,
      imageUrl: project.imageUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deleteProject(id);
    loadProjects();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      technology: "",
      progress: 0,
      imageUrl: "",
    });
  };

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">My Projects</h1>
              <p className="dashboard-subtitle">Manage and track your academic projects</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="add-project-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Project
            </button>
          </div>

          {showForm && (
            <div className="project-form-card">
              <h2 className="form-title">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              <form onSubmit={handleSubmit} className="project-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">Project Title *</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="My Amazing Project"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="technology" className="form-label">Technology *</label>
                    <input
                      id="technology"
                      name="technology"
                      type="text"
                      value={formData.technology}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="React, Node.js, etc."
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="4"
                    placeholder="Describe your project..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl" className="form-label">Image URL (optional)</label>
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="progress" className="form-label">
                    Progress: {formData.progress}%
                  </label>
                  <input
                    id="progress"
                    name="progress"
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleChange}
                    className="form-slider"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleCancel} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingProject ? "Update Project" : "Add Project"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {projects.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="empty-title">No projects yet</h3>
              <p className="empty-description">Start by adding your first project!</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
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

export default StudentDashboard;
