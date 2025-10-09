// Simple localStorage-based authentication simulation

const USERS_KEY = 'portfolio_users';
const CURRENT_USER_KEY = 'portfolio_current_user';

export const initializeAuth = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    // Initialize with demo users
    const demoUsers = [
      { id: '1', email: 'admin@school.edu', password: 'admin123', name: 'Admin User', role: 'admin' },
      { id: '2', email: 'student@school.edu', password: 'student123', name: 'John Doe', role: 'student' },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  }
};

export const signUp = (email, password, name, role) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  if (users.find((u) => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    name,
    role,
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true };
};

export const signIn = (email, password, role) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find((u) => u.email === email && u.password === password && u.role === role);

  if (!user) {
    return { success: false, error: 'Invalid credentials or role' };
  }

  const userWithoutPassword = { id: user.id, email: user.email, name: user.name, role: user.role };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return { success: true, user: userWithoutPassword };
};

export const signOut = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};
