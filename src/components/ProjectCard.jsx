import { useState } from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project, onEdit, onDelete, showStudentInfo = false }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(project.id);
    }
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="project-card">
        {project.imageUrl && (
          <div className="project-card-image-wrapper">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="project-card-image"
            />
          </div>
        )}
        
        <div className="project-card-header">
          <div className="project-card-title-section">
            <h3 className="project-card-title">{project.title}</h3>
            {showStudentInfo && (
              <div className="project-card-student-info">
                <svg className="project-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {project.studentName}
              </div>
            )}
          </div>
          <span className="project-card-badge">{project.technology}</span>
        </div>

        <div className="project-card-content">
          <p className="project-card-description">{project.description}</p>

          <div className="project-card-progress-section">
            <div className="project-card-progress-header">
              <span className="project-card-progress-label">Progress</span>
              <span className="project-card-progress-value">{project.progress}%</span>
            </div>
            <div className="project-card-progress-bar">
              <div 
                className="project-card-progress-fill" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          {project.feedback && (
            <div className="project-card-feedback">
              <p className="project-card-feedback-title">Teacher Feedback:</p>
              <p className="project-card-feedback-text">{project.feedback}</p>
            </div>
          )}

          <div className="project-card-date">
            <svg className="project-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Updated {new Date(project.updatedAt).toLocaleDateString()}
          </div>
        </div>

        {(onEdit || onDelete) && (
          <div className="project-card-footer">
            {onEdit && (
              <button onClick={() => onEdit(project)} className="project-card-btn project-card-btn-edit">
                <svg className="project-card-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={() => setShowDeleteDialog(true)} className="project-card-btn project-card-btn-delete">
                <svg className="project-card-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {showDeleteDialog && (
        <div className="modal-overlay" onClick={() => setShowDeleteDialog(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Are you sure?</h2>
            <p className="modal-description">
              This will permanently delete the project "{project.title}". This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteDialog(false)} className="modal-btn modal-btn-cancel">
                Cancel
              </button>
              <button onClick={handleDelete} className="modal-btn modal-btn-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
