// Project management with localStorage

const PROJECTS_KEY = 'portfolio_projects';

export const getProjects = () => {
  const projects = localStorage.getItem(PROJECTS_KEY);
  return projects ? JSON.parse(projects) : [];
};

export const getProjectsByStudent = (studentId) => {
  return getProjects().filter(p => p.studentId === studentId);
};

export const addProject = (project) => {
  const projects = getProjects();
  const newProject = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return newProject;
};

export const updateProject = (id, updates) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return projects[index];
};

export const deleteProject = (id) => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  
  if (filtered.length === projects.length) return false;
  
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
  return true;
};
